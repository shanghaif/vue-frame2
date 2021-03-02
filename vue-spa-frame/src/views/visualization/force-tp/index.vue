<template>
  <div
    style="position: relative;width: 100%; height: 100%;background: rgba(255,255,255)"
  >
    <div style=" position: relative;width: 100%; height: 100%">
      <forceTp
        :nodeInfo="nodeInfo"
        :linkInfo="tpInfo.links"
        :lineConfig="lineConfig"
        v-if="loadTp"
      ></forceTp>
    </div>
  </div>
</template>

<script>
import forceTp from '@packages/components/force-tp/index';
export default {
  name: 'force-tp',
  components: {
    forceTp
  },
  data() {
    return {
      tpInfo: {
        nodes: [
          {
            name: '张三',
            id: '11',
            type: 'person',
            fontColor: '#8D8E8F',
            fontBold: true
          },
          {
            name: '广州双羊船用配套设备有限公司',
            id: '1',
            type: 'company',
            fontColor: '#8D8E8F',
            fontBold: true
          },
          {
            name: '广州久盈工艺有限公司',
            id: '2',
            type: 'company',
            fontColor: '#8D8E8F',
            fontBold: true
          },
          {
            name: '广州振原机电设备有限公司',
            id: '3',
            type: 'company',
            fontColor: '#8D8E8F',
            fontBold: true
          },
          {
            name: '广州泰柯包装制品有限公司',
            id: '4',
            type: 'company',
            fontColor: '#8D8E8F',
            fontBold: true
          },
          {
            name: '广州市番禺区石基彤丽化妆品厂',
            id: '5',
            type: 'company',
            fontColor: '#8D8E8F',
            fontBold: true
          },
          {
            name: '广州玥瑜工艺品有限公司',
            id: '6',
            type: 'company',
            fontColor: '#8D8E8F',
            fontBold: true
          },
          {
            name: '广州市新能塑料五金制品有限公司',
            id: '7',
            type: 'company',
            fontColor: '#8D8E8F',
            fontBold: true
          },
          {
            name: '广州市悦兴化妆品有限公司',
            id: '8',
            type: 'company',
            fontColor: '#8D8E8F',
            fontBold: true
          }
        ],
        links: [
          {
            source: '11',
            target: '1',
            value: '法人',
            lineColor: '#ddd',
            lineWidth: 1
          },
          {
            source: '5',
            target: '2',
            value: '控股',
            lineColor: '#ddd',
            lineWidth: 1
          },
          {
            source: '8',
            target: '3',
            value: '占股30%',
            lineColor: '#ddd',
            lineWidth: 1
          },
          {
            source: '8',
            target: '4',
            value: '占股10%',
            lineColor: '#ddd',
            lineWidth: 1
          },
          {
            source: '2',
            target: '5',
            value: '控股',
            lineColor: '#ddd',
            lineWidth: 1
          },
          {
            source: '7',
            target: '6',
            value: '法人',
            lineColor: '#ddd',
            lineWidth: 1
          },
          {
            source: '11',
            target: '7',
            value: '控股',
            lineColor: '#ddd',
            lineWidth: 1
          },
          {
            source: '11',
            target: '8',
            value: '占股60%',
            lineColor: '#ddd',
            lineWidth: 1
          }
        ]
      },
      imgMap: {
        person: '/static/images/tpIcon/user-wfg.png',
        company: '/static/images/tpIcon/company-wfg.png'
      },
      nodeInfo: [],
      linkInfo: [],
      loadTp: false,
      lineConfig: {
        arrowed: true,
        labelField: 'value',
        labelColor: 'red',
        labelSize: 12
      }
    };
  },
  mounted() {
    this.setImg();
  },
  methods: {
    onTabChange() {
      this.$emit('changeTab', '2');
    },
    setImg() {
      if (this.tpInfo.nodes) {
        for (const item of this.tpInfo.nodes) {
          this.nodeInfo.push({
            ...item,
            img: this.imgMap[item.type],
            imgWidth: 90,
            imgHeight: 90,
            labelTop: 45
          });
        }
      }
      this.loadTp = true;
    }
  }
};
</script>
