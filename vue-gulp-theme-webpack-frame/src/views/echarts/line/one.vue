<template>
  <div id="container" :class="{'full-y': true}">折线示例-1</div>
</template>

<script>
import { BaseLineChart } from '@packages/charts/index.js';

export default {
  data() {
    this.lineChart = null;
    return {
      name: '图表-折线图'
    };
  },
  created() {
    console.info('111 ', BaseLineChart);
  },
  mounted() {
    const options = {
      title: { text: '人员到岗图' },
      xAxis: {
        data: [
          '星期一',
          '星期二',
          '星期三',
          '星期四',
          '星期五',
          '星期六',
          '星期天'
        ]
      },
      series: [{ data: [200, 256, 469.451, 300, 445, 320, 400] }],
      isShowLegend: true,
      legendPosition: 'top-center',
      isCancelLegendSelectChanged: true,
      listeners: {
        titleClick: this.onTitleClick, // 标题栏点击
        finished: this.finishedHandler, // 渲染结束
        click: this.onClick, // 折线点事件
        // https://echarts.apache.org/zh/api.html#events.legendselectchanged
        legendselectchanged: this.onLegendSelectChanged // 切换图例选中状态后的事件
      }
    };
    this.lineChart = new BaseLineChart(this.$el, options);
    console.info(this.lineChart);
  },
  destroyed() {
    this.lineChart.dispose();
  },
  methods: {
    onTitleClick() {
      console.info('title-click', this.name);
    },
    onLegendSelectChanged() {
      console.info('切换图例选中状态后的事件');
    },
    finishedHandler() {
      console.info('图表绘制完成');
    },
    onClick(params) {
      console.info('click', params);
    }
  }
};
</script>

<style lang="less" module>
.box {
}
</style>
