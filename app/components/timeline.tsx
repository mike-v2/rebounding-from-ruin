import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { ZoomBehavior } from 'd3';

type TimelineItem = {
  date: Date;
}

type TimelineEvent = TimelineItem & {
  displayDate: string;
  importance: number;
  text: string;
  visible?: boolean;
  yPos?: number;
  isTruncated?: boolean;
}

const fontStartSize = 14;
const circleStartRadius = 8;
const lineHeight = 1.2; // em

function Timeline({ data }: { data: TimelineEvent[] }) {
  const ref = useRef<SVGSVGElement>(null);
  const [svg, setSVG] = useState<any>();
  const [contentGroup, setContentGroup] = useState<any>();
  const [zoomScale, setZoomScale] = useState(1);
  const [yScale, setYScale] = useState<any>(null);
  const startYScaleRef = useRef<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent>();

  const dataByDate = data.slice().sort((a, b) => a.date.getTime() - b.date.getTime());
  const dataByImportance = data.slice().sort((a, b) => b.importance - a.importance);

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

  useEffect(() => {
    if (!ref.current || !ref.current.parentElement) return;

    const svg = initializeSVG();
    setSVG(svg);
    const contentGroup = svg.append('g');
    setContentGroup(contentGroup);

    const yMin = 20;
    const yMax = svg.attr("height") - 20;
    const startYScale = d3.scaleTime()
      .domain([new Date(dataByDate[0].date), new Date(dataByDate[dataByDate.length - 1].date)])
      .range([yMin, yMax]);
    startYScaleRef.current = startYScale;
    const yScale = startYScale.copy();
    setYScale(yScale);

    drawTimeline(contentGroup, svg, yMin, yMax);
    drawEventCards(contentGroup, svg, yScale);
    drawYearTicks(contentGroup, svg, yScale);
    initializeZoom(svg);

  }, [data]);

  const initializeSVG = () => {
    if (!ref.current || !ref.current.parentElement) return;

    const svg: any = d3.select(ref.current);
    svg.selectAll('*').remove();

    const containerRect = ref.current.parentElement.getBoundingClientRect();
    svg.attr("width", containerRect.width)
      .attr("height", containerRect.height);

    return svg;
  }

  const drawTimeline = (contentGroup: any, svg: any, yMin: number, yMax: number) => {
    contentGroup.append('line')
      .attr('x1', svg.attr("width") / 2)
      .attr('y1', yMin)
      .attr('x2', svg.attr("width") / 2)
      .attr('y2', yMax)
      .style('stroke', '#000');
  }

  const drawEventCards = (contentGroup: any, svg: any, yScale: d3.ScaleTime<number, number, never>) => {
    const colorInterpolator = d3.interpolate("#00ff00", "#ff0000");
    const colorScale = d3.scaleSequential(colorInterpolator)
      .domain([1, 10]);

    const eventGroups = contentGroup.selectAll('.event-group')
      .data(dataByImportance)
      .enter()
      .append('g')
      .attr('class', 'event-group')
      .attr('transform', (d: TimelineEvent) => `translate(${svg.attr("width") / 2}, ${yScale(d.date)})`);
    // Circle is directly appended to the event group so it's always visible
    eventGroups.append('circle')
      .attr('x', -50)
      .attr('y', -25)
      .attr('r', circleStartRadius)
      .style('pointer-events', 'all')  // or 'visiblePainted'
      .style('fill', (d: TimelineEvent) => colorScale(d.importance))
      .on('click', (e: MouseEvent, d: TimelineEvent) => handleItemClicked(d));
    const eventCards = eventGroups.append('g')
      .attr('class', 'event-card')
      .style('display', (d: TimelineEvent) => d.visible ? null : 'none');
    eventCards.append('rect')
      .attr('x', 10)
      .attr('y', 0 - (fontStartSize / 2))
      .attr('width', 200)
      .attr('height', 70)
      .attr('fill', 'lightgray');
    eventCards.append('text')
      .attr('x', 10)
      .attr('y', 5)
      .text((d: TimelineEvent) => d.text)
      .attr('font-size', fontStartSize + "px")
      .attr('alignment-baseline', 'middle')
      .attr('class', 'event-text')
      .call(wrapText, 200, contentGroup);
    eventCards.append('image')
      .attr('xlink:href', d => d.thumbnailURL)
      .attr('x', -40)
      .attr('y', -20)
      .attr('width', 40)
      .attr('height', 40);
  }

  const drawYearTicks = (contentGroup: any, svg: any, yScale: d3.ScaleTime<number, number, never>) => {
    const startYear = d3.timeYear.floor(dataByDate[0].date).getFullYear();
    const endYear = d3.timeYear.ceil(dataByDate[dataByDate.length - 1].date).getFullYear();
    const tickValues: TimelineItem[] = d3.range(startYear, endYear + 1).map(year => ({ date: new Date(year, 0, 1) }));

    const yearTicks = contentGroup.selectAll('.year-ticks')
      .data(tickValues)
      .enter()
      .append('g')
      .attr('class', 'year-ticks')
      .attr('transform', (d: TimelineItem) => `translate(${svg.attr('width') / 2}, ${yScale(d.date)})`);
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
  }

  const initializeZoom = (svg: any) => {
    const z = d3.zoom()
      .scaleExtent([1, 12])
      .translateExtent([[0, 0], [svg.attr('width'), svg.attr('height')]])
      .on('zoom', (event) => {
        console.log("zoom transform: ", event.transform);

        // use functional state change otherwise re-render not triggered
        setYScale((prevYScale: any) => {
          const newYScale = startYScaleRef.current?.copy();
          newYScale?.domain(event.transform.rescaleY(startYScaleRef.current).domain());
          return newYScale;
        });
      });
    zoomRef.current = z;
    svg.call(z);
  }

  useEffect(() => {
    if (!yScale || !contentGroup || !svg) return;

    //console.log("translate y: ", yScale(new Date('1930-06-17')))
    contentGroup.selectAll('.event-group')
      .attr('transform', (d: TimelineEvent) => `translate(${svg.attr('width') / 2}, ${yScale(d.date)})`);
    contentGroup.selectAll('.year-ticks')
      .attr('transform', (d: TimelineItem) => `translate(${svg.attr('width') / 2}, ${yScale(d.date)})`);

    handleRenderEvents();
  }, [yScale, contentGroup, svg, handleRenderEvents]);

  const wrapText = (selection: d3.Selection<d3.BaseType, any, HTMLElement, any>, width: number, contentGroup: any, maxLines = 3): void => {

    selection.each(function (d) {
      const text = d3.select(this);
      const words = text.text().split(/\s+/).reverse();
      let word;
      let line: string[] = [];
      let lineCount = 0;
      const x = text.attr("x");
      const y = text.attr("y");
      let tspan = text.text(null).append("tspan").attr("x", x).attr("y", y);

      while (word = words.pop()) {
        if (lineCount >= maxLines) {
          d.isTruncated = true;
          break;
        } else {
          d.isTruncated = false;
        }
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node()!.getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", x).attr("y", y)
            .attr("dy", `${++lineCount * lineHeight}em`).text(word);
        }
      }
    });

    displayReadMoreOnTruncatedText(contentGroup);
  }

  function displayReadMoreOnTruncatedText(contentGroup: any) {
    contentGroup.selectAll('.event-group').select('.event-card').each(function (d: TimelineEvent) {
      const card = d3.select(this);

      // Identify the main text element inside the event card
      const textElement = card.select('text.event-text');

      if (d.isTruncated) {
        const readMoreTspan = textElement.select('.read-more-tspan');
        if (readMoreTspan.empty()) {
          textElement.append('tspan')
            .attr('class', 'read-more-tspan')
            .attr('x', 0)
            .attr('dy', `${lineHeight}em`)
            .text("Read More")
            .style('fill', 'blue')
            .style('cursor', 'pointer')
            .on('click', (event, d) => handleReadMoreClick(event, this, d.text));
        }
      }
    });
  }

  function handleReadMoreClick(e, cardNode, fullText) {
    const node = d3.select(cardNode).select('.event-text');

    node.selectAll('tspan').remove();
    node.text(fullText);
    wrapText(node, 200, contentGroup, Infinity);
    node.append('tspan')
      .attr('class', 'read-more-tspan')
      .attr('x', 0)
      .attr('dy', '1.2em')
      .text("Read Less")
      .style('fill', 'blue')
      .style('cursor', 'pointer')
      .on('click', (event, d) => wrapText(node, 200, contentGroup));;
  }

  function handleRenderEvents() {
    if (!yScale) return;

    const renderedEvents: TimelineEvent[] = [];
    const threshold = 100;  // pixel height for each event + padding

    if (selectedEvent) {
      renderedEvents.push(selectedEvent);
    }

    dataByImportance.forEach(event => {
      const yPos = yScale(event.date);

      if (selectedEvent && selectedEvent.date === event.date || !renderedEvents.some(e => e.yPos && Math.abs(e.yPos - yPos) < threshold)) {
        event.visible = true;
        event.yPos = yPos;
        renderedEvents.push(event);
      } else {
        event.visible = false;
      }
    });

    contentGroup.selectAll('.event-group').select('.event-card').style('display', (d: TimelineEvent) => d.visible ? null : 'none');
    contentGroup.selectAll('.event-group').select('.event-card').select('.event-text')
      .text((d: TimelineEvent) => d.text)
      .call(wrapText, 200, contentGroup);
  }

  useEffect(() => {
    if (!yScale) return;
    handleRenderEvents();
  }, [selectedEvent, yScale])

  function handleItemClicked(d: TimelineEvent) {
    console.log("date clicked: ", d.date);
    if (yScale) {
      d.yPos = yScale(d.date);
      d.visible = true;
    }
    setSelectedEvent(d);
  }

  return (
    <div className='min-h-screen'>
      <svg ref={ref}></svg>
    </div>
  );
}

export default Timeline;
