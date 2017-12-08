<script>
import store from '../../store'
import * as d3 from 'd3';

export default {
  name: 'relationship',
  template: '<div></div>',
  props: {
    nodes: null,
    edges: null
  },
  data() {
    return {
      mainloading: true
    }
  },
  created() {
    this.mainloading = false;
    console.log(this.nodes);
    console.log(this.edges);
    this.makeRelationship();
  },
  methods: {
    makeRelationship() {
      const height = 423;
      const width = 1000;
      const color = d3.scaleOrdinal(d3.schemeCategory20);

      const svg = d3.select(this.$el)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
      const force = d3.forceSimulation(this.nodes)
        .nodes(this.nodes) // 指定节点数组
        .links(this.edges) // 指定连线数组
        .size([width, height]) // 指定作用域范围
        .linkDistance(180) // 指定连线长度
        .charge([-400]); // 相互之间的作用力
      force.start();    // 开始作用

      // 添加连线
      const svg_edges = svg.selectAll('line')
        .data(this.edges)
        .enter()
        .append('line')
        .style('stroke', '#ccc')
        .style('stroke-width', 1);
      const edges_text = svg.selectAll('.linetext')
        .data(this.edges)
        .enter()
        .append('text')
        .attr('class', 'linetext')
        .text(d => d.relation);
      // 添加节点
      const svg_nodes = svg.selectAll('circle')
        .data(this.nodes)
        .enter()
        .append('circle')
        .attr('r', 20)
        .style('fill', (d, i) => color(i))
        .on('mouseover', (d, i) => {
          // 显示连接线上的文字
          edges_text.style('fill-opacity', edge => {
            if (edge.source === d || edge.target === d) {
              return 1.0;
            }
          });
        })
        .on('mouseout', (d, i) => {
          // 隐去连接线上的文字
          edges_text.style('fill-opacity', edge => {
            if (edge.source === d || edge.target === d) {
              return 0.0;
            }
          });
        })
        .call(force.drag);  // 使得节点能够拖动

      // 添加描述节点的文字
      const svg_texts = svg.selectAll('text')
        .data(this.nodes)
        .enter()
        .append('text')
        .style('fill', 'black')
        .attr('dx', 20)
        .attr('dy', 5)
        .text(d => d.userid);

      force.on('tick', () => { // 对于每一个时间间隔
        // 更新连线坐标
        svg_edges.attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);


        // 更新节点坐标
        svg_nodes.attr('cx', d => d.x)
          .attr('cy', d => d.y);

        // 更新文字坐标
        svg_texts.attr('x', d => d.x)
          .attr('y', d => d.y);
        // 更新连接线上文字的位置
        edges_text.attr('x', d => (d.source.x + d.target.x) / 2);
        edges_text.attr('y', d => (d.source.y + d.target.y) / 2);
      });
    }
  }
}
</script>

