<template>
  <div class="svg-style">
    <svg width="100%" height="100%" ref="svg" :id="svgId"></svg>
  </div>
</template>
<script>
/**
 * @description 力导图-组件
 * @DATE 2020/12/02
 * @author huang.beixian
 * @params 参数说明
 * nodeInfo:[     // 节点配置
        {
            name: '广州振原机电设备有限公司', // 必须，节点文本展示信息
            id: '3',  // 必须，唯一标识
            fontColor: '#8D8E8F', // 文本展示的颜色
            fontBold: true // 文本是否加粗
            img: '/static/icon.png', // 节点的图标文件
            imgWidth:80,// 图标宽度
            imgHeight:80, // 图标高度
          },...
 * ]
 * linkInfo:[     // 关系配置
        {
            source: '11',  // 必须，关系连线起始点
            target: '1',    // 必须，关系连线结束点
            lineColor: '#ddd', // 线条颜色
            lineWidth: 1    // 线条像素
          }
 * ]
 * rejectForce|Number 力导图的斥力，数值越大，节点件的距离越远（线长度）
 * lineConfig|object = {
         labelField: 'label',  // 关系文本字段名字，必须能够在linkInfo中有对应的字段
          labelColor: '#000', // 关系文本字体颜色
          labelSize: 12   // 关系文本字体大小
 * }
 */
