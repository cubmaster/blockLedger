import {
  AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges,
  ViewChild
} from '@angular/core';
import * as d3 from 'd3';
import {BaseType, Selection} from 'd3-selection';

export const donutChartSchemeCategory20c: string[] = [
    '#6d2078',
    '#0192db',
    '#005eb9',
    '#00348d',
    ...d3.schemeCategory20c
  ]
;

@Component({
  selector: 'ifrs-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.less']
})
export class DonutChartComponent implements OnInit, AfterViewInit, OnChanges {

  colour = d3.scaleOrdinal(donutChartSchemeCategory20c); // colour scheme
  floatFormat = d3.format('.4r');
  percentFormat = d3.format(',.2%');

  /**
   * The width. Default 100.
   * @type {number}
   */
  @Input() width: number = 100;

  /**
   * The height. Default 100.
   * @type {number}
   */
  @Input() height: number = 100;

  /**
   * Field name in data that will dictate proportions on chart. Default to value.
   * @type {string}
   */
  @Input() value: string = 'value';

  /**
   * Field name to compare data by in the data array. Default to category.
   * @type {string}
   */
  @Input() category: string = 'category';

  /**
   * Effectively dictates the gap between slices.
   * @type {number}
   */
  @Input() padAngle: number = 0;

  /**
   * Sets how rounded the corners are on each slice.
   * @type {number}
   */
  @Input() cornerRadius: number = 0;

  /**
   * The margin inside the component for the chart.
   * @type {{top: number; right: number; bottom: number; left: number}}
   */
  @Input() margin = {top: 0, right: 0, bottom: 0, left: 0};

  /**
   * Sets if need to apply labels.
   * @type {boolean}
   */
  @Input() addLabels: boolean = false;

  /**
   * The data.
   * @type {Array}
   */
  @Input() data: Array<any> = [];

  /**
   * The colors to use. If none or empty use default.
   * @type {Array}
   */
  @Input() colors: Array<string> = [];

  @ViewChild('donutChart') chart: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.colors && this.colors.length) {
      this.colour = d3.scaleOrdinal(this.colors); // colour scheme
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const dataChange: SimpleChange = changes['data'];
    if (dataChange) {
      this.setup();
    }
  }

  setup() {
    const elem = this.chart.nativeElement;
    d3.select(elem)
      .datum(this.data) // bind data to the div
      .call(this.select, this); // draw chart in div
  }

  select(selection, chart) {

    selection.each(function (data) {
      // generate chart

      // ===========================================================================================
      // Set up constructors for making donut. See https://github.com/d3/d3-shape/blob/master/README.md
      const radius = Math.min(chart.width, chart.height) / 2;

      // creates a new pie generator
      const pie = d3.pie()
        .value((d) => {
          return +chart.floatFormat(d[chart.value]);
        })
        .sort(null);

      // constructs and arc generator. that will be used for the donut. The difference between outer and inner
      // radius will dictate the thickness of the donut
      const arc = d3.arc()
        .outerRadius(radius * 0.8)
        .innerRadius(radius * 0.4)
        .cornerRadius(chart.cornerRadius)
        .padAngle(chart.padAngle);

      // that arc is used for aligning the text labels
      const outerArc = d3.arc()
        .outerRadius(radius * 0.9)
        .innerRadius(radius * 0.9);
      // ===========================================================================================

      // ===========================================================================================
      // clear any svg
      selection.selectAll('svg').remove();
      // ===========================================================================================

      // ===========================================================================================
      // append the svg object to the selection
      const svg = selection.append('svg')
        .attr('width', chart.width + chart.margin.left + chart.margin.right)
        .attr('height', chart.height + chart.margin.top + chart.margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + chart.width / 2 + ',' + chart.height / 2 + ')');
      // ===========================================================================================

      // ===========================================================================================
      // g elements to keep elements within svg modular
      svg.append('g').attr('class', 'slices');
      svg.append('g').attr('class', 'labelName');
      svg.append('g').attr('class', 'lines');
      // ===========================================================================================

      // ===========================================================================================
      // add and colour the donut slices
      const path = svg.select('.slices')
        .datum(data).selectAll('path')
        .data(pie)
        .enter().append('path')
        .attr('fill', (d) => {
          return chart.colour(d.data[chart.category]);
        })
        .attr('d', arc);
      // ===========================================================================================

      // ===========================================================================================
      if (this.addLabels) {
        // add text labels
        const label = svg.select('.labelName').selectAll('text')
          .data(pie)
          .enter().append('text')
          .attr('dy', '.35em')
          .html((d) => {
            // add "key: value" for given category. Number inside tspan is bolded in stylesheet.
            return d.data[chart.category] + ': <tspan>' + chart.percentFormat(d.data[chart.value]) + '</tspan>';
          })
          .attr('transform', (d) => {

            // effectively computes the centre of the slice.
            // see https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
            const pos = outerArc.centroid(d);

            // changes the point to be on left or right depending on where label is.
            pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
          })
          .style('text-anchor', function (d) {
            // if slice centre is on the left, anchor text to start, otherwise anchor to end
            return (midAngle(d)) < Math.PI ? 'start' : 'end';
          });
      }

      // ===========================================================================================

      // ===========================================================================================
      // Functions

      // calculates the angle for the middle of a slice
      function midAngle(d): number {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
      }
    });
  }
}
