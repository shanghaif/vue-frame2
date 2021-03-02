<template>
  <div>
    {{ appleList }}
    <br /><br />
    <span>等待5秒响应式数据的改变</span>
  </div>
</template>

<script>
export default {
  props: {
    appleList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
    };
  },
  created() {
    console.info('created');
  }
};
</script>
