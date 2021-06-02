<template>
  <div class="tree-atlas-style">
    <svg width="100%" ref="svg" :id="id" height="100%"></svg>
  </div>
</template>
<script>
/**
 * @description 词云
 * @DATE 2020/12/02
 * @author huangbeixian
 * @params {dataCloud|Array} 词云信息
 * [
 *  {
 *    text: '标签',  //  词名称 - 必须
 *    value: 30 , // 词的大小，字体的大小 - 必须
 *    color:'#1890ff' // 词的颜色 - 非必须
 *  },{
 *    text: '标签',  //  词名称 - 必须
 *    value: 30 , // 词的大小，字体的大小 - 必须
 *    color:'#1890ff' // 词的颜色 - 非必须
 *  },...
 * ]
 * @callback cloudClick 词点击事件
 */
import { select, scaleOrdinal, schemePaired } from 'd3';
import cloud from 'd3-cloud';

export default {
  name: 'tree-atlas-style',
  props: {
    dataCloud: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      svg: null,
      layout: null,
      id: 'id_' + parseInt(Math.random() * 1000)
    };
  },
  watch: {},
  mounted() {
    this.svg = select('#' + this.id);
    const width = this.$refs.svg.clientWidth;
    const height = this.$refs.svg.clientHeight;
    this.layout = cloud()
      .size([width, height])
      .timeInterval(10)
      .words(this.dataCloud)
      .padding(5)
      .rotate(function() {
        return 0;
      })
      .font('Impact')
      .spiral('rectangular')
      .fontSize(function(d) {
        return d.value;
      })
      .on('end', this.draw);

    this.layout.start();
  },
  methods: {
    /**
     * @description 词的绘画
     */
    draw(words) {
      const color = scaleOrdinal(schemePaired);
      this.svg
        .append('g')
        .attr(
          'transform',
          'translate(' +
            this.layout.size()[0] / 2 +
            ',' +
            this.layout.size()[1] / 2 +
            ')'
        )
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', function(d) {
          return d.size + 'px';
        })
        .style('font-family', 'Impact')
        .style('cursor', 'pointer')
        .style('fill', function(d, i) {
          return d.color ? d.color : color(i);
        })
        .attr('text-anchor', 'middle')
        .attr('transform', function(d) {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
        })
        .text(function(d) {
          return d.text;
        })
        .on('click', d => {
          this.$emit('cloudClick', d);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.tree-atlas-style {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
