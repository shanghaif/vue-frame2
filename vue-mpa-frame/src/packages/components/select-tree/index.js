/**
 * @desc select-tree 选择器
 */
import _assign from 'lodash/assign';
import _includes from 'lodash/includes';
import _findIndex from 'lodash/findIndex';
import _isNil from 'lodash/isNil';
import _toNumber from 'lodash/toNumber';
import _isEmpty from 'lodash/isEmpty';
import _has from 'lodash/has';
import _omit from 'lodash/omit';
import _isArray from 'lodash/isArray';
import _isEqual from 'lodash/isEqual';
import _difference from 'lodash/difference';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _isString from 'lodash/isString';

const BaseSelectTree = {
  name: 'BaseSelectTree',
  inheritAttrs: false,
  model: {
    prop: 'selectTreeValue',
    event: 'selectTreeChange'
  },
  props: {
    // 传入默认选中值 ['',''] String 需要默认选中时请结合 'defaultCheckedKeys' 参数
    // 值的匹配必须和 'defaultCheckedKeys'相同
    value: {
      default() {
        return [];
      }
    },
    // 最多只能选择几个数量
    maxItem: {
      type: Number
    },
    // 最多只能选择几个数量-对象形配置
    maxItemObj: {
      type: Object
      // default() {
      //   return { level: 1, max: 3 }; // 第一层最多选中3个节点，第一层下面的节点仍旧可以选中，其余第一层节点下的节点无法选中
      // }
    },
    // 输入框宽度
    width: {
      type: [Number, String],
      default: 160
    },
    // tree面板宽度
    treeWidth: {
      type: Number,
      default: 200
    },
    // Select 组件头部内容
    prefixLabel: {
      type: String
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 默认要勾选tree的节点keys 必须是唯一值id的value
    // 适用于数据源由外部传入，如果是远程获取必须在数据中增加'check'字段标明是否选中
    defaultCheckedKeys: {
      type: Array,
      default() {
        return [];
      }
    },
    // 定义外部 v-model 值，默认值 null 因为单选传入 String ，多选 array 并不确定
    selectTreeValue: {
      default() {
        return null;
      }
    },
    // 自定义样式名
    ctCls: {
      type: String
    },
    // 外部事件扩展 只有 'change' 选中值发生改变事件
    listeners: {
      type: Object,
      default() {
        return {};
      }
    },
    // 显示字段
    displayField: {
      type: String,
      default: 'name'
    },
    // 值字段
    valueField: {
      type: String,
      default: 'id'
    },
    // 是否显示完整的路径（true 显示完整的路径，false 仅显示最后一级）
    showAllLevels: {
      type: Boolean,
      default: false
    },
    // 是否显示搜索框
    isRenderSearchInput: {
      type: Boolean,
      default: false
    },
    // 自定义过滤函数
    filterNodeMethodHandle: {
      type: Function
    },
    // 是否显示下拉树选中的值到select的框中
    isShowCheckSelectValue: {
      type: Boolean,
      default: true
    },
    // 父子级联如果是false的情况下，是否需要父子联动（选中一个子节点级联选中对应的所有父级节点，取消某个父节点级联取消该节点下的所有子节点）
    checkStrictlyFalseCancelChildChecked: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    selectTreeValue(val, oldVal) {
      if (!_isNil(val) && val.length === 0) {
        this.clear();
      } else {
        const checkedKeys = this.$refs[this.treeUserRef]
          .getTree()
          .getCheckedKeys();
        if (_isArray(val) && this.multiple && !_isEqual(val, checkedKeys)) {
          if (val.length < checkedKeys.length) {
            // 多选
            const aDifferenceList = _difference(
              this.$refs[this.treeUserRef].getTree().getCheckedKeys(),
              val
            ); // 删除了哪几个值
            this.outValueRemove(aDifferenceList);
            this.$refs[this.treeUserRef].setCheckedKeys(
              this.curSelectValueList
            );
          } else {
            const aDifferenceList = _difference(
              val,
              this.$refs[this.treeUserRef].getTree().getCheckedKeys()
            ); // 添加哪几个值
            this.outValueAdd(aDifferenceList);
            for (let i = 0, len = aDifferenceList.length; i < len; i++) {
              this.getTree()
                .getTree()
                .setChecked(aDifferenceList[i], true);
            }
          }
          return;
        }
        // 单选
        if (val !== this.curSelectValue) {
          this.setSingleNode();
        }
      }
    }
  },
  data() {
    this.popoverOffsetTop = 0; // 下拉面板的 offsetTop 偏差值
    this.selectInputHeight = 0; // select 控件对应的 input 框的高度
    return {
      placement: 'bottom-start',
      treeUserRef: `${this._uid}-selectTree`,
      popoverVisible: false,
      // 本地数据
      curSelectNodeList: [],
      curSelectLabelList: [],
      curSelectValueList: [], // 复选
      curSelectNode: null,
      curSelectLabel: '', // 单选
      curSelectValue: '',
      curDefaultCheckedKeys: [...this.defaultCheckedKeys],
      treeValue: [],
      options: [], // [{ value: '', label: '' }]
      filterText: ''
    };
  },
  created() {},
  methods: {
    /**
     * @desc 获取 tree 对象
     */
    getTree() {
      return this.$refs[this.treeUserRef];
    },
    /**
     * @desc 手动打开tree下拉面板
     */
    handOpenTree() {
      setTimeout(() => {
        this.popoverVisible = true;
      }, 0);
    },
    /**
     * @desc 手动隐藏tree下拉面板
     */
    handCloseTree() {
      setTimeout(() => {
        this.popoverVisible = false;
      }, 0);
    },
    /**
     * @desc 创建 el-popover
     */
    createPopover() {
      const vNode = [];
      const h = this.$createElement;
      vNode.push(
        h(
          'el-popover',
          {
            ref: `${this._uid}-base-select-tree-popover`,
            props: {
              popperClass: 'base-el-popover',
              placement: this.placement,
              // title: '标题',
              width: this.treeWidth,
              trigger: 'click',
              value: this.popoverVisible
              // content: 'hello'
            },
            on: {
              input: val => {
                this.popoverVisible = val;
              }
            }
          },
          [
            this.isRenderSearchInput
              ? h('el-input', {
                  attrs: {
                    placeholder: '请输入内容',
                    maxlength: '30',
                    clearable: true
                  },
                  props: { value: this.filterText, showWordLimit: true },
                  on: {
                    input: val => {
                      this.filterText = val;
                      this.getTree()
                        .getTree()
                        .filter(val);
                    }
                  }
                })
              : h(),
            this.createTree(),
            h(
              'div',
              { slot: 'reference', style: { height: '0px' }, ref: 'bbb' },
              // 'click 激活'
              []
            )
          ]
        )
      );
      return vNode;
    },
    /**
     * @desc 创建 el-tree 节点
     */
    createSelect() {
      const h = this.$createElement;
      let prefixLabelVNode = h();
      // Select 组件头部内容
      if (this.prefixLabel) {
        prefixLabelVNode = h(
          'span',
          { style: { lineHeight: '32px' }, slot: 'prefix' },
          this.prefixLabel
        );
      }
      const style = {
        width: _isString(this.width) ? this.width : `${this.width}px`
      }; // 文本框控件宽度
      const vNode = h(
        'el-select',
        {
          ref: `${this._uid}-base-select-tree-ref`,
          style,
          attrs: {
            id: this.$attrs.id,
            autofocus: this.$attrs.autofocus,
            placeholder: this.$attrs.placeholder
          },
          props: _assign(
            {},
            {
              value: !this.isShowCheckSelectValue
                ? []
                : this.multiple
                ? this.curSelectValueList
                : this.curSelectValue,
              // value: this.multiple
              //   ? this.curSelectValueList
              //   : this.curSelectValue,
              clearable: true, // 有清除按钮
              multiple: this.multiple, // 设置多选，value对应为数组
              'collapse-tags': true // 合并多选
            },
            this.$attrs
          ),
          on: {
            'hook:mounted': () => {
              this.selectInputHeight = this.$refs[
                `${this._uid}-base-select-tree-ref`
              ].$el.offsetHeight; // input 框的高度
            },
            clear: () => {
              this.$emit(
                'clearValue',
                this.multiple ? this.curSelectValueList : this.curSelectValue
              );
              this.clear();
              this.$refs[this.treeUserRef].clearChecked();
              this.$emit('selectTreeChange', this.multiple ? [] : '');
              this.change([]);
              this.setSelectPanel2InputOffsetTop();
              this.$emit('clear', this.multiple ? [] : '');
            },
            'remove-tag': tag => {
              this.$emit(
                'clearValue',
                this.multiple ? this.curSelectValueList : this.curSelectValue
              );
              const index = _findIndex(
                this.curSelectValueList,
                value => value === tag
              );
              const optionIndex = _findIndex(
                this.options,
                item => item[this.valueField] === tag
              );
              if (index !== -1) {
                this.curSelectNodeList.splice(index, 1);
                this.curSelectLabelList.splice(index, 1);
                this.curSelectValueList.splice(index, 1);
              }
              if (optionIndex !== -1) {
                this.options.splice(optionIndex, 1);
              }
              this.$emit('selectTreeChange', this.curSelectValueList);
              this.change(this.curSelectNodeList);
              this.$refs[this.treeUserRef].setCheckedKeys(
                this.curSelectValueList
              );
              this.setSelectPanel2InputOffsetTop();
              this.$emit('remove-tag', this.multiple ? [] : '');
            }
          },
          nativeOn: {
            click: event => {
              const selectTree = this.$refs[
                `${this._uid}-base-select-tree-ref`
              ];
              if (
                !_isNil(selectTree) &&
                !_isNil(selectTree.$el) &&
                !_isNil(document.body.clientHeight)
              ) {
                if (
                  document.body.clientHeight -
                    selectTree.$el.parentNode.offsetTop <
                  470
                ) {
                  this.placement = 'top-start';
                }
              }
              if (
                !_has(this.$attrs, 'disabled') ||
                (_has(this.$attrs, 'disabled') &&
                  this.$attrs.disabled === false)
              ) {
                this.$refs[`${this._uid}-base-select-tree-ref`].blur();
                this.$refs.bbb.click(); // 如果是 el-button ，那么自动触发 click 事件 `this.$refs.bbb.$el.click();`
                event.stopPropagation();
                event.preventDefault();
                return false;
              }
            }
          }
        },
        [
          prefixLabelVNode,
          this.createOptions(),
          h(
            'div',
            {
              class: 'base-select-tree-down-empty',
              slot: 'empty',
              style: { display: 'none' }
            },
            []
          )
        ]
      );
      return vNode;
    },
    /**
     * @desc 创建 el-option 节点
     */
    createOptions() {
      const h = this.$createElement;
      const vNode = this.options.map((option, index) => {
        return h('el-option', {
          style: {
            /* width: `${this.treeWidth}px`,
              height: 'auto',
              'max-height': `${this.treeHeight}px`,
              'background-color': this.backgroundColor,
              padding: '0px',
              overflow: 'auto', */
            display: 'absolute',
            top: '0px',
            left: '0px',
            height: '0px',
            'z-index': '-100'
            // display: 'none'
          },
          props: {
            key: option[this.valueField],
            label: option[this.displayField],
            value: option[this.valueField]
          },
          on: {
            'hook:mounted': () => {}
          }
        });
      });
      return vNode;
    },
    /**
     * @desc 创建下拉 tree 控件
     */
    createTree() {
      const h = this.$createElement;
      const that = this;
      return h('base-tree', {
        style: {
          height: '100%',
          overflow: 'auto',
          'font-weight': 'normal'
        },
        class: 'select-tree-panel',
        ref: this.treeUserRef,
        attrs: {
          defaultCheckedKeys: this.curDefaultCheckedKeys,
          checkStrictly: _get(this.$attrs, 'check-strictly', this.multiple), // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
          showCheckbox: this.multiple, // 出现复选框
          ..._omit(this.$attrs, [
            'defaultCheckedKeys',
            'checkStrictly',
            'showCheckbox'
          ]),
          'filter-node-method': (value, data) => {
            if (!value) return true;
            if (!_isNil(this.filterNodeMethodHandle)) {
              return this.filterNodeMethodHandle(value, data);
            }
            return ~_get(data, this.displayField).indexOf(value);
          }
        },
        props: _assign(
          {},
          {
            displayField: this.displayField,
            valueField: this.valueField,
            treeValue: this.treeValue, // v-model value 属性
            listeners: {
              nodeClick: (record, node, tree) => {
                // 使 input 失去焦点，并隐藏下拉框
                this.$refs[`${this._uid}-base-select-tree-ref`].blur();
                const eventName = _has(this.$listeners, 'nodeClick')
                  ? 'nodeClick'
                  : 'node-click';
                this.$emit(eventName, record, node, tree);
              },
              checkChange: (record, checked, childCheckNodes) => {
                if (
                  this.curSelectValueList.includes(record[this.valueField]) &&
                  !checked
                ) {
                  const index = this.curSelectValueList.findIndex(
                    value => value === record[this.valueField]
                  );
                  const optionIndex = this.options.findIndex(
                    item => item[this.valueField] === record[this.valueField]
                  );
                  if (index !== -1) {
                    this.curSelectValueList.splice(index, 1);
                    this.curSelectLabelList.splice(index, 1);
                    this.curSelectNodeList.splice(index, 1);
                  }
                  if (optionIndex) {
                    this.options.splice(optionIndex, 1);
                  }
                }
              }
            }
          },
          this.$attrs
        ),
        on: {
          // 数据加载完成
          afterLoadStore(data) {
            // 默认选中
            if (!_isNil(that.selectTreeValue)) {
              if (that.multiple) {
                that.curDefaultCheckedKeys.push(...that.selectTreeValue);
              } else {
                // that.curDefaultCheckedKeys.push(that.selectTreeValue); // 单选不用设置，因为单选其实没有选中的效果
              }
              setTimeout(() => {
                if (that.multiple) {
                  const nodes = that.$refs[that.treeUserRef].getCheckedNodes();
                  if (!_isEmpty(nodes)) {
                    for (let i = 0, len = nodes.length; i < len; i++) {
                      const treeNode = that
                        .getTree()
                        .getTree()
                        .getNode(nodes[i][that.valueField]);
                      const levelStr = that
                        .getTree()
                        .getNodeParentLevel(treeNode);
                      that.options.push({
                        [that.valueField]: nodes[i][that.valueField],
                        [that.displayField]: that.showAllLevels
                          ? levelStr
                          : nodes[i][that.displayField]
                      });
                      if (that.multiple) {
                        that.curSelectValueList.push(nodes[i][that.valueField]);
                        that.curSelectLabelList.push(
                          nodes[i][that.displayField]
                        );
                        that.curSelectNodeList.push(nodes[i]);
                      }
                    }
                    if (!that.multiple) {
                      that.curSelectValue = nodes[0][that.valueField];
                    }
                  }
                } else {
                  // 单选
                  that.setSingleNode();
                }
              }, 0);
            }
          },
          check: (node, treeCheckedNode) => {
            this.$emit('check', node, treeCheckedNode);
            // 多选-点击复选框
            this.$refs.bbb.click(); // 防止下拉树面板在点击后隐藏
            this.setSelectPanel2InputOffsetTop();
            if (this.multiple) {
              const checkedKeys = this.$refs[this.treeUserRef]
                .getTree()
                .getCheckedKeys();
              // 操作最大的选中数量
              if (!_isNil(this.maxItem) && checkedKeys.length > this.maxItem) {
                this.$refs[this.treeUserRef]
                  .getTree()
                  .setChecked(node[this.valueField], false);
                return;
              }
              if (!_isNil(this.maxItemObj)) {
                const treeNode = this.$refs[this.treeUserRef]
                  .getTree()
                  .getNode(_get(node, this.valueField));
                const level = _get(this.maxItemObj, 'level');
                const max = _get(this.maxItemObj, 'max');
                const checkedNodes = _map(checkedKeys, v =>
                  this.$refs[this.treeUserRef].getTree().getNode(v)
                );
                const levelNodes = _filter(
                  checkedNodes,
                  v => v.level === level
                );
                if (levelNodes.length > max) {
                  this.$refs[this.treeUserRef]
                    .getTree()
                    .setChecked(node[this.valueField], false);
                  return;
                }
                if (levelNodes.length === max && treeNode.level > level) {
                  const isInclude = this.getTree().isTreeNodesIncludeNode(
                    levelNodes,
                    treeNode
                  ); // 选中的节点是否在指定大类的小类中，如果是则选中否则取消选中
                  // 不包含在里面取消当前选中的节点
                  if (!isInclude) {
                    this.cancelChecked(node);
                    return;
                  }
                }
                if (treeNode.level > level && levelNodes.length === max) {
                  const isInclude = this.getTree().isTreeNodesIncludeNode(
                    levelNodes,
                    treeNode
                  ); // 选中的节点是否在指定大类的小类中，如果是则选中否则取消选中
                  console.log('isInclude', isInclude);
                  // 不包含在里面取消当前选中的节点
                  if (!isInclude) {
                    this.cancelChecked(node);
                    return;
                  }
                }
              }
              if (!_get(this.$attrs, 'check-strictly', this.multiple)) {
                // 多选，父子级联
                const options = [];
                this.curSelectLabelList = [];
                this.curSelectValueList = [];
                this.options = [];
                this.curSelectNodeList = treeCheckedNode.checkedNodes;
                for (
                  let i = 0, len = this.curSelectNodeList.length;
                  i < len;
                  i++
                ) {
                  const name = _get(
                    this.curSelectNodeList[i],
                    this.displayField
                  );
                  const value = _get(
                    this.curSelectNodeList[i],
                    this.valueField
                  );
                  this.curSelectLabelList.push(name);
                  this.curSelectValueList.push(value);
                  const treeNode = this.getTree()
                    .getTree()
                    .getNode(value);
                  const levelStr = this.getTree().getNodeParentLevel(treeNode);
                  options.push({
                    [this.displayField]: this.showAllLevels ? levelStr : name,
                    [this.valueField]: value
                  });
                }
                this.options = options;
              } else {
                const treeNode = this.getTree()
                  .getTree()
                  .getNode(node[this.valueField]);
                // 父子不级联
                if (
                  this.checkStrictlyFalseCancelChildChecked &&
                  !treeNode.checked
                ) {
                  // 取消选中
                  const childCheckNodes = this.getTree().getNodeCheckedChild(
                    treeNode
                  );
                  for (let i = 0, len = childCheckNodes.length; i < len; i++) {
                    this.getTree()
                      .getTree()
                      .setChecked(childCheckNodes[i], false);
                    const index = _findIndex(
                      this.curSelectValueList,
                      v => v === childCheckNodes[i]
                    );
                    if (index !== -1) {
                      this.curSelectNodeList.splice(index, 1);
                      this.curSelectLabelList.splice(index, 1);
                      this.curSelectValueList.splice(index, 1);
                      this.options.splice(index, 1);
                    }
                  }
                }
                if (
                  this.checkStrictlyFalseCancelChildChecked &&
                  treeNode.checked
                ) {
                  // 级联选中
                  const parentTreeNodes = this.getTree().getNodeParentNodes(
                    treeNode
                  );
                  const checkedHandle = () => {
                    for (
                      let i = 0, len = parentTreeNodes.length;
                      i < len;
                      i++
                    ) {
                      const node = parentTreeNodes[i];
                      if (!node.checked) {
                        this.$nextTick(() => {
                          this.$refs[this.treeUserRef]
                            .getTree()
                            .setChecked(node.data[this.valueField], true);
                        });
                        this.curSelectNodeList.push(node.data);
                        this.curSelectLabelList.push(
                          node.data[this.displayField]
                        );
                        this.curSelectValueList.push(
                          node.data[this.valueField]
                        );
                        this.options.push({
                          [this.displayField]: this.showAllLevels
                            ? this.getTree().getNodeParentLevel(node)
                            : node.data[this.displayField],
                          [this.valueField]: node.data[this.valueField]
                        });
                      }
                    }
                  };
                  if (_isEmpty(this.maxItemObj)) {
                    checkedHandle();
                  } else {
                    const level = _get(this.maxItemObj, 'level');
                    const max = _get(this.maxItemObj, 'max');
                    const checkedNodes = _map(checkedKeys, v =>
                      this.$refs[this.treeUserRef].getTree().getNode(v)
                    );
                    const levelNodes = _filter(
                      checkedNodes,
                      v => v.level === level
                    );
                    if (levelNodes.length < max) {
                      checkedHandle();
                    }
                  }
                }
                if (!_includes(checkedKeys, node[this.valueField])) {
                  this.$emit('selectTreeChange', this.curSelectValueList);
                  this.change(this.curSelectNodeList);
                  return;
                }
                this.curSelectNodeList.push(node);
                this.curSelectLabelList.push(node[this.displayField]);
                this.curSelectValueList.push(node[this.valueField]);

                const levelStr = this.getTree().getNodeParentLevel(treeNode);
                this.options.push({
                  [this.displayField]: this.showAllLevels
                    ? levelStr
                    : node[this.displayField],
                  [this.valueField]: node[this.valueField]
                });
              }
              this.$emit('selectTreeChange', this.curSelectValueList);
              this.change(this.curSelectNodeList);
            }
          },
          // v-model input事件
          currentChange: (record = {}, curNode = {}) => {
            // 单选
            if (!this.multiple) {
              if (
                _has(this.$attrs, 'isSelectedLastNode') &&
                this.$attrs.isSelectedLastNode
              ) {
                const treeProps = this.$refs[this.treeUserRef].props;
                // 设置需要选中最里面的节点
                if (
                  _has(record, treeProps.children) &&
                  !_isNil(_get(record, treeProps.children)) &&
                  _get(record, treeProps.children).length !== 0
                ) {
                  return;
                }
              }
              if (
                (_has(this.$attrs, 'selectedLevel') &&
                  this.$attrs.selectedLevel &&
                  curNode.level !== this.$attrs.selectedLevel) ||
                (_has(this.$attrs, 'disabledNodes') &&
                  !_isEmpty(this.$attrs.disabledNodes) &&
                  _includes(
                    this.$attrs.disabledNodes,
                    _get(curNode, `data.${this.valueField}`)
                  ))
              ) {
                return;
              }
              if (
                _has(curNode, 'data.disabled') &&
                curNode.data.disabled === true
              ) {
                return;
              }
              const node = this.getTree()
                .getTree()
                .getNode(record[this.valueField]);
              const levelStr = this.getTree().getNodeParentLevel(node);
              this.options = [];
              this.options.push({
                [this.displayField]: this.showAllLevels
                  ? levelStr
                  : record[this.displayField],
                [this.valueField]: record[this.valueField]
              });
              this.curSelectValue = record[this.valueField];
              this.curSelectLabel = record[this.displayField];
              this.$emit('selectTreeChange', this.curSelectValue);
              this.change({
                [this.displayField]: record[this.displayField],
                [this.valueField]: record[this.valueField]
              });
            }
          },
          // 清空数据事件
          clearData: () => {
            this.clear();
            this.$refs[this.treeUserRef].clearChecked();
            this.$emit('selectTreeChange', this.multiple ? [] : '');
            this.change([]);
            this.setSelectPanel2InputOffsetTop();
            this.$emit('clear', this.multiple ? [] : '');
          }
        },
        scopedSlots: _has(this.$scopedSlots, 'default')
          ? {
              default: props => {
                return this.$scopedSlots.default(props);
              },
              handleIconScope: props => {
                return _has(this.$scopedSlots, 'handleMenuScope')
                  ? this.$scopedSlots.handleMenuScope(props)
                  : h();
              }
            }
          : undefined
      });
    },
    /**
     * @desc 设置单选-选中效果（单选其实在树上面没有选中效果）
     */
    setSingleNode() {
      const that = this;
      if (
        !_isNil(that.$refs[that.treeUserRef]) &&
        !_isNil(that.$refs[that.treeUserRef].getTree()) &&
        !_isNil(that.selectTreeValue)
      ) {
        const checkedNode = that.$refs[that.treeUserRef]
          .getTree()
          .getNode(that.selectTreeValue);
        if (!_isNil(checkedNode)) {
          const record = checkedNode;
          this.options = [];
          this.options.push({
            [that.displayField]: this.showAllLevels
              ? this.getTree().getNodeParentLevel(checkedNode)
              : record.data[that.displayField],
            [that.valueField]: record.data[that.valueField]
          });
          that.curSelectValue = record.data[that.valueField];
          that.curSelectLabel = record.data[that.displayField];
          that.$emit('selectTreeChange', that.curSelectValue);
          that.change({
            [that.displayField]: record.data[that.displayField],
            [that.valueField]: record.data[that.valueField]
          });
        }
      }
    },
    /**
     * @desc 计算下拉面板和input框之间的高度差值
     */
    setSelectPanel2InputOffsetTop() {
      setTimeout(() => {
        const popoverEl = this.$refs[`${this._uid}-base-select-tree-popover`]
          .$el;
        if (!_isNil(popoverEl) && !_isNil(popoverEl.childNodes)) {
          const selectInputHeight = this.$refs[
            `${this._uid}-base-select-tree-ref`
          ].$el.clientHeight; // input 框的高度
          // console.info('abc ', this.$refs[`${this._uid}-base-select-tree-ref`]);
          const oldTopNum = this.$refs[
            this.treeUserRef
          ].$el.parentNode.style.top.replace('px', '');
          // console.info(this.selectInputHeight, selectInputHeight);
          if (selectInputHeight > this.selectInputHeight) {
            const dValue = selectInputHeight - this.selectInputHeight; // 差值
            this.$refs[
              this.treeUserRef
            ].$el.parentNode.style.top = `${_toNumber(oldTopNum) +
              _toNumber(dValue)}px`;
          } else if (selectInputHeight <= this.selectInputHeight) {
            const dValue = this.selectInputHeight - selectInputHeight;
            // console.info('================', dValue);
            if (dValue !== 0) {
              this.$refs[
                this.treeUserRef
              ].$el.parentNode.style.top = `${_toNumber(oldTopNum) -
                _toNumber(dValue)}px`;
            }
          }
          this.selectInputHeight = selectInputHeight;
        }
      }, 100);
      // console.info('abc ', this.$refs.bbb.offsetTop);
      /* console.info(this.$refs[this.treeUserRef].$el.parentNode.style.top.replace('px', ''));
         console.info('33333333 ', this.$refs[`${this._uid}-base-select-tree-popover`].$el.childNodes[0].offsetTop);
          console.info('4444 ', this.$refs[this.treeUserRef].$el.parentNode); */
    },
    /**
     * @desc 清空
     */
    clear() {
      this.curSelectNodeList = [];
      this.curSelectLabelList = [];
      this.curSelectValueList = [];
      this.curSelectNode = null;
      this.curSelectLabel = '';
      this.curSelectValue = '';
      this.curDefaultCheckedKeys = [];
      this.treeValue = [];
      this.options = [];
      if (
        this.multiple &&
        this.$refs[this.treeUserRef].getTree().getCheckedKeys().length > 0
      ) {
        this.$refs[this.treeUserRef].getTree().setCheckedKeys([]);
      }
    },
    /**
     * @desc 外部 v-model 直接操作值
     */
    outValueRemove(aDifferenceList) {
      for (let i = 0, len = aDifferenceList.length; i < len; i++) {
        const aDifferenceVal = aDifferenceList[i];
        const index = _findIndex(
          this.curSelectValueList,
          v => v === aDifferenceVal
        );
        if (index !== -1) {
          this.curSelectValueList.splice(index, 1);
          this.curSelectLabelList.splice(index, 1);
          this.curSelectNodeList.splice(index, 1);
          this.options.splice(index, 1);
        }
      }
    },
    /**
     * @desc 外部 v-model 直接操作值
     */
    outValueAdd(aDifferenceList) {
      for (let i = 0, len = aDifferenceList.length; i < len; i++) {
        const aDifferenceVal = aDifferenceList[i];
        const treeNode = this.getTree()
          .getTree()
          .getNode(aDifferenceVal);
        const data = _get(treeNode, 'data', {});
        this.curSelectNodeList.push(data);
        this.curSelectLabelList.push(data[this.displayField]);
        this.curSelectValueList.push(data[this.valueField]);
        const levelStr = this.getTree().getNodeParentLevel(treeNode);
        this.options.push({
          [this.valueField]: data[this.valueField],
          [this.displayField]: this.showAllLevels
            ? levelStr
            : data[this.displayField]
        });
      }
    },
    /**
     * @desc 自定义change事件
     * @param {Array|String} val
     */
    change(val) {
      'change' in this.listeners && this.listeners.change(val);
    },
    /**
     * @desc 某个树节点（data对象）取消选中
     */
    cancelChecked(treeNodeData) {
      this.$refs[this.treeUserRef]
        .getTree()
        .setChecked(treeNodeData[this.valueField], false);
      const index = _findIndex(
        this.curSelectValueList,
        v => v === treeNodeData[this.valueField]
      );
      if (index !== -1) {
        this.curSelectNodeList.splice(index, 1);
        this.curSelectLabelList.splice(index, 1);
        this.curSelectValueList.splice(index, 1);
        this.options.splice(index, 1);
      }
    }
  },
  render(h) {
    return h(
      'div',
      {
        ref: `${this._uid}-base-select-panel`,
        style: {
          width: _isString(this.width) ? this.width : `${this.width}px`
        },
        class: { 'base-select-tree': true, [this.ctCls]: this.ctCls }
      },
      [this.createSelect(), this.createPopover()]
    );
  }
};
export default BaseSelectTree;
