import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { ZoomBehavior } from 'd3';

type TimelineItem = {
  date: Date;
}

type TimelineEvent = TimelineItem & {
  text: string;
}

const fontStartSize = 14;
const circleStartRadius = 8;

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


  function handleItemClicked(d: TimelineEvent) {
    console.log("date clicked: ", d.date);
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
    const uiScale = d3.scaleTime()
      .domain([new Date(data[0].date), new Date(data[data.length - 1].date)])
      .range([yMin, yMax]);

    // Create a line for the timeline
    contentGroup.append('line')
      .attr('x1', width / 2)
      .attr('y1', yMin)
      .attr('x2', width / 2)
      .attr('y2', yMax)
      .style('stroke', '#000');

    const eventCards = contentGroup.selectAll('.event-card')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'event-card')
      .attr('transform', (d: TimelineEvent) => `translate(${width / 2}, ${yScale(d.date)})`);
    eventCards.append('circle')
      .attr('x', -50)
      .attr('y', -25)
      .attr('r', circleStartRadius)
      .style('pointer-events', 'all')  // or 'visiblePainted'
      .style('fill', '#3498db')
      .on('click', (e: MouseEvent, d: TimelineEvent) => handleItemClicked(d));
    eventCards.append('text')
      .attr('x', 10)
      .attr('y', 0)
      .text((d: TimelineEvent) => d.text)
      .attr('font-size', fontStartSize + "px")
      .attr('alignment-baseline', 'middle');
    /* eventCards.append('image')
      .attr('xlink:href', d => d.thumbnailURL)
      .attr('x', -40)
      .attr('y', -20)
      .attr('width', 40)
      .attr('height', 40); */

    const startYear = d3.timeYear.floor(data[0].date).getFullYear();
    const endYear = d3.timeYear.ceil(data[data.length - 1].date).getFullYear();
    const tickValues: TimelineItem[] = d3.range(startYear, endYear + 1).map(year => ({ date: new Date(year, 0, 1) }));
    const yearTicks = contentGroup.selectAll('.year-ticks')
      .data(tickValues)
      .enter()
      .append('g')
      .attr('class', 'year-ticks')
      .attr('transform', (d: TimelineItem) => `translate(${width / 2}, ${yScale(d.date)})`);
    yearTicks.append('line')
      .attr('x1', -10)  // 10 pixels left from the center
      .attr('x2', 10)  // 10 pixels right from the center
      .attr('y1', 0)
      .attr('y2', 0)
      .style('stroke', '#aaa');
    yearTicks.append('text')
      .attr('x', -15)  // Positioned to the left of tick marks
      .attr('y', 0)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .text((d: TimelineItem) => d.date.getFullYear())
      .style('font-size', '12px');


    const z = d3.zoom()
      .scaleExtent([1, 5])
      .translateExtent([[0, 0], [width, height]])
      .on('zoom', (event) => {
        console.log("zoom transform: ", event.transform);
        //console.log("zoom level: ", event.transform.k);
        yScale.domain(event.transform.rescaleY(uiScale).domain());

        console.log("translate y: ", yScale(new Date('1930-06-17')))
        contentGroup.selectAll('.event-card')
          .attr('transform', (d: TimelineEvent) => `translate(${width / 2}, ${yScale(d.date)})`);
        contentGroup.selectAll('.year-ticks')
          .attr('transform', (d: TimelineItem) => `translate(${width / 2}, ${yScale(d.date)})`);
      });
    zoomRef.current = z;
    svg.call(zoomRef.current);
  }, [data]);

  return (
    <div className='min-h-screen'>
      <svg ref={ref}></svg>
    </div>
  );
}

export default Timeline;
