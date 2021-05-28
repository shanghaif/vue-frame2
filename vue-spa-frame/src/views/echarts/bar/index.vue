<template>
  <div :class="$style.box" ref="bar-one">柱状图</div>
</template>

<script>
import { BaseBarChart } from '@packages/charts/index.js';

export default {
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      const options = {
        title: { subtext: '', show: true, x: 'left', y: 'top' },
        tooltipUnit: ['亿元', '%', '%'],
        grid: {
          top: 80
        },
        legend: { padding: [30, 0, 0, 0] },
        xAxis: [{ splitLine: false }],
        yAxis: [{}, { splitLine: { show: false } }]
      };
      this.lineChart = new BaseBarChart(this.$refs['bar-one'], options);
      console.info(this.lineChart);
    }
  }
};
</script>
<style lang="less" module>
.box {
  .full-y;
}
</style>
