export const bar = {
  name: 'BaseBarChart',
  props: {
    // x轴的数据
    xAxisData: {
      type: Array,
      default: () => []
    },
    // y轴的数据
    yAxisData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    this.DEFAULT_SERIES = {
      name: '',
      type: 'bar',
      data: []
    };

    this.DEFAULT_OPTION = {
      legend: {
        show: true,
        orient: 'horizontal', // 图例列表的布局朝向 'horizontal'、'vertical'
        x: 'center', // 可设定图例在左、右、居中
        y: 'top', // 可设定图例在上、下、居中
        data: []
      },
      tooltip: {
        trigger: 'axis',
        show: true,
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          data: []
        }
      ],
      series: []
    };
    return {};
  },
  methods: {}
};
