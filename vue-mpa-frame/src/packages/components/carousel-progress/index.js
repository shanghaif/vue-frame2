/**
 * @desc 自定义百分比进度条滚动组件
 */
import vueSeamlessScroll from 'vue-seamless-scroll';

const BaseCarouselProgress = {
  name: 'BaseCarouselProgress',
  inheritAttrs: false,
  props: {
    list: {
      type: Array,
      default: () => []
    },
    //  自定义样式
    ctCls: {
      type: String
    },
    // 进度条的颜色
    barColor: {
      type: Array,
      default: () => ['#00FFAB', '#1679FF']
    },
    // 颜色渐变的方向
    colorDirection: {
      type: String,
      default: 'right'
    },
    // 圆点的边框颜色
    dotBorder: {
      type: String,
      default: '#1570ED'
    },
    // 圆点的阴影
    dotShadow: {
      type: String,
      default: '#0CFEFF'
    },
    // 边框的样式
    borderCls: {
      type: String,
      default: ''
    },
    isScroll: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    barBGColor: function() {
      if (this.barColor && this.barColor.length === 1) {
        return `${this.barColor[0]}`;
      }

      const colorList = this.barColor.join(',');

      return `linear-gradient(to ${this.colorDirection}, ${colorList})`;
    },
    dotStyle: function() {
      return `border: 2px solid ${this.dotBorder}; box-shadow: 0px 0px 10px 0px ${this.dotShadow};`;
    },
    classOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: !this.isScroll ? this.list.length : 0, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      };
    }
  },
  watch: {
    list: {
      immediate: true,
      handler(val) {
        if (val.length) {
          this.initComponents();
        }
      }
    }
  },
  data() {
    return {
      rankList: []
    };
  },
  methods: {
    initComponents() {
      this.$nextTick(() => {
        (this.list || []).map((item, index) => {
          this.$set(this.rankList, index, item);
        });
      });
    },
    /**
     * @description 计算进度条长度
     * @param { object } option 每一列的数据
     */
    barWidth(option) {
      if (option.percent) {
        const width =
          option.percent > 1 ? option.percent : option.percent * 100;
        return `${width}%`;
      }

      const width = ((option.value * 100) / option.total).toFixed(2);

      return `${width}%`;
    },
    /**
     * @desc 插件滚动进度条组件内部的进度项
     */
    createProgressItem() {
      const vNodes = [];
      const h = this.$createElement;
      for (let i = 0, len = this.list.length; i < len; i++) {
        const item = this.list[i];
        const oTopNode = h('div', { class: { 'progress-item-top': true } }, [
          h('p', {}, [
            h('span', { class: 'label-rank' }, [`No.${item.rank || i + 1}`]),
            h('span', { class: 'label-name' }, [item.name])
          ]),
          h('p', {}, [item.value ? `${item.value} ${item.unit}` : ''])
        ]);
        const oBarNode = h(
          'div',
          {
            class: { 'progress-item-bar': true },
            style: { border: this.borderCls }
          },
          [
            h('div', {
              class: 'progress-item-bar-content',
              style: { background: this.barBGColor, width: this.barWidth(item) }
            }),
            h(
              'span',
              { class: 'progress-item-bar-dot', style: this.dotStyle },
              []
            )
          ]
        );
        vNodes.push(
          h('div', { class: { 'progress-item': true } }, [oTopNode, oBarNode])
        );
      }
      return vNodes;
    }
  },
  render(h) {
    return h(
      vueSeamlessScroll,
      // 'div',
      {
        class: {
          'base-carousel-progress__wrapper': true,
          [this.ctCls]: this.ctCls
        },
        props: {
          data: this.list,
          'class-option': this.classOption
        }
      },
      [h('div', { class: { progress: true } }, [this.createProgressItem()])]
    );
  }
};
export default BaseCarouselProgress;
