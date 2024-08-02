// FlightPathD3.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const FlightPathD3 = ({ flightPaths }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear existing content

    const width = 600;
    const height = 400;
    const offset = 10; // Offset for non-intersection

    // Create a scale for the coordinates
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(Object.values(flightPaths).flat().map(d => d[0]))])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(Object.values(flightPaths).flat().map(d => d[1]))])
      .range([height, 0]);

    // Draw each flight path
    Object.keys(flightPaths).forEach((flight, index) => {
      const coordinates = flightPaths[flight];
      const path = d3.line()
        .x(d => xScale(d[0]))
        .y(d => yScale(d[1]));

      svg.append('path')
        .data([coordinates])
        .attr('d', path)
        .attr('fill', 'none')
        .attr('stroke', d3.schemeCategory10[index % 10])
        .attr('stroke-width', 2);
    });

    // Set dimensions of the SVG
    svg.attr('width', width)
       .attr('height', height);
  }, [flightPaths]);

  return <svg ref={svgRef}></svg>;
};

export default FlightPathD3;
