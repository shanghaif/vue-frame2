/**
 * @desc 菜单按钮
 */
import _has from 'lodash/has';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import _isNil from 'lodash/isNil';
import _set from 'lodash/set';
import _omit from 'lodash/omit';
const BaseMenuButton = {
  name: 'BaseMenuButton',
  inheritAttrs: false,
  props: {
    // 一个可选添加的CSS样式类，加入到组件的容器上
    ctCls: {
      type: String
    },
    // v-model 值
    value: {
      type: [String, Number]
    },
    // 标题名称
    dropdownLabel: {
      type: String,
      default: '下拉菜单'
    },
    // 左边的icon
    prefixIcon: {
      type: String
    },
    // 触发下拉的行为 hover, click
    trigger: {
      type: String,
      default: 'click'
    },
    // 数据
    options: {
      type: Array
    },
    // 是否显示所有分割线
    isShowDivided: {
      type: Boolean,
      default: false
    },
    // 图标的尺寸
    svgSize: {
      type: String,
      default: '16px'
    },
    // svg 图标集合 [{name: 'studyState', component: studyState}]
    svgIcons: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    this.oData = {};
    return {
      cascaderValue: []
    };
  },
  created() {},
  methods: {
    /**
     * @desc 创建元素自身
     * @param {*} self - 元素自身
     * @returns VNode
     */
    createElSelf(self) {
      const h = this.$createElement;
      /* return h(
        {
          render(h) {
            return this.$scopedSlots.default();
          }
        },
        { scopedSlots: { default: props => self } },
        []
      ); */
      return h('base-render-self', { props: { self } });
    },
    /**
     * @desc 创建图表
     */
    createIcon(iconUrl) {
      const h = this.$createElement;
      if (/\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif)$/.test(iconUrl)) {
        return h('img', {
          style: { marginRight: '5px' },
          attrs: { src: iconUrl, width: this.svgSize, height: this.svgSize }
        });
      }
      if (iconUrl.indexOf('symbol-') !== -1) {
        return h(
          'base-svg-icon',
          {
            style: { marginRight: '5px' },
            props: {
              size: this.svgSize,
              iconname: iconUrl.replace('symbol-', '')
            }
          },
          []
        );
      }
      if (_includes(iconUrl, 'svg-')) {
        // svg图
        const curUrl = iconUrl.replace('svg-', '');
        const svgObj = _find(this.svgIcons, o => o.name === curUrl);
        if (!_isNil(svgObj)) {
          return this.$createElement(_get(svgObj, 'component', 'span'), {
            style: {
              width: this.svgSize,
              height: this.svgSize,
              marginRight: '5px'
            }
          });
        }
      }
      return h('i', { class: iconUrl }, []);
    },
    /**
     * @desc 创建 menu 的内部子元素
     * @private
     * @method
     */
    createMenuElements() {
      const h = this.$createElement;
      const nodes = [];
      for (let i = 0, len = this.options.length; i < len; i++) {
        const option = this.options[i];
        const index = '1-' + i;
        if (_has(option, 'children') && !_isEmpty(option.children)) {
          nodes.push(this.createElSubMenu(option, index));
        } else {
          const menuItem = h('el-menu-item', { props: { index } }, [
            _has(option, 'icon') ? this.createIcon(option.icon) : h(),
            this.createElSelf(option.label)
          ]);
          _set(
            this.oData,
            index,
            JSON.parse(JSON.stringify(_omit(option, ['children'])))
          );
          nodes.push(menuItem);
        }
      }
      return nodes;
    },
    /**
     * @desc 创建 el-submenu
     */
    createElSubMenu(option, index) {
      const h = this.$createElement;
      const nodes = [];
      for (let i = 0, len = option.children.length; i < len; i++) {
        const childOption = option.children[i];
        const innerIndex = `${index}-${i}`;
        if (_has(childOption, 'children') && !_isEmpty(childOption.children)) {
          const sumMenu = this.createElSubMenu(childOption, innerIndex);
          nodes.push(sumMenu);
        } else {
          const menuItem = h('el-menu-item', { props: { index: innerIndex } }, [
            _has(childOption, 'icon') ? this.createIcon(childOption.icon) : h(),
            this.createElSelf(childOption.label)
          ]);
          _set(
            this.oData,
            innerIndex,
            JSON.parse(JSON.stringify(_omit(childOption, ['children'])))
          );
          nodes.push(menuItem);
        }
      }
      return h('el-submenu', { props: { index } }, [
        h('template', { slot: 'title' }, [
          _has(option, 'icon') ? this.createIcon(option.icon) : h(),
          this.createElSelf(option.label)
        ]),
        nodes
      ]);
    }
  },
  render(h) {
    return h(
      'div',
      {
        class: {
          'base-menu-button': true,
          [this.ctCls]: !!this.ctCls
        }
      },
      [
        h(
          'el-menu',
          {
            props: {
              mode: 'horizontal',
              'menu-trigger': this.trigger,
              'unique-opened': true
            },
            on: {
              select: (key, keyPath) => {
                this.$emit('select', _get(this.oData, key));
              }
            }
          },
          [
            h(
              'el-submenu',
              {
                props: {
                  index: '0',
                  'popper-append-to-body': true,
                  'popper-class': 'base-menu--horizontal_popup'
                }
              },
              [
                h('template', { slot: 'title' }, [
                  _isNil(this.prefixIcon)
                    ? h()
                    : h(
                        'i',
                        { class: this.prefixIcon + ' base-drop-down_prefix' },
                        []
                      ),
                  this.createElSelf(this.dropdownLabel)
                ]),
                this.createMenuElements()
              ]
            )
          ]
        )
      ]
    );
  }
};
export default BaseMenuButton;
