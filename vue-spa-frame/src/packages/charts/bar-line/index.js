import echarts from 'echarts';
import _mergeWith from 'lodash/mergeWith';
/**
 * @desc 柱状折线图
 */
const BaseBarsChart = {
  name: 'BaseBarsChart',
  props: {
    // 图表的id
    chartId: {
      type: String,
      default: '',
      require: true
    },
    // 自定义样式
    ctCls: {
      type: String,
      default: ''
    },
    // x轴的数据
    xAxisData: {
      type: Array,
      default: () => []
    },
    // y轴的数据
    yAxisData: {
      type: Array,
      default: () => []
    },
    // 图表的数据，可为多维数组
    seriseData: {
      type: Array,
      default: () => []
    },
    // 图表相关数据的展示配置
    seriesOptions: {
      type: Array,
      default: () => []
    },
    // 图表的配置项，基于默认的配置进行拓展
    chartOptions: {
      type: Object,
      default: () => {}
    },
    // 展示提示框
    showTooltip: {
      type: Boolean,
      default: true
    },
    // 展示图例
    showLegend: {
      type: Boolean,
      default: true
    },
    // 颜色主题
    colorTheme: {
      type: Array,
      default: () => []
    }
  },
  const: {
    // 默认的基础配置
    DEFAULT_OPTION: {
      color: [
        '#5b8ff9',
        '#61ddaa',
        '#65789b',
        '#f6bd16',
        '#7262fd',
        '#78d3f8',
        '#9661bc',
        '#f6903d',
        '#008685',
        '#f08bb4'
      ],
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
    },
    // 默认的 serise的配置项
    DEFAULT_SERISE: {
      name: '',
      type: 'bar',
      data: []
    }
  },
  computed: {
    getCurrentTime() {
      return new Date().getTime();
    }
  },
  data() {
    return {
      myChart: null
    };
  },
  created() {
    // this.initChart();
  },
  methods: {
    /**
     * @description 初始化图表
     */
    initChart() {
      // 将外部传入的配置属性与初始属性进行合并
      const options = _mergeWith(
        _cloneDeep(this.DEFAULT_OPTION),
        this.chartOptions
      );

      // 设置x轴与y轴的数据
      if (this.xAxisData.length > 0) {
        options.xAxis[0].data = this.xAxisData;
      }

      // 设置y轴的相关数据
      if (this.yAxisData.length > 0) {
        options.yAxis[0].data = this.yAxisData;
      }

      // 设置图例
      this.setlegend(options);

      // 是否展示提示
      if (!this.showTooltip) {
        options.tooltip.show = false;
      }

      // 设置自定义主题
      if (this.colorTheme.length > 0) {
        options.color = this.colorTheme;
      }

      options.series = this.setSeriseData();

      const container = document.getElementById(this.chartId);

      this.myChart = echarts.init(container);
      this.myChart.setOption(options);
    },
    /**
     * @description 将默认的serise的数据与传入的进行拼装
     * @returns { Array } serise数组
     */
    setSeriseData() {
      const serise = [];

      if (!this.seriseData.length) return [];

      // 如果是单项数据的话
      if (!(this.seriseData[0] instanceof Array)) {
        const seriseItem = _cloneDeep(this.DEFAULT_SERISE);

        if (this.seriesOptions.length) {
          Object.keys(this.seriesOptions[0]).map(key => {
            if (this.seriesOptions[0][key])
              seriseItem[key] = this.seriesOptions[0][key];
          });
        }

        seriseItem.data = this.seriseData;
        serise.push(seriseItem);

        return serise;
      }

      if (this.seriseData.length > 0) {
        // 如果没有配置seriseData,单纯传入数据的时候
        this.seriseData.map((item, index) => {
          const seriseItem = _cloneDeep(this.DEFAULT_SERISE);

          if (this.seriesOptions[index]) {
            Object.keys(this.seriesOptions[index]).map(key => {
              if (this.seriesOptions[index][key]) {
                seriseItem[key] = this.seriesOptions[index][key];
              }
            });
          }

          seriseItem.data = item;
          serise.push(seriseItem);
        });

        return serise;
      }
    },
    /**
     * @description 设置图例
     * @param { Object } 图表配置项
     */
    setlegend(options) {
      if (!this.showLegend || !this.seriesOptions.length) {
        options.legend.show = false;
        return false;
      }

      options.legend.data = this.seriesOptions.map(item => item.name);
    },
    /**
     * @description 图表重绘
     */
    resize() {
      if (this.myChart) {
        this.myChart.resize();
      }
    },
    /**
     * @description 彻底重绘
     */
    emptyChartResize() {
      if (this.myChart) {
        this.myChart.dispose();
      }

      this.initChart();
    }
  },
  render(h) {
    return h(
      'div',
      {
        attrs: {
          id: this.chartId
        },
        class: {
          [this.ctCls]: this.ctCls
        }
      },
      []
    );
  }
};

export default BaseBarsChart;
