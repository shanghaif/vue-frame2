<template>
  <div class="drop-down-box">
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
        :item-ct-cls="{'top-view-otem-ct-cls': true}"
        :options="messageOptions"
      >
        <template v-slot:title>
          <el-badge is-dot :class="[{'message-tip': true}]">
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
          <div :class="{footer: true}" @click="onOpenMessage">
            查看全部
          </div>
        </template>
      </base-drop-down>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      ]
    };
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
    onLoginout(event) {}
  }
};
</script>
