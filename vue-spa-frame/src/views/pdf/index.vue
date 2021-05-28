<!--
 * @Author: your name
 * @Date: 2021-04-26 16:25:49
 * @LastEditTime: 2021-04-28 11:18:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-spa-frame\src\views\pdf\index.vue
-->
<template>
  <div :class="$style.container">
    <div class="mb-20">
      点击下载pdf文件功能，点击下载后会比较慢需要等待生产pdf文件
    </div>
    <el-button type="primary" @click="download">pdf下载页</el-button>
  </div>
</template>
<script>
import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
export default {
  data() {
    return {
      cols: 8,
      commonStyle: {
        margins: [0, 6, 0, 6]
      },
      config: {}
    };
  },
  created() {
    // console.log(pdfFonts);
    // pdfMake.vfs = pdfFonts.pdfMake.vfs;
    console.log(window.location);
    pdfMake.fonts = {
      msyh: {
        normal:
          'http://' + window.location.host + '/static/fonts/msyh/msyh.ttf',
        bold: 'http://' + window.location.host + '/static/fonts/msyh/msyh.ttf',
        italics:
          'http://' + window.location.host + '/static/fonts/msyh/msyh.ttf',
        bolditalics:
          'http://' + window.location.host + '/static/fonts/msyh/msyh.ttf'
      }
    };
  },
  mounted() {},
  methods: {
    createHeader(text) {
      const temp = [
        {
          text: text,
          colSpan: this.cols,
          alignment: 'center',
          fillColor: '#eaeaea',
          style: 'commonCell'
        }
      ];
      for (let i = 0; i < this.cols - 1; i++) {
        temp.push({});
      }
      return temp;
    },
    /**
     * data  [Array]
     * data[i] attribute
     * col:合并列
     * row：合并行
     * text：显示值
     * br:前行合并
     * ar：后行合并
     */
    createColumn(data) {
      if (!Array.isArray(data)) {
        return [];
      }
      let rtn = [];

      let tempObj = {};
      data.map((v, i) => {
        var temp = [];
        if (v.br > 1) {
          // console.log(v.br + 'br');
          temp = temp.concat(this.getPadding(v.br));
        }
        tempObj = {};
        tempObj.colSpan = v.colSpan;
        tempObj.rowSpan = v.rowSpan;
        tempObj.border = v.border;
        tempObj.text = v.text;
        tempObj.style = 'commonCell';
        Object.assign(tempObj, v);
        temp.push(tempObj);
        if (v.colSpan && v.colSpan > 1) {
          // console.log(this.getPadding(v.col));
          temp = temp.concat(this.getPadding(v.colSpan));
          // console.log(temp);
        }
        if (v.ar > 1) {
          // console.log(v.ar + 'ar');
          temp = temp.concat(this.getPadding(v.ar));
        }
        rtn = rtn.concat(temp);
        // console.log(rtn);
        // console.log(v.ar + 'ar');
      });
      return rtn;
    },
    getPadding(col) {
      const arr = [];
      for (let i = 0; i < col - 1; i++) {
        arr.push('');
      }
      return arr;
    },
    createConfig() {
      this.config = {
        pageSize: 'A4',
        content: [
          { text: '浙江省小微企业园信息登记表（已投运）', style: 'header' },
          {
            style: 'tableExample',
            table: {
              // widths: [40, 50, 40, 'auto', 'auto', 50, 50, '*'],
              body: [
                // this.createHeader('基本信息'),
                this.createHeader('基本信息'),
                this.createColumn([
                  { colSpan: 3, text: '小微企业园名称' },
                  {
                    colSpan: 5,
                    text: '小微企业园名称1'
                  }
                ]),
                this.createColumn([
                  { colSpan: 3, text: '园区状况' },
                  { text: '已投运' },
                  {
                    colSpan: 3,
                    text: '所属区域'
                  },
                  { text: '杭州-余杭区-五常街道' }
                ]),
                this.createColumn([
                  { colSpan: 3, text: '地址' },
                  { text: '文一西路1002' },
                  {
                    colSpan: 3,
                    text: '邮编'
                  },
                  { text: '310000' }
                ]),
                this.createColumn([
                  { colSpan: 3, text: '经度' },
                  { text: '120.025785' },
                  {
                    colSpan: 3,
                    text: '纬度'
                  },
                  { text: '30.284686' }
                ]),
                this.createColumn([
                  { colSpan: 3, text: '开发单位' },
                  { text: '绿城集团' },
                  {
                    colSpan: 3,
                    text: '是否分期建设(勾选)'
                  },
                  { text: '是' }
                ]),
                this.createColumn([
                  { colSpan: 3, text: '土地来源(勾选)' },
                  { text: '划拨' },
                  {
                    colSpan: 3,
                    text: '土地性质(多选)'
                  },
                  { text: '工业用地,商服用地,教育用地' }
                ]),
                this.createColumn([
                  { rowSpan: 2, colSpan: 2, text: '负责人' },
                  { rowSpan: 2, text: '李' },
                  { text: '手机' },
                  { text: '19800021212' },
                  { rowSpan: 2, text: '邮箱' },
                  { rowSpan: 2, colSpan: 2, text: '	522473412@qq.com' }
                ]),
                this.createColumn([
                  { text: '固话', br: 4 },
                  { text: '32324938', ar: 4 }
                ]),
                this.createColumn([
                  { colSpan: 3, text: '开工时间' },
                  { text: '2013-10-02' },
                  { colSpan: 3, text: '竣工时间' },
                  { text: '2014-12-26' }
                ]),
                this.createColumn([
                  { colSpan: 3, text: '投运时间' },
                  { text: '2016-06-20' },
                  { colSpan: 3, text: '园区类型(勾选)' },
                  { text: '生产制造类' }
                ]),
                this.createColumn([
                  { colSpan: 3, text: '主导产业' },
                  { text: '生物医药' },
                  { colSpan: 3, text: '开发建设模式(勾选)' },
                  { text: '工业地产开发' }
                ]),
                this.createColumn([
                  { colSpan: 3, text: '园区规划面积（亩）' },
                  { text: '400' },
                  { colSpan: 3, text: '实际用地面积（亩）' },
                  { text: '378' }
                ]),
                this.createColumn([
                  { colSpan: 4, text: '计划投资总额（万元）' },
                  { colSpan: 4, text: '9,000' }
                ]),
                this.createColumn([
                  {
                    rowSpan: 4,
                    colSpan: 2,
                    text: '实际园区投资总额（万元）'
                  },
                  { rowSpan: 4, text: '11,200' },
                  { rowSpan: 4, text: '其中' },
                  { colSpan: 2, text: '国有投资额（万元）' },
                  { colSpan: 2, text: '	200' }
                ]),
                this.createColumn([
                  { text: '集体投资额（万元）', colSpan: 2, br: 5 },
                  { colSpan: 2, text: '	5,000' }
                ]),
                this.createColumn([
                  { text: '民营投资额（万元）', colSpan: 2, br: 5 },
                  { colSpan: 2, text: '	5,000' }
                ]),
                this.createColumn([
                  { text: '其他投资额（万元）', colSpan: 2, br: 5 },
                  { colSpan: 2, text: '	2,000' }
                ]),
                this.createColumn([
                  { colSpan: 3, text: '规划建筑面积（平方米）' },
                  { text: '200' },
                  { colSpan: 3, text: '规划公共配套设施建筑面积（平方米）' },
                  { text: '100' }
                ]),
                this.createColumn([
                  { colSpan: 3, text: '已建建筑面积（平方米）' },
                  { text: '150' },
                  { colSpan: 3, text: '已建公共配套设施建筑面积（平方米）' },
                  { text: '50' }
                ]),
                this.createColumn([
                  { colSpan: 3, text: '已出售面积（平方米）' },
                  { text: '40' },
                  { colSpan: 3, text: '园区剩余可租售面积（平方米）' },
                  { text: '100' }
                ]),
                this.createColumn([
                  { colSpan: 3, text: '已出租面积（平方米）' },
                  { text: '10' },
                  { colSpan: 3, text: '' },
                  { text: '' }
                ]),
                this.createColumn([
                  { colSpan: 3, text: '公共配套设施(多选)' },
                  {
                    colSpan: 5,
                    text:
                      '宿舍公寓,便利超市,运动休闲场馆,会议场馆,共享仪器设备,研发中心,中试基地,公共检测室'
                  }
                ]),
                this.createColumn([
                  { colSpan: 3, text: '公共配套服务(多选)' },
                  {
                    colSpan: 5,
                    text:
                      '政策与信息服务,政务代办服务,投融资服务,教育培训服务,管理咨询服务,知识产权服务,财务代理服务,信息化服务'
                  }
                ]),
                this.createColumn([
                  {
                    rowSpan: 6,
                    colSpan: 2,
                    text: '入驻企业家数（家）'
                  },
                  { rowSpan: 6, text: '1' },
                  { rowSpan: 6, text: '其中' },
                  { colSpan: 2, text: '规模以上企业数（家）' },
                  { colSpan: 2, text: '	200' }
                ]),
                this.createColumn([
                  { colSpan: 2, text: '高新技术企业（家）', br: 5 },
                  { colSpan: 2, text: '	5,000' }
                ]),
                this.createColumn([
                  { colSpan: 2, text: '科技型中小企业（家）', br: 5 },
                  { colSpan: 2, text: '4,000' }
                ]),
                this.createColumn([
                  { colSpan: 2, text: '隐形冠军（家）', br: 5 },
                  { colSpan: 2, text: '2,000' }
                ]),
                this.createColumn([
                  { colSpan: 2, text: '股改企业（家）', br: 5 },
                  { colSpan: 2, text: '2,000' }
                ]),
                this.createColumn([
                  { colSpan: 2, text: '上市（挂牌）企业（家）', br: 5 },
                  { colSpan: 2, text: '2,000' }
                ]),
                this.createColumn([
                  {
                    rowSpan: 2,
                    colSpan: 2,

                    text: '入驻企业员工总数（人）'
                  },
                  { rowSpan: 2, text: '90' },
                  { rowSpan: 2, text: '其中' },
                  { colSpan: 2, text: '“国千/省千”人才（人）' },
                  { colSpan: 2, text: '	1' }
                ]),
                this.createColumn([
                  { colSpan: 2, text: '硕士/副高以上（人）', br: 5 },
                  { colSpan: 2, text: '40' }
                ]),
                this.createColumn([
                  { colSpan: 3, text: '国家专利（件）' },
                  { text: '2' },
                  { colSpan: 3, text: '其中：发明专利（件）' },
                  { text: '3' }
                ]),
                this.createColumn([
                  { colSpan: 3, text: '每平方米租金（元/天）' },
                  { text: '2' },
                  { colSpan: 3, text: '星级(勾选)' },
                  { text: '无' }
                ]),

                this.createHeader('运营信息'),
                this.createColumn([
                  { colSpan: 3, text: '运营机构名称' },
                  { text: '绿城集团' },
                  { colSpan: 3, text: '统一社会信用代码' },
                  { text: '20392204849389E' }
                ]),
                this.createColumn([
                  { colSpan: 3, text: '运营机构性质(勾选)' },
                  { text: '国有' },
                  { colSpan: 3, text: '运营管理模式(勾选)' },
                  { text: '第三方专业机构运营' }
                ]),
                this.createColumn([
                  { colSpan: 3, text: '运营机构从业人数（人）' },
                  { text: '80' },
                  { colSpan: 3, text: '其中：大专以上学历人员数（人）' },
                  { text: '50' }
                ]),
                this.createColumn([
                  { rowSpan: 2, colSpan: 2, text: '机构负责人' },
                  { rowSpan: 2, text: '李于' },
                  { text: '手机' },
                  { colSpan: 2, text: '	19800021212' },
                  { rowSpan: 2, text: '邮箱' },
                  { rowSpan: 2, text: '	522473412@qq.com' }
                ]),

                this.createColumn([
                  { text: '固话', br: 4 },
                  { colSpan: 2, text: '32324938', ar: 3 }
                ]),
                this.createColumn([
                  { rowSpan: 2, colSpan: 2, text: '机构联系人' },
                  { rowSpan: 2, text: '李于' },
                  { text: '手机' },
                  { colSpan: 2, text: '	19800021212' },
                  { rowSpan: 2, text: '邮箱' },
                  { rowSpan: 2, text: '	522473412@qq.com' }
                ]),
                this.createColumn([
                  { text: '固话', br: 4 },
                  { colSpan: 2, text: '32324938', ar: 3 }
                ])
              ]
            }
          },
          {
            style: 'tableExample',
            table: {
              //  widths: [40, 50, 40, 'auto', 'auto', 50, 50, '*'],
              body: [
                this.createHeader('入驻企业名录'),
                this.createColumn([
                  { text: '企业名称', style: 'listCell' },
                  { text: '统一社会信用代码', style: 'listCell' },
                  { text: '所属行业', style: 'listCell' },
                  { text: '入驻时间', style: 'listCell' },
                  { text: '企业状态', style: 'listCell' },
                  { text: '法定代表人', style: 'listCell' },
                  { text: '联系人', style: 'listCell' },
                  { text: '联系人手机', style: 'listCell' }
                ]),
                this.createColumn([
                  { text: '测试企业XXXX' },
                  { text: '9133000008169981X9' },
                  { text: '纺织' },
                  { text: '2018-01-01' },
                  { text: '	入驻' },
                  { text: '法定代表人' },
                  { text: '联系人' },
                  { text: '13111111112' }
                ]),
                this.createColumn([
                  {
                    text: '备注：',
                    colSpan: 8,
                    alignment: 'left',
                    border: [true, true, true, false]
                  }
                ]),
                this.createColumn([
                  {
                    border: [true, false, true, false],
                    text: '\n\n',
                    margin: [20, 0],
                    colSpan: 8
                  }
                ]),
                this.createColumn([
                  {
                    border: [true, true, true, false],
                    text: '园区运营机构（盖章）',
                    style: 'commonCell1',
                    colSpan: 8
                  }
                ]),
                this.createColumn([
                  {
                    border: [true, false, true, false],
                    text:
                      '\n\n\n表中所填内容、数据真实完整。若出现不实问题，本单位承担相应责任\n\n\n',
                    margin: [20, 0],
                    colSpan: 8
                  }
                ]),

                this.createColumn([
                  {
                    border: [true, false, false, true],
                    text: '签名:',
                    colSpan: 4
                  },
                  {
                    border: [false, false, true, true],
                    text: '日期:',
                    margin: [20, 0],
                    colSpan: 4
                  }
                ]),
                this.createColumn([
                  {
                    border: [true, true, true, false],
                    text: '县（市区）小微企业园工作联席会议办公室（盖章）',
                    style: 'commonCell1',
                    colSpan: 8
                  }
                ]),
                this.createColumn([
                  {
                    border: [true, false, true, false],
                    text: '\n\n\n\t\n',
                    margin: [20, 0],
                    colSpan: 8
                  }
                ]),
                this.createColumn([
                  {
                    border: [true, false, false, true],
                    text: '签名:',
                    colSpan: 4
                  },
                  {
                    border: [false, false, true, true],
                    text: '日期:',
                    margin: [20, 0],
                    colSpan: 4
                  }
                ]),
                this.createColumn([
                  {
                    border: [true, true, true, false],
                    text: '市小微企业园工作联席会议办公室（盖章）',
                    style: 'commonCell1',
                    colSpan: 8
                  }
                ]),

                this.createColumn([
                  {
                    border: [true, false, true, false],
                    text: '\n\n\n\t\n\n',
                    margin: [20, 0],
                    colSpan: 8
                  }
                ]),
                this.createColumn([
                  {
                    border: [true, false, false, true],
                    text: '签名:',
                    colSpan: 4
                  },
                  {
                    border: [false, false, true, true],
                    text: '日期:',
                    margin: [20, 0],
                    colSpan: 4
                  }
                ]),
                this.createColumn([
                  {
                    border: [true, true, true, false],
                    style: 'commonCell1',
                    text: '省小微企业园工作联席会议办公室（盖章）',
                    colSpan: 8
                  }
                ]),
                this.createColumn([
                  {
                    border: [true, false, true, false],
                    text: '\n\n\n\t\n',
                    margin: [20, 0],
                    colSpan: 8
                  }
                ]),

                this.createColumn([
                  {
                    border: [true, false, false, true],
                    text: '签名:',
                    colSpan: 4
                  },
                  {
                    border: [false, false, true, true],
                    text: '日期:',
                    margin: [20, 0],
                    colSpan: 4
                  }
                ])
              ]
            }
          },
          {
            stack: [
              {
                text: ['注：（1）园区状况：已投运、已竣工、在建中、规划中；'],
                style: 'superMargin'
              },
              {
                text:
                  '（2）是否分期建设：是、否；如分期建设，请在园区名称后加注“（X期）”，如“XXX园（一期）”；',
                style: 'superMargin'
              },
              {
                text: '（3）土地来源：划拨、出让、租用、其他；',
                style: 'superMargin'
              },
              {
                text:
                  '（4）土地性质（可多选）：工业用地、商服用地、创新用地、集体留用地、其他；',
                style: 'superMargin'
              },
              {
                text: '（5）园区类型：',
                style: 'superMargin'
              },
              {
                text: '选项1：生产制造类。',
                style: 'superMargin'
              },
              {
                text: [
                  '选项2：生产性服务业等。若是生产性服务业等，则需要进一步说明是：',
                  '科技园/双创园/文创园/电商园/软件园/其他；'
                ],
                style: 'superMargin'
              },
              {
                text:
                  '（6）开发建设类型：政府主导开发、龙头企业开发、企业联合开发、工业地产开发、村集体联合开发、专业机构开发、 其他；',
                style: 'superMargin'
              },
              {
                text:
                  '（7）公共配套设施（可多选）：宿舍公寓、食堂餐饮、便利超市、图书资料室、运动休闲场馆、会议场馆、展览展示场馆、光纤宽带、仓储、物流、共享仪器设备、研发中心、中试基地、公共实验室、公共检测室、集中环保处理、其他；',
                style: 'superMargin'
              },
              {
                text:
                  '（8）公共配套服务（可多选）：政策与信息服务、政务代办服务、投融资服务、创业辅导服务、人才招聘引进服务、教育培训服务、管理咨询服务、技术与质量服务、研发设计服务、检验检测服务、法律服务、知识产权服务、市场开拓服务、财务代理服务、物业管理服务、固定资产租赁服务、信息化服务、媒体宣传推广、其他；',
                style: 'superMargin'
              },
              {
                text: '（9）星级：无、一星、二星、三星、四星、五星；',
                style: 'superMargin'
              },
              {
                text: '（10）运营机构性质：国有、集体、民营、其他；',
                style: 'superMargin'
              },
              {
                text:
                  '（11）园区运营管理模式：政府主导运营、开发商负责运营、第三方专业机构运营、其他；',
                style: 'superMargin'
              },
              {
                text: '（12）企业状态：入驻、退出。',
                style: 'superMargin'
              }
            ]
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          superMargin: {
            margin: [0, 0, 0, 6],
            fontSize: 12,
            alignment: 'justify',
            lineHeight: 1.2
          },
          commonCell: {
            margin: this.commonStyle.margins,
            alignment: 'center'
          },
          commonCell1: {
            margin: this.commonStyle.margins,
            alignment: 'left'
          },
          listCell: {
            width: 100
          }
        },
        defaultStyle: {
          font: 'msyh'
          // alignment: 'justify'
        }
      };
    },
    download() {
      this.createConfig();
      console.log(this.config);
      pdfMake.createPdf(this.config).open();
      // pdfMake.createPdf(this.config).download();
    }
  }
};
</script>
<style lang="less" module>
.container {
  width: 100%;
  height: 100%;
}
</style>
