/**
 * @desc 对话框
 */
import Vue from 'vue';
import _assign from 'lodash/assign';
import _omit from 'lodash/omit';
import _keys from 'lodash/keys';
import _has from 'lodash/has';
import _get from 'lodash/get';
import _concat from 'lodash/concat';
/**
 * @typedef {Object} options - 选项配置对象
 * @property {Object} component - 组件对象
 * @property {Object} container - html 节点容器
 */

/**
 * @param {options} options - 选项配置
 * @example
 * mounted(){
 *   this.dialogInstance = this.$baseDialog({component: Detail,container: this.$el,title: '添加',slotNode: {}});
 * },
 * methods: {
 *   onOpenBaseDialog() {
 *     this.dialogInstance.open();
 *   }
 * }
 */

const BaseDialog = function (options = {}) {
  const optionsKey = _keys(options);
  const VueModal = Vue.extend({
    props: optionsKey,
    render(h) {
      let customClass = 'base-el-dialog';
      if (
        _has(this.$props, 'customClass') ||
        _has(this.$props, 'custom-class')
      ) {
        customClass +=
          ' ' +
          _get(this.$props, 'customClass', '') +
          ' ' +
          _get(this.$props, 'custom-class', '');
      }
      let contentNode = h();
      if (_has(options.component, 'render')) {
        contentNode = h(options.component);
      } else if (_has(options.component(), 'el')) {
        const detailOption = options.component();
        contentNode = h(
          detailOption.el,
          _omit(detailOption, ['el']),
          [_get(detailOption, 'text')]
        );
      } else {
        contentNode = options.component();
      }
      return h(
        'el-dialog',
        {
          class: {
            'base-dialog__wrapper': true,
            [options.ctCls]: options.ctCls
          },
          props: _assign(
            {
              destroyOnClose: true,
              title: '详情',
              visible: this.visible,
              customClass
            },
            _omit(this.$props, ['listeners', 'customClass']),
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
              if (options.isDestroy) {
                this.$destroy();
              }
              if (_has(options, 'listeners.closed')) {
                options.listeners.closed();
              }
            }
          }
        },
        [
          contentNode,
          h('template', { slot: 'title' }, this.appendTitle()),
          h('template', { slot: 'footer' }, this.appendFooter())
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
    created() {
      this.$nextTick(() => {
        document.body.appendChild(instance.$mount().$el);
      });
    },
    mounted() {},
    methods: {
      // 打开
      open(event) {
        this.visible = true;
      },
      // 关闭
      close(event) {
        this.visible = false;
      },
      // Dialog 标题区的内容
      appendTitle() {
        return _has(this.$props, 'slotNode.title')
          ? [this.$props.slotNode.title(this.$createElement)]
          : [];
      },
      // Dialog 按钮操作区的内容
      appendFooter() {
        const buttonsVNode = [];
        for (let i = 0, len = _get(options, 'buttons', []).length; i < len; i++) {
          const option = options.buttons[i];
          buttonsVNode.push(this.$createElement('el-button', _omit(option, ['text']), [option.text]));
        }
        return _has(this.$props, 'slotNode.footer')
          ? _concat([this.$props.slotNode.footer(this.$createElement)], buttonsVNode)
          : _concat([], buttonsVNode);
      }
    }
  });
  /* if (_has(options, 'container')) {
    options.container.appendChild(instance.$mount().$el);
  } */
  // document.body.appendChild(instance.$mount().$el);
  return instance;
};
export default BaseDialog;
