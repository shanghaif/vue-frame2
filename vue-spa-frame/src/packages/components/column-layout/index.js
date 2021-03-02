/**
 * @desc 列布局
 */
import _set from 'lodash/set';
import _assign from 'lodash/assign';
import _includes from 'lodash/includes';
import _isNil from 'lodash/isNil';

const BaseColumnLayout = {
  name: 'BaseColumnLayout',
  props: {
    /**
     * 一个可选添加的css样式类，加入到组件容器上
     */
    extraCls: {
      type: String
    },
    // 设置每个模块之间的间隙
    space: {
      type: String,
      default: '0'
    },
    // 指示组件在容器内的对齐方式
    align: {
      type: String,
      default: 'left',
      validator: function(value) {
        // stretch 拉长、stretchmax 控件横向拉伸,宽度为最宽控件的宽
        return (
          ['left', 'right', 'center', 'between', 'around'].indexOf(value) !== -1
        );
      }
    },
    // 指示组件在容器的位置
    pack: {
      type: String,
      default: 'start',
      validator: function(value) {
        // start（默认）：组件在容器上边 、center：组件在容器中间、end：组件在容器的下边
        return ['start', 'center', 'end', 'stretch'].indexOf(value) !== -1;
      }
    },
    // padding
    padding: {
      type: String,
      default: '0px'
    }
  },
  data() {
    // 对应 flex 布局的 align-self 属性
    this.flexAlign = {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
      between: 'space-between',
      around: 'space-around'
    };
    // 对应 flex 布局的 justify-content 属性
    this.flexPack = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch'
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
        const childSlot = childSlots[i];
        const { data } = childSlot;
        const style = {};
        if (_isNil(childSlot.tag)) {
          continue;
        }
        if (_isNil(data.staticStyle)) {
          data.staticStyle = {};
        }
        if (_has(data.attrs, 'width')) {
          _set(style, 'width', data.attrs.width);
        }
        if (_has(data.attrs, 'columnWidth')) {
          const columnWidth = data.attrs.columnWidth;
          const cWidth = _includes(columnWidth, '%')
            ? parseFloat(columnWidth) / 100
            : columnWidth;
          _set(style, 'flex', cWidth);
        }
        if (_has(data.attrs, 'pack')) {
          const pack = _get(data, 'attrs.pack');
          _set(data.staticStyle, 'align-self', _get(this.flexPack, pack));
          delete data.attrs.pack;
        } else {
          _set(data.staticStyle, 'align-self', _get(this.flexPack, this.pack));
        }
        _set(
          style,
          'marginRight',
          this.space ? (i === len - 1 ? 0 : this.space) : 0
        );
        data.staticStyle = _assign(data?.staticStyle ?? {}, style);
      }
      return childSlots;
    }
  },
  render(h) {
    const oClassObj = { 'base-column_wrapper': true };
    if (this.extraCls) {
      _set(oClassObj, this.extraCls, true);
    }
    const style = {
      padding: this.padding,
      'justify-content': _get(this.flexAlign, this.align)
    };
    return h('div', { class: oClassObj, style }, this.createNodes());
  }
};

export default BaseColumnLayout;
