<template>
  <div :class="$style.box">
    <!-- <div :class="$style.chartBox">
      <div>折线图</div>
      <div ref="line-one"></div>
    </div> -->
    <div :class="$style.chartBox">
      <div>柱状图</div>
      <bar-chart-view />
    </div>
    <div :class="$style.chartBox">
      <div>柱状图测试版本</div>
      <base-bar-chart
        @chartClick="barClick"
        ref="barsChart"
        chartId="barChart"
        :xAxisData="barsChart.xAxisData"
        :seriesData="barsChart.seriesData"
        :seriesOptions="barsChart.seriesOptions"
        :tooltipUnit="barsChart.tooltipUnit"
      />
    </div>

    <div :class="$style.chartBox">
      <div>折线图测试版本</div>
      <base-line-chart
        ref="lineChart"
        chartId="lineChart"
        :xAxisData="lineChart.xAxisData"
        :seriesData="lineChart.seriesData"
      ></base-line-chart>
    </div>

    <div :class="$style.chartBox">
      <div>饼图测试版本</div>
      <base-pie-chart
        ref="pieChart"
        chartId="pieChart"
        :seriesData="pieChart.seriesData"
      ></base-pie-chart>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-duplicates
// import { BaseLineChart } from '@packages/charts/index.js';
// eslint-disable-next-line import/no-duplicates
// import { BaseBarsChart } from '@packages/charts/index.js';
import barChartView from '../bar/index.vue';
// import echarts from 'echarts';

export default {
  components: { barChartView },
  data() {
    this.lineChart = null;
    this.targetValue = 210;
    return {
      name: '图表-折线图',
      barsChart: {
        xAxisData: ['星期一', '星期二', '星期三', '星期四', '星期五'],
        seriesData: [
          [20, 30, 40, 50, 60],
          [30, 40, 50, 60, 70],
          [50, 40, 70, 80, 90]
        ],
        seriesOptions: [
          {
            name: '222',
            type: 'line'
          },
          {
            name: '3333'
          }
        ],
        tooltipUnit: ['家', '万元']
      },
      lineChart: {
        xAxisData: ['星期一', '星期二', '星期三', '星期四', '星期五'],
        seriesData: [
          [20, 30, 40, 50, 60],
          [30, 40, 50, 60, 70],
          [50, 40, 70, 80, 90]
        ]
      },
      pieChart: {
        seriesData: [
          { value: 1048, name: '搜索引擎1' },
          { value: 108, name: '搜索引擎2' },
          { value: 1083, name: '搜索引擎3' },
          { value: 683, name: '搜索引擎4' },
          { value: 883, name: '搜索引擎5' }
        ]
      }
    };
  },
  created() {
    this.$nextTick(() => {
      this.$refs.barsChart.initChart();
      this.$refs.lineChart.initChart();
      this.$refs.pieChart.initChart();
    });
  },
  mounted() {},
  destroyed() {
    this.lineChart.dispose();
  },
  methods: {
    onTitleClick() {
      console.info('title-click', this.name);
    },
    onLegendSelectChanged(event) {
      console.info('切换图例选中状态后的事件', event.name);
    },
    finishedHandler() {
      // 每次图表的操作都会触发`图表绘制完成`事件
      console.info('图表绘制完成');
    },
    onClick(params) {
      console.info('click', params);
    },
    barClick(data) {
      console.log(data, 8888);
    }
  }
};
</script>

<style lang="less" module>
.box {
  .flex-start-center;

  flex-wrap: wrap;

  .chart-box {
    margin-right: 10px;
    > div:nth-child(2) {
      width: 450px;
      height: 350px;
    }
  }
}
</style>
