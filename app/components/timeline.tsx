import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { ZoomBehavior } from 'd3';

type TimelineItem = {
  date: Date;
  text: string;
}
function Timeline({ data }: { data: TimelineItem[] }) {
  const ref = useRef<SVGSVGElement>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const zoomRef = useRef<ZoomBehavior<Element, unknown>>(
    d3.zoom()
      .scaleExtent([1, 5])
      .on('zoom', (event) => {
        const newZoomLevel = event.transform.k;
        if (zoomScale !== newZoomLevel) {
          setZoomScale(newZoomLevel);
        }
      })
  );


  function handleItemClicked(item: TimelineItem) {
    console.log("date clicked: ", item.date);
  }

  useEffect(() => {
    if (!ref.current || !ref.current.parentElement) return;

    const svg: any = d3.select(ref.current);
    svg.selectAll('*').remove();

    const containerRect = ref.current.parentElement.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;
    svg.attr("width", width)
      .attr("height", height);
    const yMin = 20;
    const yMax = height - 20;

    const contentGroup = svg.append('g');

    // Scale to map dates to vertical positions
    const yScale = d3.scaleTime()
      .domain([new Date(data[0].date), new Date(data[data.length - 1].date)])
      .range([yMin, yMax]);

    // Create a line for the timeline
    contentGroup.append('line')
      .attr('x1', width / 2)
      .attr('y1', yMin)
      .attr('x2', width / 2)
      .attr('y2', yMax)
      .style('stroke', '#000');

    // Add circles and text for each item
    data.forEach((item, i) => {
      const yPos = yScale(item.date);

      contentGroup.append('circle')
        .attr('cx', width / 2)
        .attr('cy', yPos)
        .attr('r', 8)
        .style('fill', '#3498db')
        .on('click', () => handleItemClicked(item));

      contentGroup.append('text')
        .attr('x', (width / 2) + 20)
        .attr('y', yPos)
        .text(item.text)
        .attr('alignment-baseline', 'middle');
    });

    const z = d3.zoom()
      .scaleExtent([1, 5])
      .on('zoom', (event) => {
        const newZoomScale = event.transform.k;

        event.transform.x = 0;

        // Constrain y movement:
        if (ref.current) {
          const svgHeight = ref.current.clientHeight;
          const contentHeight = svgHeight * newZoomScale;

          const [invMin, invMax] = [Math.round(event.transform.invertY(yMin)), Math.round(event.transform.invertY(yMax))];

          console.log("invert y: ", [invMin, invMax]);

          /* if (invMin > yMin * event.transform.k) {
            event.transform.y = 0;
          } */
          if (invMax > yMax) {
            event.transform.y = yMax - svgHeight * event.transform.k;
          }

          if (event.transform.y > 0) {
            event.transform.y = 0;
          }
          console.log("transform y: ", event.transform.y);
        }

        if (zoomScale !== newZoomScale) {
          setZoomScale(newZoomScale);
        }

        contentGroup.attr('transform', event.transform);
      });
    zoomRef.current = z;

    svg.call(zoomRef.current);
  }, [data]);

  useEffect(() => {
    console.log("zoom scale: ", zoomScale);
  }, [zoomScale])

  return (
    <div className='min-h-screen'>
      <svg ref={ref}></svg>
    </div>
  );
}

export default Timeline;
