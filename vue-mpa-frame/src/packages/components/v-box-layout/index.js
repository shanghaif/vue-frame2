/**
 * @desc 垂直布局
 */
import _set from 'lodash/set';
import _has from 'lodash/has';
import _isNil from 'lodash/isNil';
import _get from 'lodash/get';

const BaseVBoxLayout = {
  name: 'BaseVBoxLayout',
  props: {
    // 指示组件在容器内的对齐方式
    align: {
      type: String,
      default: 'left',
      validator: function(value) {
        // stretch 拉伸
        return ['left', 'center', 'end', 'stretch'].indexOf(value) !== -1;
      }
    },
    // 指示组件在容器的位置
    pack: {
      type: String,
      default: 'start',
      validator: function(value) {
        // start（默认）：组件在容器上边 、center：组件在容器中间、end：组件在容器的下边
        return ['start', 'center', 'end'].indexOf(value) !== -1;
      }
    },
    // 内边距
    padding: {
      type: String,
      default: '10px'
    },
    // 内部各个元素之间的 margin
    space: {
      type: String,
      default: '0'
    },
    // 一个可选添加的CSS样式类，加入到组件的容器上
    extraCls: {
      type: String
    }
  },
  data() {
    // 对应 flex 布局的 align-self 属性
    this.flexAlign = {
      left: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch'
    };
    // 对应 flex 布局的 justify-content 属性
    this.flexPack = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end'
    };
    return {};
  },
  created() {},
  methods: {
    /**
     * @desc 创建第一层子节点
     */
    createNodes() {
      const childSlots = this.$slots.default;
      for (let i = 0, len = childSlots.length; i < len; i++) {
        const { data } = childSlots[i];
        if (_isNil(data.staticStyle)) {
          data.staticStyle = {};
        }
        if (_has(data.attrs, 'flex')) {
          _set(data.staticStyle, 'flex-grow', _get(data, 'attrs.flex'));
          delete data.attrs.flex;
        }
        if (_has(data.attrs, 'align')) {
          _set(
            data.staticStyle,
            'align-self',
            _get(this.flexAlign, _get(data, 'attrs.align'))
          );
          delete data.attrs.align;
        } else {
          _set(
            data.staticStyle,
            'align-self',
            _get(this.flexAlign, this.align)
          );
        }
        if (_has(data.attrs, 'height')) {
          _set(data.staticStyle, 'height', `${_get(data, 'attrs.height')}px`);
          delete data.attrs.height;
        }
        if (i !== len - 1) {
          data.staticStyle.marginBottom = this.space;
        }
      }
      return this.$slots.default;
    }
  },
  render(h) {
    const style = {
      padding: this.padding,
      'justify-content': _get(this.flexPack, this.pack)
    };
    const oClassObj = { 'base-v-box_wrapper': true };
    if (this.extraCls) {
      _set(oClassObj, this.extraCls, true);
    }
    return h('div', { class: oClassObj, style }, this.createNodes());
  }
};
export default BaseVBoxLayout;
