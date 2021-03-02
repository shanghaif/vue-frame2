<template>
  <div>
    <h3>词云组件</h3>
    <div class="word-style">
      <word-cloud :dataCloud="labelWordCloudMapData"></word-cloud>
    </div>
  </div>
</template>
<script>
import wordCloud from '@packages/components/word-cloud/index';
export default {
  components: { wordCloud },
  data() {
    return {
      labelWordCloudMapData: [
        '标签1',
        '标签2',
        '标签4',
        '标签3',
        '标签5',
        '标签6',
        '标签7',
        '标签1',
        '标签2',
        '标签4',
        '标签3',
        '标签5',
        '标签6',
        '标签7',
        '标签1',
        '标签2',
        '标签4',
        '标签3',
        '标签5',
        '标签6',
        '标签7',
        '标签1',
        '标签2',
        '标签4',
        '标签3',
        '标签5',
        '标签6',
        '标签7',
        '标签1',
        '标签2',
        '标签4',
        '标签3',
        '标签5',
        '标签6',
        '标签7',
        '标签1',
        '标签2',
        '标签4',
        '标签3',
        '标签5',
        '标签6',
        '标签7',
        '标签1',
        '标签2',
        '标签4',
        '标签3',
        '标签5',
        '标签6',
        '标签7',
        '标签1',
        '标签2',
        '标签4',
        '标签3',
        '标签5',
        '标签6',
        '标签7',
        '标签1',
        '标签2',
        '标签4',
        '标签3',
        '标签5',
        '标签6',
        '标签7',
        '标签1',
        '标签2',
        '标签4',
        '标签3',
        '标签5',
        '标签6',
        '标签7',
        '标签1',
        '标签2',
        '标签4',
        '标签3',
        '标签5',
        '标签6',
        '标签7',
        '标签1',
        '标签2',
        '标签4',
        '标签3',
        '标签5',
        '标签6',
        '标签7'
      ].map(function(d) {
        return { text: d, value: 10 + Math.random() * 90 };
      })
    };
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.word-style {
  position: relative;
  width: 100%;
  height: 600px;
}
</style>
