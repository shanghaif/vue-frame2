/**
 * @desc  iframe 面板
 * 载入外部链接展示整个网页
 */
const BaseIframe = {
  name: 'BaseIframe',
  props: {
    // iframe名称name属性
    frameName: {
      type: String,
      default: ''
    },
    // 外部网页http地址(http://www.baidu.com?token=123) iframe形式
    src: {
      type: String,
      default: ''
    },
    // 定义 iframe 的宽度
    width: {
      type: String,
      default: '100%'
    },
    // 高度
    height: {
      type: String,
      default: '100%'
    },
    // 规定是否显示框架周围的边框
    frameBorder: {
      type: Number,
      default: 0
    },
    // 规定是否在 iframe 中显示滚动条
    scrolling: {
      type: String,
      default: 'auto'
    }
  },
  data() {
    this.events = {
      load: 'load' // iframe载入完成
    };
    this.className = 'base-iframe';
    return {};
  },
  mounted() {
    setTimeout(() => {
      // 去除使用iframe出现双滚动条
      document.getElementsByClassName(
        this.className
      )[0].parentNode.style.overflow = 'hidden';
    }, 0);
  },
  render(h) {
    return h(
      'iframe',
      {
        slot: 'center',
        class: this.className,
        attrs: {
          name: this.frameName,
          src: this.src,
          frameBorder: this.frameBorder,
          width: this.width,
          height: this.height,
          scrolling: this.scrolling
        },
        on: {
          // iframe加载完成
          load: () => {
            this.$emit(this.events.load, this);
          }
        }
      },
      []
    );
  }
};
export default BaseIframe;
