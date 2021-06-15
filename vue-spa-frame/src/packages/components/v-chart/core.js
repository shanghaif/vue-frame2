import echarts from 'echarts';
import _mergeWith from 'lodash/mergeWith';
import _isArray from 'lodash/isArray';
import { defaultColorTheme } from './constant.js';

export default function() {
  const coreChart = {
    props: {
      // 自定义样式
      ctCls: {
        type: String,
        default: ''
      },
      // 图表的数据，可为多维数组
      seriesData: {
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
      // 提示框中的单位
      tooltipUnit: {
        type: Array | String,
        default: () => []
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
      },
      // 自动重绘
      autoResize: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      autoResize: (newVal, oldVal) => {
        this.autoResizeChart();
      }
    },
    data() {
      return {};
    },
    methods: {
      /**
       * @description 设置基础的公共配置与属性
       */
      getCommonOptions() {
        this.COMMON_OPTION = {
          color: defaultColorTheme
        };

        this.EVENT_LIST = [
          'click',
          'dblclick',
          'mousedown',
          'mousemove',
          'mouseup',
          'mouseover',
          'mouseout',
          'globalout',
          'contextmenu'
        ];
      },
      /**
       * @description 初始化图表
       */
      initChart() {
        this.getCommonOptions();
        // 合并公共配置与各个图表组件个性配置
        const options = _mergeWith(
          _cloneDeep(this.COMMON_OPTION),
          _cloneDeep(this.DEFAULT_OPTION)
        );

        // 设置x轴与y轴的数据
        if (this.xAxisData && this.xAxisData.length > 0) {
          options.xAxis[0].data = this.xAxisData;
        }

        // 设置y轴的相关数据
        if (this.yAxisData && this.yAxisData.length > 0) {
          options.yAxis[0].data = this.yAxisData;
        }

        // 设置图例
        this.setLegend(options);

        // 设置提示框
        this.setTooltip(options);

        // 设置自定义主题
        if (this.colorTheme.length > 0) {
          options.color = this.colorTheme;
        }

        // 将seriseData放入配置中
        options.series = this.setSeriesData();

        const container = document.getElementById(this._uid);

        this['chart' + this._uid] = echarts.init(container);

        // 将外部传入的配置属性与初始属性进行合并
        const finallyOptions = _mergeWith(options, this.chartOptions);

        this['chart' + this._uid].setOption(finallyOptions);

        this['chart' + this._uid].on('click', params => {
          this.$emit('chartClick', params);
        });

        this.chartEvent();
      },
      /**
       * @description 图表相关事件
       * @returns
       */
      onChartEvent() {
        if (!this.chartEvent) return false;

        if (!this['chart' + this._uid]) return false;

        // 为图表监听常用的鼠标事件
        this.EVENT_LIST.map(item => {
          this['chart' + this._uid].on(item, params => {
            this.$emit(item, params);
          });
        });
      },
      /**
       * @description 将默认的series的数据与传入的进行拼装
       * @returns { Array } series数组
       */
      setSeriesData() {
        const series = [];

        if (!this.seriesData.length) return [];

        // 如果是单项数据的话
        if (!(this.seriesData[0] instanceof Array)) {
          const seriesItem = _cloneDeep(this.DEFAULT_SERIES);

          if (this.seriesOptions.length) {
            Object.keys(this.seriesOptions[0]).map(key => {
              if (this.seriesOptions[0][key]) {
                seriesItem[key] = this.seriesOptions[0][key];
              }
            });
          }

          seriesItem.data = this.seriesData;
          series.push(seriesItem);

          return series;
        }

        if (this.seriesData.length > 0) {
          // 如果没有配置seriesData,单纯传入数据的时候
          this.seriesData.map((item, index) => {
            const seriesItem = _cloneDeep(this.DEFAULT_SERIES);

            if (this.seriesOptions[index]) {
              Object.keys(this.seriesOptions[index]).map(key => {
                if (this.seriesOptions[index][key]) {
                  seriesItem[key] = this.seriesOptions[index][key];
                }
              });
            }

            seriesItem.data = item;
            series.push(seriesItem);
          });

          return series;
        }
      },
      /**
       * @description 设置提示框
       */
      setTooltip(options) {
        // 是否展示提示
        if (!this.showTooltip) {
          options.tooltip.show = false;
        }

        // 如果传入的是数组的
        if (_isArray(this.tooltipUnit) && this.tooltipUnit.length) {
          options.tooltip.formatter = prams => {
            let formateContent = `${prams[0].axisValue}<br/>`;

            prams.map((item, index) => {
              formateContent += `${item.seriesName}
              ${item.seriesName ? ': ' : ''}
              ${item.value}
              ${
                this.tooltipUnit[index]
                  ? '(' + this.tooltipUnit[index] + ')'
                  : ''
              }
              <br/>`;
            });

            return formateContent;
          };
        }

        // 如果传入的是单个单位的话
        if (!_isArray(this.tooltipUnit) && this.tooltipUnit) {
          options.tooltip.formatter = prams => {
            let formateContent = `${prams[0].axisValue}<br/>`;

            prams.map(item => {
              formateContent += `${item.seriesName}
              ${item.seriesName ? ': ' : ''}
              ${item.value}
              ${this.tooltipUnit ? '(' + this.tooltipUnit + ')' : ''}
              <br/>`;
            });

            return formateContent;
          };
        }
      },
      /**
       * @description 设置图例
       * @param { Object } 图表配置项
       */
      setLegend(options) {
        if (!this.showLegend || !this.seriesOptions.length) {
          options.legend.show = false;
          options.grid.top = '2%';
          return false;
        }

        options.legend.data = this.seriesOptions.map(item => item.name);
      },
      /**
       * @description 图表重绘
       */
      resize() {
        if (this['chart' + this._uid]) {
          this['chart' + this._uid].resize();
        }
      },
      /**
       * @description 彻底重绘
       */
      emptyChartResize() {
        if (this['chart' + this._uid]) {
          this['chart' + this._uid].dispose();
        }

        this.initChart();
      },
      // 自动重绘
      autoResizeChart() {
        if (!this.autoResize) {
          return false;
        }

        window.addEventListener('resize', this.resizeChart);
      },
      /**
       * @description 手动设置echarts变量
       */
      setOptions(options) {
        const container = document.getElementById(this._uid);

        this['chart' + this._uid] = echarts.init(container);
        this['chart' + this._uid].setOption(options);
      },
      /**
       * @description 获取昂前的图表的options
       * @returns { Object } options
       */
      getChartOptions() {
        return this.options;
      }
    },
    destroyed() {
      window.removeEventListener('resize', this.resizeChart);
    },
    render(h) {
      return h(
        'div',
        {
          attrs: {
            id: this._uid
          },
          class: {
            [this.ctCls]: this.ctCls,
            'v-chart': true
          }
        },
        []
      );
    }
  };

  return coreChart;
}
