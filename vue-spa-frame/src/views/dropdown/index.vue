<template>
  <div>
    <div>
      <p>默认下拉菜单</p>
      <base-drop-down
        size="mini"
        title="更多以用"
        :options="options"
      ></base-drop-down>
    </div>
    <div>
      <p>插槽下拉菜单</p>
      <base-drop-down
        icon
        :item-ct-cls="$style.topViewItemCtCls"
        :options="messageOptions"
      >
        <template v-slot:title>
          <el-badge is-dot :class="[$style.messageTip]">
            <i class="el-icon-message"></i>
          </el-badge>
        </template>
        <template v-slot:default="{ id, content, minute }">
          <li
            tabindex="-1"
            class="message-item-cls"
            @click="onOpenMessageDialog(id, content, minute)"
          >
            <div>
              <el-badge is-dot type="primary"> </el-badge
              ><span>{{ content }}</span>
            </div>
            <div>
              <span>{{ minute }}</span>
              <span>点击查看</span>
            </div>
          </li>
          <!-- <p>{{ id }},{{ content }},{{ minute }}</p> -->
        </template>
        <template v-slot:footer>
          <div :class="$style.footer" @click="onOpenMessage">查看全部</div>
        </template>
      </base-drop-down>
    </div>
    <div>
      <p>多层级下拉框一级动态绑定传参</p>

      <base-drop-down
        size="mini"
        titleColor="#000"
        title="多层级下拉"
        icon="el-icon-caret-bottom"
        :hide-on-click="false"
        :item-ct-cls="$style.topViewItemCtCls"
        :options="optionsList"
        trigger="click"
        ref="userNameDropdown"
      ></base-drop-down>
    </div>
    <div>
      <h4>Menu（菜单）</h4>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        menu-trigger="click"
        @select="handleSelect"
      >
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      options: [
        {
          text: '个人中心',
          icon: 'el-icon-user',
          listeners: { click: this.onOpenPersonal }
        },
        { text: '消息中心', icon: 'el-icon-bell' },
        {
          text: '登出',
          icon: 'el-icon-close',
          listeners: { click: this.onLoginout },
          divided: true
        }
      ],
      messageOptions: [
        {
          id: '1',
          content:
            '解放军军机9月25日一早再次进入台湾西南空域，高度在2000米左右。',
          minute: '8分钟前'
        },
        {
          id: '2',
          content:
            '9月25日，浙江省高等教育学会高校保卫分会秘书长在采访时表示，《大学生安全知识读本》',
          minute: '18分钟前'
        },
        {
          id: '3',
          content:
            '25日，据韩联社最新消息，金正恩就韩公民遭朝方射杀一事向韩方致歉。',
          minute: '28分钟前'
        }
      ],
      optionsList: [
        {
          text: '切换部门',
          disabled: false,
          listeners: {},
          children: []
        },
        {
          text: '个人中心',
          divided: true,
          listeners: { click: this.onRouterPersonl }
        },
        {
          listeners: { click: this.onLoginout },
          divided: true,
          render: h => {
            return h(
              'span',
              { class: 'dropDown-warn-menu-item-color' },
              '登出系统'
            );
          }
        }
      ]
    };
  },
  created() {
    this.addEvent();
  },
  methods: {
    /**
     * @desc 打开消息中心
     */
    onOpenMessage() {
      if (this.$route.path !== '/message-center') {
        this.$router.push({ path: '/message-center' });
      }
    },
    /**
     * @desc 打开消息中心
     */
    onOpenMessageDialog(id, content, minute) {
      console.info(id, content, minute);
    },
    /**
     * @desc 打开个人中心
     */
    onOpenPersonal(event) {
      if (this.$route.path !== '/helper') {
        this.$router.push({ path: '/helper' });
      }
    },
    /**
     * @desc 登出
     * @param {Objetc} event - 事件html对象
     */
    onLoginout(event) {},
    changeDepartant(data) {},
    onRouterPersonl() {},
    /**
     * @description 新增数据
     */
    addEvent() {
      this.optionsList[0].children = [
        {
          text: '部门一',
          id: 1,
          listeners: {
            click: () => {
              this.changeDepartant('id');
            }
          }
        },
        {
          text: '部门二',
          id: 2,
          listeners: {
            click: () => {
              this.changeDepartant('id');
            }
          }
        },
        {
          text: '部门三',
          id: 3,
          listeners: {
            click: () => {
              this.changeDepartant('id');
            }
          }
        }
      ];

      this.$nextTick(() => {
        this.$refs.userNameDropdown.updateDropdown();
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less">
.message-item-cls {
  box-sizing: border-box;
  width: 340px;
  height: 60px;
  padding: 10px;
  border-bottom: 1px solid @border-weight;
  // padding-top: 0px;
  .relative;
  &:hover {
    background-color: @fill-sky-blue;
    .pointer;
  }
  > div:first-child {
    .half-y;

    padding-left: 33px;
    font-size: @font-size-small;
    line-height: 20px;
    .textOverflow();
    // background-color: aqua;
    .relative;

    /* &::before{
      content: "\e72b";
      font-family: "el-icon";
      color:red;
    } */
    .el-badge {
      .absolute;

      top: 7px;
      left: 10px;
      // padding: 0px 20px;
      box-sizing: border-box;
    }
  }
  > div:nth-child(2) {
    .half-y;
    // background-color: red;
    > span:first-child {
      .fl;

      margin-left: 33px;
      font-size: @font-size-small;
      line-height: 20px;
      .weight-black-color-fn(0.45);
    }
    > span:nth-child(2) {
      .fr;

      margin-right: 17px;
      font-size: @font-size-small;
      line-height: 20px;
      color: rgba(66, 147, 244, 100);
    }
  }
}
</style>

<style lang="less" scoped>
/deep/ .el-menu-demo {
  display: flex;
  flex-direction: column;
  width: 160px;
}
/deep/ .el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 30px;
  line-height: 30px;
}
</style>

<style lang="less" module>
.top-view-item-ct-cls {
}
.footer {
  height: 55px;
  font-size: @font-size-medium;
  line-height: 55px;
  color: rgba(66, 147, 244, 100);
  .t-center;
  .pointer;
}
</style>
