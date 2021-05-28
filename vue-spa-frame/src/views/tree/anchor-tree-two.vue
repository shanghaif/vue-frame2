<template>
  <div :class="$style.anchor">
    <base-tree-anchor
      :ctCls="$style.anchorLeft"
      :list="enterpriseTree"
      containerId="anchorContent"
      treeItemClass="section-item"
      ref="anchorTree"
      @activeAnchor="getActiveAnchor"
    ></base-tree-anchor>
    <!-- 所有的子节点必须拥有相同的class -->
    <div id="anchorContent" :class="$style.anchorContent">
      <div
        class="section-item"
        :id="item.name"
        :class="$style.anchorContentItem"
        v-for="item of enterpriseTree"
        :key="item.name"
      >
        <div :class="$style.titleColumn">
          <span></span>
          <span>{{ item.label }}</span>
        </div>
        <div
          :class="$style.chartBox"
          v-for="chartItem of item.item"
          :key="chartItem.name"
          :id="chartItem.name"
        >
          {{ chartItem.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      enterpriseTree: [
        {
          id: 1,
          label: '工业生产',
          name: 'gysc',
          icon: '',
          active: false,
          item: [
            { id: 1, label: '工业增加值', name: 'gyzjz' },
            { id: 2, label: '劳动生产率', name: 'ldscl' }
          ]
        },
        {
          id: 2,
          label: '产品销售',
          name: 'cpxs',
          icon: '',
          active: false,
          item: [
            { id: 3, label: '销售产值', name: 'xscz' },
            { id: 4, label: '出口交货值', name: 'ckjhz' },
            { id: 5, label: '内销产值', name: 'nxcz' }
          ]
        },
        {
          id: 3,
          label: '企业效益',
          name: 'qyxy',
          icon: '',
          active: false,
          item: [
            { id: 6, label: '利润总额', name: 'lrze' },
            { id: 7, label: '利润率', name: 'lrl' },
            { id: 8, label: '每百元营业收入成本', name: 'mbyyysrcb' }
          ]
        },
        {
          id: 4,
          label: '项目投资',
          name: 'xmtz',
          icon: '',
          active: false,
          item: [
            { id: 9, label: '工业投资', name: 'gytz' },
            { id: 10, label: '技改投资', name: 'jgtz' }
          ]
        },
        {
          id: 5,
          label: '创新驱动',
          name: 'cxqd',
          icon: '',
          active: false,
          item: [
            { id: 11, label: '研发费用', name: 'yffy' },
            { id: 12, label: '新产品产值率', name: 'xcpczl' },
            {
              id: 13,
              label: '企业研发投入占营业收入比重',
              name: 'qyyftrzyysrbz'
            }
          ]
        },
        {
          id: 6,
          label: '亩均改革',
          name: 'mjgg',
          icon: '',
          active: false,
          item: [
            { id: 14, label: '亩均增加值', name: 'mjzjz' },
            { id: 15, label: '亩均税收', name: 'mjss' }
          ]
        }
      ],
      activeAnchor: ''
    };
  },
  created() {},
  methods: {
    /**
     * @description 获取当前的锚点
     */
    getActiveAnchor(data) {
      console.log(data);
      this.activeAnchor = data;
    }
  }
};
</script>
<style lang="less" module>
.anchor {
  .full-y;
  .mt-15;

  @media (--small-viewport) {
    height: 700px;
  }
  @media (--big-viewport) {
    height: 740px;
  }

  overflow: auto;
  background-color: @fill-1;
  .relative;
  .anchor-left {
    .absolute;

    top: 40px;
    right: 20px;
    background-color: rgba(255, 255, 255);
    border-radius: 2px;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
    :global .tree-anchor-list {
      padding: 10px 10px;
    }
  }

  &-content {
    box-sizing: border-box;
    height: 800px;
    padding: 20px 0 0 0;
    margin-left: 200px;
    overflow: auto;
    &-item {
      @media (--small-viewport) {
        width: 900px;
      }
      @media (--big-viewport) {
        width: 1300px;
      }

      margin-bottom: 40px;
      .title-column {
        height: 45px;
        background-color: white;
        > span {
          display: inline-block;
          font-size: 18px;
          font-weight: 700;
          line-height: 45px;
          color: rgba(51, 51, 51, 100);
        }
        > span:first-child {
          position: relative;
          top: 2px;
          width: 5px;
          height: 20px;
          margin-right: 15px;
          background-color: rgba(20, 146, 255, 1);
        }
      }
      .chart-box {
        @media (--small-viewport) {
          height: 430px;
        }
        @media (--big-viewport) {
          height: 530px;
        }

        margin-bottom: 10px;
        background-color: violet;
      }
    }
  }

  &-content::-webkit-scrollbar {
    display: none !important;
  }
}
</style>
