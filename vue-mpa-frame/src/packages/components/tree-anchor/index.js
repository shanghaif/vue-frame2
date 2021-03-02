/**
 * @desc tree 锚点组件
 */
import { getTreeMap } from '../helper/tree.js';

const treeAnchor = {
  name: 'baseTreeAnchor',
  props: {
    // tree数据
    list: {
      type: Array,
      require: true,
      default: () => []
    },
    // 自定义的样式
    ctCls: {
      type: String
    },
    // 锚点的标题
    title: {
      type: String,
      default: ''
    },
    // 数据的格式
    props: {
      type: Object,
      default() {
        return {
          id: 'id',
          name: 'name',
          children: 'children',
          label: 'label'
        };
      }
    },
    // 容器id（必须id）
    containerId: {
      type: String,
      default: ''
    },
    // 每个子项的class名称
    treeItemClass: {
      type: String,
      default: ''
    }
  },
  watch: {
    list: {
      handler(newVal, oldVal) {
        if (newVal) {
          // eslint-disable-next-line no-undef
          this.treeData = _cloneDeep(this.list);
        }
      },
      deep: true,
      immediate: true
    },
    activeAnchor: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal && newVal !== '') {
          this.$emit('activeAnchor', newVal);
        }
      },
      immediate: true
    }
  },
  computed: {
    planHeight: function() {
      const height = this.treeMap.length * 30;

      return `height:${height}px`;
    },
    activeTop: function() {
      const height = this.activeIndex * 30 + 4;

      return `${height}px`;
    },
    treeMap: function() {
      return getTreeMap(this.list, this.props.children);
    }
  },
  data() {
    return {
      treeData: [],
      activeIndex: 0, // 当前可视区域的下标
      activeAnchor: '' // 获取当前的锚点
    };
  },
  created() {
    if (this.treeData[0]) {
      this.treeData[0].active = true;
      this.activeAnchor = this.treeData[0][this.props.id];
    }

    window.addEventListener('scroll', this.onScroll, true);
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll, true);
  },
  methods: {
    /**
     * @description 监听页面滚动
     */
    onScroll(e) {
      const scrollItems = document.querySelectorAll(`.${this.treeItemClass}`);

      for (let i = scrollItems.length - 1; i >= 0; i--) {
        // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
        const judge =
          e.target.scrollTop >=
          scrollItems[i].offsetTop - scrollItems[0].offsetTop;

        if (judge || judge === 0) {
          this.activeAnchor = this.judgeScrollBottom()
            ? this.treeMap[this.treeMap.length - 1][this.props.id]
            : this.treeMap[i][this.props.id];

          this.getCurrentIndex(this.activeAnchor);
          this.setCurrentNode(this.activeAnchor, this.treeData);
          break;
        }
      }
    },
    /**
     * @description 判断是否滚动到底部
     */
    judgeScrollBottom() {
      // 这里有个坑、想要判断是否到底部 需要给容器定一个高度然后再去判断 不然无法监听
      const container = document.querySelector('#' + this.containerId);

      if (container) {
        const scrollTop = container.scrollTop;
        const clientHeight = container.clientHeight;
        const scrollHeight = container.scrollHeight;

        return Math.ceil(scrollTop) + clientHeight >= scrollHeight;
      }
    },
    /**
     * @description 滚动到相对应的区域
     */
    goAnchor(id, anchor, item) {
      this.getCurrentIndex(id);

      this.$nextTick(() => {
        document.querySelector(`#${anchor}`).scrollIntoView({
          behavior: 'smooth', // 平滑过渡
          block: 'start' // 上边框与视窗顶部平齐。默认值
        });
      });

      this.setCurrentNode(id, this.treeData);
      this.activeAnchor = id;
    },
    /**
     * @description 修改相对用可是节点的状态
     * @param { number } id 节点id
     * @param { Array } data 树节点列表
     */
    setCurrentNode(id, data) {
      for (const item of data) {
        item.active = false;

        if (id === item.id) {
          item.active = true;
        }

        if (!item.children || !item.children.length) continue;

        this.setCurrentNode(id, item.children);
      }
    },
    /**
     * @description  获取当前所在的区域
     * @param { number } id 节点id
     */
    getCurrentIndex(id) {
      this.treeMap.map((item, index) => {
        if (item.id === id) {
          this.activeIndex = index;
        }
      });
    },
    /**
     * @description 渲染树的子节点
     * @param { Array} data 节点数据
     * @returns dom
     */
    renderChildrenItem(data) {
      if (!data || !data.length) return false;

      const h = this.$createElement;

      return h(
        'ul',
        {
          class: {
            'tree-List-sub': true
          }
        },
        [
          data.map(item => {
            return h('li', {}, [
              h(
                'p',
                {
                  class: {
                    'section-link': true,
                    'section-link-active': item.active
                  },
                  on: {
                    click: event => {
                      this.goAnchor(
                        item[this.props.id],
                        item[this.props.name],
                        item
                      );
                      event.stopPropagation();
                    }
                  }
                },
                [
                  item[this.props.label],
                  item[this.props.children]
                    ? this.renderChildrenItem(item[this.props.children])
                    : ''
                ]
              )
            ]);
          })
        ]
      );
    }
  },
  render(h) {
    return h(
      'div',
      {
        class: {
          [this.ctCls]: this.ctCls,
          'tree-anchor': true
        }
      },
      [
        h(
          'div',
          {
            class: {
              'tree-anchor-title': true
            }
          },
          [this.title]
        ),
        h(
          'div',
          {
            class: {
              'tree-anchor-list': true
            }
          },
          [
            h(
              'div',
              {
                class: {
                  'tree-anchor-list-plan': true
                },
                style: { top: this.planHeight }
              },
              [
                h(
                  'div',
                  {
                    class: { 'active-content': true },
                    style: { top: this.activeTop }
                  },
                  []
                )
              ]
            ),
            h(
              'ul',
              {
                class: {
                  'tree-anchor-list-root': true
                }
              },
              [
                this.treeData.map(item => {
                  return h('li', {}, [
                    h(
                      'p',
                      {
                        class: {
                          'section-link': true,
                          'first-selection-link': true,
                          'section-link-active': item.active
                        },
                        attrs: {
                          href: '#' + item[this.props.name]
                        },
                        on: {
                          click: event => {
                            this.goAnchor(
                              item[this.props.id],
                              item[this.props.name],
                              item
                            );
                            event.stopPropagation();
                          }
                        }
                      },
                      [item[this.props.label]]
                    ),
                    item[this.props.children]
                      ? this.renderChildrenItem(item[this.props.children])
                      : ''
                  ]);
                })
              ]
            )
          ]
        )
      ]
    );
  }
};

export default treeAnchor;