import * as d3 from 'd3';
import { event } from 'd3';
export default {
  props: {
    nodeInfo: {
      type: Array,
      default: () => {
        return [];
      }
    },
    linkInfo: {
      type: Array,
      default: () => {
        return [];
      }
    },
    rejectForce: {
      type: Number,
      default: 1000
    },
    lineConfig: {
      type: Object,
      default: () => {
        return {
          labelField: 'label',
          labelColor: '#000',
          labelSize: 12
        };
      }
    }
  },
  data() {
    return {
      id: 'id_' + parseInt(Math.random() * 1000000),
      svgId: 'id_' + parseInt(Math.random() * 10000),
      svg: null,
      svgWidth: null
    };
  },
  mounted() {
    this.initForceTp();
  },
  methods: {
    /**
     * @description 初始化
     */
    initForceTp() {
      this.svg = d3.select('#' + this.svgId);
      this.linkInfo.map(d => Object.create(d));
      this.nodeInfo.map(d => Object.create(d));
      const links = this.linkInfo;
      const nodes = this.nodeInfo;
      const simulation = this.setSimulationConfig(nodes, links);
      // 添加容器
      const domGraph = this.svg
        .append('g')
        .attr('class', 'graph')
        .attr('id', 'mainGraph');
      const link = this.linkConfig(domGraph);
      const node = this.nodeConfig(domGraph, simulation);
      simulation.on('tick', () => {
        link.attr('d', this.linkArc);
        node.attr('transform', d => `translate(${d.x},${d.y})`);
      });
      // 缩放事件
      this.svg.call(
        d3
          .zoom()
          .scaleExtent([0.8, 20])
          .on('zoom', () => {
            domGraph.attr(
              'transform',
              'translate(' +
                d3.event.transform.x +
                ',' +
                d3.event.transform.y +
                ')' +
                ' scale(' +
                d3.event.transform.k +
                ')'
            );
          })
      );
    },
    /**
     * @description 节点拖动事件
     */
    dragInit(simulation) {
      function dragstarted(d) {
        if (!event.active) simulation.alpha(0.6).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(d) {
        d.fx = event.x;
        d.fy = event.y;
      }
      function dragended(d) {
        d.fx = event.x;
        d.fy = event.y;
      }
      return d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    },
    /**
     * @description 节点关系设置
     */
    linkArc(d) {
      const r = 1200;
      const atr = `M${d.source.x},${d.source.y}
                   A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
                  `;
      return atr;
    },
    /**
     * @description 布局配置
     * @param {nodes|array} 节点信息
     * @param {links|array} 关系信息
     */
    setSimulationConfig(nodes, links) {
      const rejectForce = -this.rejectForce;
      const width = this.$refs.svg.clientWidth;
      const height = this.$refs.svg.clientHeight;

      const simulation = d3
        .forceSimulation(nodes)
        .force(
          'link',
          d3
            .forceLink(links)
            .id(d => d.id)
            .distance(180)
        )
        .force('charge', d3.forceManyBody().strength(rejectForce))
        .force('center', d3.forceCenter())
        .force('x', d3.forceX())
        .force('y', d3.forceY());

      simulation
        .force('charge_force', d3.forceManyBody())
        .force('center_force', d3.forceCenter(width / 2, height / 2));
      return simulation;
    },
    /**
     * @description 节点设置
     * @param {domGraph|object} 容器对象
     * @param {simulation|object} 布局对象
     */
    nodeConfig(domGraph, simulation) {
      const node = domGraph
        .append('g')
        .attr('class', 'nodes')
        .selectAll('g')
        .data(this.nodeInfo)
        .enter()
        .append('g')
        .attr('class', 'node-body')
        .attr('id', d => d.id)
        .attr('margin', 20)
        .attr('width', 200)
        .attr('height', 200)
        .attr('align', 'center')
        .call(this.dragInit(simulation));

      node
        .append('image')
        .attr('x', d => -(d.imgWidth / 2))
        .attr('y', d => -(d.imgHeight / 2))
        .attr('width', d => d.imgWidth)
        .attr('height', d => d.imgHeight)
        .attr('right', d => d.imgHeight / 2)
        .attr('xlink:href', d => d.img);

      node
        .append('text')
        .attr('x', 0)
        .attr('y', d => (d.labelTop ? d.labelTop : d.imgHeight / 1.5))
        .attr('fill', d => d.fontColor)
        .attr('stroke', d => '')
        .attr('stroke-width', 1)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', d => d.fontSize)
        .text(d => d.name)
        .clone(false)
        .lower();
      return node;
    },
    /**
     * @description 关系设置
     * @param {domGraph|object} 容器对象
     */
    linkConfig(domGraph) {
      const fieldName = this.lineConfig.labelField;
      const nameColor = this.lineConfig.labelColor
        ? this.lineConfig.labelColor
        : '#000';
      const size = this.lineConfig.labelSize ? this.lineConfig.labelSize : 12;
      const link = domGraph
        .append('g')
        .attr('class', 'edge')
        .attr('fill', 'none')
        .attr('id', 'linksId')
        .attr('stroke-width', 1)
        .selectAll('path')
        .data(this.linkInfo)
        .enter()
        .append('path')
        .attr('id', d => d.source.id + '_' + d.target.id)
        .attr('marker-end', 'url(#arrowhead)')
        .attr('stroke', d => (d.lineColor ? d.lineColor : '#999'))
        .attr('stroke-width', d =>
          d.lineWidth !== undefined ? d.lineWidth : 1
        );
      // 关系信息
      domGraph
        .append('text')
        .attr('fill', nameColor)
        .attr('font-size', size)
        .attr('align', 'center')
        .selectAll('textPath')
        .data(this.linkInfo)
        .join('textPath')
        .attr('fill', nameColor)
        .attr('startOffset', '50%')
        .attr('xlink:href', d => `#${d.source.id}_${d.target.id}`)
        .text(d => d[fieldName]);
      // 箭头标记
      const defs = this.svg.append('defs');
      const m = defs
        .append('marker')
        .attr('id', 'arrowhead')
        .attr('viewbox', '0 0 4 4')
        .attr('refX', 0)
        .attr('refY', 2)
        .attr('markerWidth', 4)
        .attr('markerHeight', 4)
        .attr('orient', 'auto')
        .attr('markerUnits', 'strokeWidth')
        .attr('stroke', 'none');
      m.append('path').attr('d', 'M0,0 L0,4 L4,2 Z');
      return link;
    }
  }
};
</script>
<style scoped lang="less">
.svg-style {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
