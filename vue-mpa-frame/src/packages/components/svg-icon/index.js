const svgIcon = {
  name: 'BaseSvgIcon',
  props: {
    size: {
      type: String,
      default: '1em'
    },
    iconname: {
      type: String,
      default: ''
    },
    // 自定义样式
    cls: {
      type: String,
      default: ''
    }
  },
  computed: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
  render(h) {
    return h(
      'div',
      {
        class: {
          'base-svg-content': true,
          [this.cls]: this.cls
        },
        on: {
          click: event => {
            this.$emit('click', this.iconname);
          }
        }
      },
      [
        h(
          'svg',
          {
            class: 'navIcon',
            attrs: {
              'aria-hidden': true
            },
            style: {
              width: this.size,
              height: this.size,
              'vertical-align': '-0.15em'
            }
          },
          [h('use', { attrs: { 'xlink:href': '#' + this.iconname } }, [])]
        )
      ]
    );
  }
};

export default svgIcon;
