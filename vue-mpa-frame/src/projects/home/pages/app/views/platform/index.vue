<template>
  <div :class="[$style.fullY, $style.flexCenter]">
    <ul>
      <li
        v-for="item in getMenus"
        :key="item.id + item.menuCode"
        @click="onOpen(item, $event)"
      >
        {{ item.menuName }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['getMenus'])
  },
  created() {
    console.info(this.getMenus);
  },
  methods: {
    /**
     * @desc 点击事件
     * @param {Object} item - 菜单对象
     * @param {Object} event - 点击的元素事件
     */
    onOpen(item, event) {
      if (item.menuUrl !== '') {
        window.location.href = `/${item.menuUrl}`;
      }
    }
  }
};
</script>

<style lang="less" module>
.box {
}
ul {
  display: flex;
  list-style-type: none;
}
li {
  width: 160px;
  height: 100px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid @border;
}
li:hover {
  background-color: #90CEF9;
  color: white;
}
</style>
