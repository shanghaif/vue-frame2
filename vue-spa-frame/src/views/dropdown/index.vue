<template>
  <div>
    <div class="mb-10">
      <h4>1：&nbsp;&nbsp;默认下拉菜单</h4>
      <base-drop-down
        size="mini"
        title="更多以用"
        :options="options"
      ></base-drop-down>
    </div>
    <div class="mb-10">
      <h4>2：&nbsp;&nbsp;插槽下拉菜单</h4>
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
    <div class="mb-10">
      <h4>3：&nbsp;&nbsp;两个层级下拉框一级动态绑定传参&nbsp;&nbsp;点击展示</h4>

      <base-drop-down
        size="mini"
        titleColor="#000"
        title="两个层级下拉"
        icon="el-icon-caret-bottom"
        :hide-on-click="false"
        :item-ct-cls="$style.topViewItemCtCls"
        :options="optionsList"
        trigger="click"
        ref="userNameDropdown"
      ></base-drop-down>
    </div>
    <div>
      <h4>4：&nbsp;&nbsp;Menu（菜单）&nbsp;&nbsp;点击展示-多级级联菜单</h4>
      <div class="mb-10">{{ fourValue }}</div>
      <div class="base-el-menu-button">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          menu-trigger="click"
          :unique-opened="true"
          @select="handleSelect"
          v-if="false"
        >
          <el-submenu
            index="2"
            :popper-append-to-body="true"
            popper-class="aaaaaaaaaaaaaaaaa"
          >
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-2">
              <template slot="title">食物</template>
              <el-menu-item index="2-2-1">大米</el-menu-item>
              <el-menu-item index="2-2-2">小米</el-menu-item>
            </el-submenu>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-submenu index="3-1">
                <template slot="title">水果</template>
                <el-menu-item index="3-1-1">苹果</el-menu-item>
                <el-menu-item index="3-1-2">香蕉</el-menu-item>
              </el-submenu>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
        <div class="mb-10">{{ fourValue }}</div>
        <base-menu-button
          :options="fourOptions"
          :fourValue="fourValue"
          :svgIcons="svgIcons"
          @select="onMenuButtonSelect"
          prefixIcon="el-icon-eleme"
        />
      </div>
    </div>

    <div class="m-20 chromeMark">
      <div
        class="chromeMark-item"
        v-for="(item, index) of menuList"
        :key="index"
        :id="'chromeMark' + index"
      >
        <base-svg-icon :iconname="item.iconUrl"></base-svg-icon>
        <span>{{ item.menuName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import svgIcons from '@/plugins/icons.js';
export default {
  data() {
    this.svgIcons = svgIcons;
    return {
      activeIndex: '2-1',
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
      ],
      fourOptions: [
        {
          value: 'shejiyuanze',
          label: '设计原则',
          icon: 'svg-table-transfer',
          children: [
            {
              value: 'yizhi',
              label: '一致'
            },
            {
              value: 'fankui',
              label: '反馈'
            },
            {
              value: 'xiaolv',
              label: '效率'
            },
            {
              value: 'kekong',
              label: '可控'
            }
          ]
        },
        {
          value: 'zhinan',
          label: '指南',
          icon: 'el-icon-share',
          childrenL: []
        },
        {
          value: 'daohang',
          label: '导航',
          icon: '/static/images/tree.png',
          children: [
            {
              value: 'cexiangdaohang',
              label: '侧向导航',
              disabled: true
            },
            {
              value: 'dingbudaohang',
              label: '顶部导航'
            },
            {
              value: 'foods',
              label: '水果',
              icon: '/static/images/menus/tabs.svg',
              children: [
                { value: 'apple', label: '苹果' },
                { value: 'banana', label: '香蕉' }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          icon: 'el-icon-star-off',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局'
                },
                {
                  value: 'color',
                  label: 'Color 色彩'
                },
                {
                  value: 'typography',
                  label: 'Typography 字体'
                },
                {
                  value: 'icon',
                  label: 'Icon 图标'
                }
              ]
            }
          ]
        }
      ],
      fourValue: '',
      menuList: []
    };
  },
  computed: {
    isInclient() {
      return function(id) {
        // eslint-disable-next-line no-unused-vars
        const currentWidth = document.getElementById(id).offsetWidth;
      };
    }
  },
  created() {
    this.addEvent();
    this.menuList = this.$store.getters.getLevel1Menus;
    this.clientWidth = document.getElementsByClassName(
      'chromeMark'
    )[0].offsetWidth;
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
        if (!_isNil(this.$refs.userNameDropdown)) {
          this.$refs.userNameDropdown.updateDropdown();
        }
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    onMenuButtonSelect(option) {
      console.log('option', option);
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

<style lang="less">
.base-el-menu-button {
  display: inline-block;
  .el-submenu__title {
    padding: 0;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: 0;
  }
  .el-menu--horizontal > .el-submenu .el-submenu__title {
    height: 30px;
    line-height: 30px;
    color: rgba(96, 98, 102);
  }
  .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
    border-bottom: 0;
  }
}
.aaaaaaaaaaaaaaaaa {
  .el-menu--collapse .el-menu .el-submenu,
  .el-menu--popup {
    min-width: 120px !important;
  }
  .el-submenu .el-menu-item {
    min-width: 120px !important;
  }
}

/* /deep/ .el-menu-demo {
  display: flex;
  flex-direction: column;
  width: 160px;
}
/deep/ .el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 30px;
  line-height: 30px;
} */
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

<style lang="less" scoped>
.chromeMark {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  &-item {
    display: inline-block;
    width: 10%;
    margin-right: 10px;
    span {
      writing-mode: horizontal-tb;
    }
  }
}
</style>
