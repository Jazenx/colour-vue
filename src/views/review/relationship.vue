<template>
  <div>
    <div ref="warterarmy">
    </div>
  </div>
</template>

<script>
import store from '../../store'
import * as d3 from 'd3';

export default {
  name: 'relationship',
  props: {
    nodes: null,
    edges: null,
    userid: null
  },
  data() {
    return {
      mainloading: true
    }
  },
  mounted() {
    this.mainloading = false;
    this.makeRelationship();
  },
  methods: {
    makeRelationship() {
      const height = 423;
      const width = 1000;
      const color = d3.scaleOrdinal(d3.schemeCategory20);
      const svg = d3.select(this.$refs.warterarmy)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
      const simulation = d3.forceSimulation(this.nodes)
        .force('link', d3.forceLink(this.edges).distance(100))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2));
      // 添加连线
      const svg_edges = svg.selectAll('line')
        .data(this.edges)
        .enter()
        .append('line')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
        .style('stroke', '#ccc')
        .style('stroke-width', 1);

      // 添加节点
      const dragstarted = d => {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      };
      const dragged = d => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      };
      const dragended = d => {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      };
      const edges_text = svg.selectAll('.linetext')
        .data(this.edges)
        .enter()
        .append('text')
        .attr('class', 'linetext')
        .attr('x', d => (d.source.x + d.target.x) / 2)
        .attr('y', d => (d.source.x + d.target.x) / 2)
        .style('fill-opacity', 0.0);


      const svg_nodes = svg.selectAll('circle')
        .data(this.nodes)
        .enter()
        .append('circle')
        .attr('r', 20)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .style('fill', (d, i) => {
          // 当前嫌疑用户为红色，其他相关用户为灰色
          let color = '#778899';
          if (d.userid === this.userid) {
            color = '#DC143C';
          }
          return color;
        })
        .on('mouseover', (d, i) => {
          // 显示连接线上的文字
          edges_text.style('fill-opacity', edge => {
            if (edge.source === d || edge.target === d) {
              edges_text.text(d => d.relation);
              return 1.0;
            } else {
              return 0.0;
            }
          });
        })
        .on('mouseout', (d, i) => {
          // 隐去连接线上的文字
          edges_text.style('fill-opacity', edge => 0.0);
        })
        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended));  // 使得节点能够拖动

      // 添加描述节点的文字
      const svg_text = svg.selectAll('.maintext')
        .data(this.nodes)
        .enter()
        .append('text')
        .attr('dx', 20)
        .attr('dy', 5)
        .attr('class', 'maintext')
        .text(d => d.userid);

      const draw = () => {
        svg_edges
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);
        svg_nodes
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);
        svg_text
          .attr('x', d => d.x)
          .attr('y', d => d.y);
        edges_text.attr('x', d => {
          if (d.index > this.nodes.length) {
            return (d.source.x + d.target.x) / 2
          } else {
            return d.x
          }
        });
        edges_text.attr('y', d => {
          if (d.index > this.nodes.length) {
            return (d.source.y + d.target.y) / 2
          } else {
            return d.y
          }
        });
      }
      simulation
        .on('tick', draw);
    }
  }
}
</script>

