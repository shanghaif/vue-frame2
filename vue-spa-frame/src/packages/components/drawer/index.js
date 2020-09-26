/**
 * @desc 抽屉
 */
import _assign from 'lodash/assign';
import _omit from 'lodash/omit';
import _keys from 'lodash/keys';
import _has from 'lodash/has';
import _isNil from 'lodash/isNil';

const BaseDrawer = function (options = {}) {
  const optionsKey = _keys(options);
  const VueModal = Vue.extend({
    props: optionsKey,
    render(h) {
      return h(
        'el-drawer',
        {
          class: { 'base-drawer': true, [options.ctCls]: options.ctCls },
          props: _assign(
            { destroyOnClose: true, visible: this.visible },
            _omit(this.$props, ['listeners']),
            {}
          ),
          on: {
            open: () => {
              if (_has(options, 'listeners.open')) {
                options.listeners.open();
              }
            },
            opened: () => {
              if (_has(options, 'listeners.opened')) {
                options.listeners.opened();
              }
            },
            close: () => {
              this.visible = false;
              if (_has(options, 'listeners.close')) {
                options.listeners.close();
              }
            },
            closed: () => {
              if (_has(options, 'listeners.closed')) {
                options.listeners.closed();
              }
            }
          }
        },
        [
          _has(options.component, 'render')
            ? h(options.component)
            : options.component,
          h('template', { slot: 'title' }, this.appendTitle())
        ]
      );
    }
  });
  const instance = new VueModal({
    propsData: options,
    data() {
      return {
        visible: false
      };
    },
    methods: {
      // 打开
      open(event) {
        this.visible = true;
      },
      // 关闭
      close(event) {
        this.visible = false;
      },
      // Drawer 标题区的内容
      appendTitle() {
        return _has(this.$props, 'slotNode.title')
          ? [this.$props.slotNode.title(this.$createElement)]
          : [];
      }
    }
  });
  if (_has(options, 'container') && !_isNil(options.container)) {
    options.container.appendChild(instance.$mount().$el);
  }
  return instance;
};
export default BaseDrawer;
