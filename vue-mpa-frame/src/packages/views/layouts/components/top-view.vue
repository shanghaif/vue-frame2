<template>
  <base-double-wing>
    <template v-slot:left>
      <div
        :class="[
          $style.fullY,
          $style.logoBox,
          $style.flexCenter,
          $style.pointer
        ]"
        @click="titleClick"
      >
        <img :src="iconfontUrl()" alt="" />
        {{ title }}
      </div>
    </template>
    <template v-slot:middle> </template>
    <template v-slot:right>
      <div :class="[$style.fullY, $style.rightBox, $style.flexCenter]">
        <div>
          <base-drop-column-down
            size="mini"
            title="当前应用名称"
            :options="dropColumnDownOptions"
            trigger="click"
            @click="onDropColumnDownClick"
          ></base-drop-column-down>
        </div>
        <div @click="onClickFullScreen" title="全屏" :class="$style.pointer">
          <i :class="isFullscreen ? 'el-icon-plus' : 'el-icon-full-screen'"></i>
        </div>
        <div>
          <base-drop-down
            size="mini"
            :title="getUserData.userName"
            :options="options"
          ></base-drop-down>
        </div>
      </div>
    </template>
  </base-double-wing>
</template>

<script>
import { HOME_ROUTER_NAME } from '@config/index.js';
import { mapActions, mapGetters } from 'vuex';
import screenfull from 'screenfull';

export default {
  name: 'TopView',
  props: {
    // 顶部栏目标题文字
    title: {
      type: String
    },
    iconfontUrl: {
      type: Function,
      default: function () {
        return require('@assets/images/logo.png');
      }
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    titleClick: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['getUserData'])
  },
  data() {
    return {
      logoutLoading: false,
      isFullscreen: false,
      options: [
        { text: '个人中心', icon: 'el-icon-user' },
        { text: '消息中心', icon: 'el-icon-bell' },
        {
          text: '登出',
          icon: 'el-icon-close',
          listeners: { click: this.onLoginout },
          divided: true
        }
      ],
      dropColumnDownOptions: [
        [
          {
            title: '企业关联图谱',
            list: [
              {
                id: '1',
                icon: 'el-icon-platform-eleme',
                label: '血缘关系图谱'
              },
              { id: '2', icon: 'el-icon-delete-solid', label: '事件关系图谱' },
              { id: '3', icon: 'el-icon-s-tools', label: '供应-销售链树' },
              { id: '4', icon: 'el-icon-phone', label: '产业链树' }
            ]
          },
          {
            title: '企业高质量评价',
            list: [
              { id: '5', icon: 'el-icon-star-on', label: '评价任务' },
              { id: '6', icon: 'el-icon-s-goods', label: '业务指导' },
              { id: '7', icon: 'el-icon-warning', label: '进度管控' },
              { id: '8', icon: 'el-icon-error', label: '企业评价' },
              { id: '9', icon: 'el-icon-question', label: '评价结果' },
              { id: '10', icon: 'el-icon-remove', label: '决策分析' }
            ]
          }
        ],
        [
          {
            title: '产业地图',
            list: [
              { id: '11', icon: 'el-icon-s-help', label: '企业GIS图层' },
              { id: '12', icon: 'el-icon-minus', label: '产业地图' },
              { id: '13', icon: 'el-icon-check', label: '专题图层' },
              { id: '14', icon: 'el-icon-upload', label: '战略产业集群分析' },
              { id: '15', icon: 'el-icon-upload2', label: '区域行业分析' }
            ]
          },
          {
            title: '数据管理',
            list: [
              { id: '16', icon: 'el-icon-camera-solid', label: '数据管控大屏' },
              { id: '17', icon: 'el-icon-s-platform', label: '数据管理中心' },
              { id: '18', icon: 'el-icon-s-fold', label: '企业标签' }
            ]
          },
          {
            title: '数据分析',
            list: [{ id: '19', icon: 'el-icon-s-home', label: '数据分析' }]
          }
        ],
        [
          {
            title: '制造业大数据指数',
            list: [
              { id: '20', icon: 'el-icon-s-shop', label: '指数信息' },
              { id: '21', icon: 'el-icon-s-marketing', label: '指数指标信息' },
              { id: '22', icon: 'el-icon-s-comment', label: '行业评估值信息' },
              {
                id: '23',
                icon: 'el-icon-s-opportunity',
                label: '行业评估值信息'
              }
            ]
          },
          {
            title: '基础服务管理',
            list: [
              { id: '24', icon: 'el-icon-share', label: '组织架构' },
              { id: '25', icon: 'el-icon-d-caret', label: '用户管理' },
              { id: '26', icon: 'el-icon-caret-right', label: '角色管理' },
              { id: '27', icon: 'el-icon-refresh-left', label: '权限管理' },
              { id: '28', icon: 'el-icon-date', label: '平台日志' }
            ]
          }
        ],
        [
          {
            title: '企业全景画像',
            list: [
              { id: '29', icon: 'el-icon-tickets', label: '企业画像' },
              {
                id: '30',
                icon: 'el-icon-document-delete',
                label: '企业经营信息'
              },
              { id: '31', icon: 'el-icon-printer', label: '信用风险信息' },
              { id: '32', icon: 'el-icon-search', label: '排行榜信息' }
            ]
          }
        ]
      ]
    };
  },
  methods: {
    ...mapActions(['handlerDestroy']),
    /**
     * @desc 登出
     * @param {Objetc} event - 事件html对象
     */
    onLoginout(event) {
      this.dialogInstance = this.$baseDialog({
        component: () => this.$createElement('div', {}, ['确认要登出吗?']),
        container: this.$el,
        center: true,
        width: '350px',
        title: '提示',
        slotNode: {
          footer: h => {
            return h('div', {}, [
              h(
                'el-button',
                {
                  on: {
                    click: () => {
                      this.dialogInstance.close();
                    }
                  }
                },
                ['取消']
              ),
              h(
                'el-button',
                {
                  props: { type: 'primary', loading: this.logoutLoading },
                  on: {
                    click: () => {
                      this.logoutLoading = true;
                      this.handlerDestroy()
                        .then(() => {
                          this.logoutLoading = false;
                          this.dialogInstance.close();
                          // this.$router.push({ name: LOGIN_PAGE_NAME });
                          window.location.href = HOME_ROUTER_NAME;
                        })
                        .finally(() => {});
                    }
                  }
                },
                ['确定']
              )
            ]);
          }
        }
      });
      this.dialogInstance.open();
    },
    /**
     * @desc 全屏
     * @param {Objetc} event - 事件html对象
     */
    onClickFullScreen(event) {
      if (!screenfull.isEnabled) {
        this.$message({
          message: '不支持全屏',
          type: 'warning'
        });
        return false;
      }
      this.isFullscreen = !this.isFullscreen;
      screenfull.toggle();
    },
    /**
     * @desc 下拉面板菜单-点击
     * @param {Objetc} event - 事件html对象
     * @param {option} option - 参数对象
     */
    onDropColumnDownClick(event, option = {}) {
      console.info('下拉面板菜单-点击 ', event, option);
    }
  }
};
</script>

<style lang="less" module>
@import '../basic-layout.less';
@import './less/top-view.less';
</style>
