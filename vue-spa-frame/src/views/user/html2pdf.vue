<template>
  <div class="affirm-container">
    <button id="renderPdf" class="down-button" @click="onDown">
      下载 PDF
    </button>
    <div class="remarks_box">
      <a
        href="https://mp.weixin.qq.com/s?__biz=MjM5MDA2MTI1MA==&mid=2649088748&idx=1&sn=459ce8259a24c9e1134de0c5a83034d1&chksm=be5bc541892c4c576f150cbda0074b3cd120d153654557a25c919695f7a5587a33c76207e22d&mpshare=1&scene=24&srcid=09160awXKvL7fG7XQjM1wyUh#rd"
        >技术帖子--></a
      >
      <br />
      <br />
      注意点：
      <ul>
        <li>
          1. 需要导入外部插件 html2canvas.js和jspdf.min.js<br />（注意：不要使用
          npm 的形式安装，安装的 jspdf 插件在转换pdf时会报一个错误<br />`fs.writeFileSync
          is not function`）
        </li>
        <li>
          2. 把要导出的 id 名称写到要到出的那个元素节点上去，<br />比如这里是`table`节点，不要写到外面的
          `div` 上去。
        </li>
        <li>
          3. 导出的节点外部的父级容器不能写 `overflow` 属性，<br />不然导出的
          pdf 文件如果是多页的那么后面几页的背景色会是黑色的
        </li>
        <li>
          4. 导出内容中不能加 `text-align`
          属性，不然文字太多导出的pdf不能自动换行
        </li>
        <li>5. 示例代码在 static/demo/html2pdf</li>
        <li>6. 转pdf多页的帖子：https://segmentfault.com/a/1190000009211079</li>
        <li>
          7. 我把这个页面嵌套在 basic-layout 布局内，<br />转出的pdf文件的后面几页背景色会变成黑色，<br />因为是
          外部布局的包裹节点使用了`overflow` 属性
        </li>
      </ul>
    </div>
    <div class="affirm-table_box">
      <table cellspacing="0" cellpadding="0" class="table-box" id="pdfCentent">
        <thead style="padding: 40px 0;">
          <span class="title">
            浙江省小微企业园信息登记表（已投运）
          </span>
        </thead>
        <tbody>
          <tr class="subtitle">
            <td colspan="17">
              <span>基本信息</span>
            </td>
          </tr>
          <tr>
            <td colspan="5">小微企业园名称</td>
            <td colspan="12">杭州元谷创意园</td>
          </tr>
          <tr>
            <td colspan="5" class="fill-text-color">
              <span>园区状况</span>
            </td>
            <td colspan="4">
              <span>已投运</span>
            </td>
            <td colspan="6" class="fill-text-color">
              <span>所属区域</span>
            </td>
            <td colspan="2">
              <span>杭州-余杭区-五常街道</span>
            </td>
          </tr>
          <tr>
            <td colspan="5" class="fill-text-color">地址</td>
            <td colspan="4">文一西路1002</td>
            <td colspan="6" class="fill-text-color">邮编</td>
            <td colspan="2">310000</td>
          </tr>
          <tr>
            <td colspan="5" class="fill-text-color">经度</td>
            <td colspan="4">120.025785</td>
            <td colspan="6" class="fill-text-color">纬度</td>
            <td colspan="2">30.284686</td>
          </tr>
          <tr>
            <td colspan="5" class="fill-text-color">开发单位</td>
            <td colspan="4">绿城集团</td>
            <td colspan="6" class="fill-text-color">
              是否分期建设<span class="f-12">(勾选)</span>
            </td>
            <td colspan="2">是</td>
          </tr>
          <tr>
            <td colspan="5" class="fill-text-color">
              土地来源<span class="f-12">(勾选)</span>
            </td>
            <td colspan="4">划拨</td>
            <td colspan="6" class="fill-text-color">
              土地性质<span class="f-12">(多选)</span>
            </td>
            <td colspan="2">工业用地,商服用地,教育用地</td>
          </tr>
          <tr>
            <td rowspan="2" class="fill-text-color">负责人</td>
            <td colspan="4" rowspan="2" class="t-left">李</td>
            <td colspan="3" class="fill-text-color">手机</td>
            <td colspan="4">19800021212</td>
            <td colspan="3" rowspan="2" class="fill-text-color">
              邮箱
            </td>
            <td colspan="2" rowspan="2" class="fill-text-color">
              522473412@qq.com
            </td>
          </tr>
          <tr>
            <td colspan="3" class="fill-text-color">固话</td>
            <td colspan="4">32324938</td>
          </tr>
          <tr>
            <td rowspan="2" class="fill-text-color">联系人</td>
            <td colspan="4" rowspan="2" class="t-left">李</td>
            <td colspan="3" class="fill-text-color">手机</td>
            <td colspan="4">13988202212</td>
            <td colspan="3" rowspan="2" class="fill-text-color">
              邮箱
            </td>
            <td colspan="2" rowspan="2" class="fill-text-color">
              52348593@qq.com
            </td>
          </tr>
          <tr>
            <td colspan="3" class="fill-text-color">固话</td>
            <td colspan="4">12857392</td>
          </tr>
          <tr>
            <td colspan="5" class="fill-text-color">
              开工时间
            </td>
            <td colspan="4">2013-10-02</td>
            <td colspan="6" class="fill-text-color">
              竣工时间
            </td>
            <td colspan="2">2014-12-26</td>
          </tr>
          <tr>
            <td colspan="5" class="fill-text-color">
              投运时间
            </td>
            <td colspan="4">2016-06-20</td>
            <td colspan="6" class="fill-text-color">
              园区类型<span class="f-12">(勾选)</span>
            </td>
            <td colspan="2">生产制造类</td>
          </tr>
          <tr>
            <td colspan="5" class="fill-text-color">
              主导产业
            </td>
            <td colspan="4">生物医药</td>
            <td colspan="6" class="fill-text-color">
              开发建设模式<span class="f-12">(勾选)</span>
            </td>
            <td colspan="2">工业地产开发</td>
          </tr>
          <tr>
            <td colspan="5" class="fill-text-color">
              园区规划面积（亩）
            </td>
            <td colspan="4">400</td>
            <td colspan="6" class="fill-text-color">
              实际用地面积（亩）
            </td>
            <td colspan="2">378</td>
          </tr>
          <tr>
            <td colspan="5" class="fill-text-color">
              计划投资总额（万元）
            </td>
            <td colspan="12">9,000</td>
          </tr>
          <tr>
            <td colspan="5" rowspan="4" class="fill-text-color">
              实际园区投资总额（万元）
            </td>
            <td colspan="4" rowspan="4">11,200</td>
            <td colspan="2" rowspan="4">其中</td>
            <td colspan="4" class="fill-text-color">
              国有投资额（万元）
            </td>
            <td colspan="2">200</td>
          </tr>
          <tr>
            <td colspan="4" class="fill-text-color">
              集体投资额（万元）
            </td>
            <td colspan="2">4,000</td>
          </tr>
          <tr>
            <td colspan="4" class="fill-text-color">
              民营投资额（万元）
            </td>
            <td colspan="2">5,000</td>
          </tr>
          <tr>
            <td colspan="4" class="fill-text-color">
              其他投资额（万元）
            </td>
            <td colspan="2">2,000</td>
          </tr>
          <tr>
            <td colspan="5" class="fill-text-color">
              规划建筑面积（平方米）
            </td>
            <td colspan="4">200</td>
            <td colspan="6" class="fill-text-color">
              规划公共配套设施建筑面积（平方米）
            </td>
            <td colspan="2">100</td>
          </tr>
          <tr>
            <td colspan="5" class="fill-text-color">
              已建建筑面积（平方米）
            </td>
            <td colspan="4">150</td>
            <td colspan="6" class="fill-text-color">
              已建公共配套设施建筑面积（平方米）
            </td>
            <td colspan="2">50</td>
          </tr>
          <tr>
            <td colspan="5" class="fill-text-color">
              已出售面积（平方米）
            </td>
            <td colspan="4">40</td>
            <td colspan="6" class="fill-text-color">
              园区剩余可租售面积（平方米）
            </td>
            <td colspan="2">100</td>
          </tr>
          <tr>
            <td colspan="5" class="fill-text-color">
              已出租面积（平方米）
            </td>
            <td colspan="4">10</td>
            <td colspan="6" class="fill-text-color"></td>
            <td colspan="2"></td>
          </tr>
          <tr style="height: 71px;">
            <td colspan="5" class="fill-text-color">
              公共配套设施<span class="f-12">(多选)</span>
            </td>
            <td colspan="12">
              宿舍公寓,便利超市,运动休闲场馆,会议场馆,共享仪器设备,研发中心,中试基地,公共检测室
            </td>
          </tr>
          <tr style="height: 72px;">
            <td colspan="5" class="fill-text-color">
              公共配套服务<span class="f-12">(多选)</span>
            </td>
            <td colspan="12">
              政策与信息服务,政务代办服务,投融资服务,教育培训服务,管理咨询服务,知识产权服务,财务代理服务,信息化服务
            </td>
          </tr>
          <tr style="height: 30px;">
            <td colspan="17" class="no-border"><!--第二页--></td>
          </tr>
          <tr>
            <td colspan="5" rowspan="6" class="fill-text-color">
              入驻企业家数（家）
            </td>
            <td colspan="4" rowspan="6">1</td>
            <td colspan="2" rowspan="6">其中</td>
            <td colspan="4" class="fill-text-color">
              规模以上企业数（家）
            </td>
            <td colspan="2">1</td>
          </tr>
          <tr>
            <td colspan="4" class="fill-text-color">
              高新技术企业（家）
            </td>
            <td colspan="2">0</td>
          </tr>
          <tr>
            <td colspan="4" class="fill-text-color">
              科技型中小企业（家）
            </td>
            <td colspan="2">0</td>
          </tr>
          <tr>
            <td colspan="4" class="fill-text-color">隐形冠军（家）</td>
            <td colspan="2">0</td>
          </tr>
          <tr>
            <td colspan="4" class="fill-text-color">股改企业（家）</td>
            <td colspan="2">0</td>
          </tr>
          <tr>
            <td colspan="4" class="fill-text-color">
              上市（挂牌）企业（家）
            </td>
            <td colspan="2">0</td>
          </tr>
          <tr>
            <td colspan="5" rowspan="2" class="fill-text-color">
              入驻企业员工总数（人）
            </td>
            <td colspan="4" rowspan="2">90</td>
            <td colspan="2" rowspan="2">其中</td>
            <td colspan="4" class="fill-text-color">
              “国千/省千”人才（人）
            </td>
            <td colspan="2">1</td>
          </tr>
          <tr>
            <td colspan="4" class="fill-text-color">
              硕士/副高以上（人）
            </td>
            <td colspan="2">40</td>
          </tr>
          <tr>
            <td colspan="5" class="fill-text-color">
              国家专利（件）
            </td>
            <td colspan="4">2</td>
            <td colspan="6" class="fill-text-color">
              其中：发明专利（件）
            </td>
            <td colspan="2">3</td>
          </tr>
          <tr>
            <td colspan="5" class="fill-text-color">
              每平方米租金（元/天）
            </td>
            <td colspan="4">4</td>
            <td colspan="6" class="fill-text-color">
              星级<span class="f-12">(勾选)</span>
            </td>
            <td colspan="2">无</td>
          </tr>
          <tr class="subtitle">
            <td colspan="17">
              <span>运营信息</span>
            </td>
          </tr>
          <tr>
            <td colspan="5" class="fill-text-color">
              运营机构名称
            </td>
            <td colspan="4">绿城集团</td>
            <td colspan="6" class="fill-text-color">
              统一社会信用代码
            </td>
            <td colspan="2">20392204849389E</td>
          </tr>
          <tr>
            <td colspan="5" class="fill-text-color">
              运营机构性质<span class="f-12">(勾选)</span>
            </td>
            <td colspan="4">国有</td>
            <td colspan="6" class="fill-text-color">
              运营管理模式<span class="f-12">(勾选)</span>
            </td>
            <td colspan="2">第三方专业机构运营</td>
          </tr>
          <tr>
            <td colspan="5" class="fill-text-color">
              运营机构从业人数（人）
            </td>
            <td colspan="4">80</td>
            <td colspan="6" class="fill-text-color">
              其中：大专以上学历人员数（人）
            </td>
            <td colspan="2">50</td>
          </tr>
          <tr>
            <td colspan="2" rowspan="2" class="fill-text-color">
              机构负责人
            </td>
            <td colspan="3" rowspan="2" class="t-left">李于</td>
            <td colspan="2" class="fill-text-color">手机</td>
            <td colspan="6">13989777766</td>
            <td colspan="2" rowspan="2" class="fill-text-color">
              邮箱
            </td>
            <td colspan="2" rowspan="2">
              49582932@qq.com
            </td>
          </tr>
          <tr>
            <td colspan="2" class="fill-text-color">固话</td>
            <td colspan="6">48489374</td>
          </tr>
          <tr>
            <td colspan="2" rowspan="2" class="fill-text-color">
              机构联系人
            </td>
            <td colspan="3" rowspan="2" class="t-left">李</td>
            <td colspan="2" class="fill-text-color">手机</td>
            <td colspan="6">13588675356</td>
            <td colspan="2" rowspan="2" class="fill-text-color">
              邮箱
            </td>
            <td colspan="2" rowspan="2">
              52457658@qq.com
            </td>
          </tr>
          <tr>
            <td colspan="2" class="fill-text-color">固话</td>
            <td colspan="6">78800976</td>
          </tr>
          <tr class="subtitle">
            <td colspan="17">
              <span>入驻企业名录</span>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="fill-text-color">企业名称</td>
            <td class="fill-text-color">统一社会信用代码</td>
            <td colspan="2" class="fill-text-color">所属行业</td>
            <td colspan="4" class="fill-text-color">入驻时间</td>
            <td colspan="2">企业状态</td>
            <td colspan="2">法定代表人</td>
            <td colspan="2">联系人</td>
            <td>联系人手机</td>
          </tr>
          <tr>
            <td colspan="3">测试企业</td>
            <td>9133000008169981X9</td>
            <td colspan="2">纺织</td>
            <td colspan="4">2018-01-01</td>
            <td colspan="2">入驻</td>
            <td colspan="2">郑某</td>
            <td colspan="2">郑某</td>
            <td>13111111112</td>
          </tr>
          <tr>
            <td colspan="17" class="t-left">
              备注：
            </td>
          </tr>
          <tr style="height: 140px;">
            <td colspan="17" class="relative">
              <div class="absolute position-xy fill-text-color">
                园区运营机构（盖章）
              </div>
              <div
                class="absolute"
                style="top: 45%;left: 45px;color: rgba(208,206,206);"
              >
                表中所填内容、数据真实完整。若出现不实问题，本单位承担相应责任
              </div>
              <div
                class="absolute fill-text-color"
                style="bottom: 5px;left: 3px;"
              >
                <span class="sign t-left">签字：</span>
                <span>日期：</span>
              </div>
            </td>
          </tr>
          <tr style="height: 142px;">
            <td colspan="17" class="relative">
              <div class="absolute position-xy fill-text-color">
                县（市区）小微企业园工作联席会议办公室（盖章）
              </div>
              <div
                class="absolute fill-text-color"
                style="bottom: 5px;left: 3px;"
              >
                <span class="sign t-left">签字：</span>
                <span>日期：</span>
              </div>
            </td>
          </tr>
          <tr style="height: 30px;">
            <td colspan="17" class="no-border"><!--第三页--></td>
          </tr>
          <tr class="large-td">
            <td colspan="17" class="relative">
              <div class="absolute position-xy fill-text-color">
                市小微企业园工作联席会议办公室（盖章）
              </div>
              <div
                class="absolute fill-text-color"
                style="bottom: 5px;left: 3px;"
              >
                <span class="sign t-left">签字：</span>
                <span>日期：</span>
              </div>
            </td>
          </tr>
          <tr class="large-td">
            <td colspan="17" class="relative">
              <div class="absolute position-xy fill-text-color">
                省小微企业园工作联席会议办公室（盖章）
              </div>
              <div
                class="absolute fill-text-color"
                style="bottom: 5px;left: 3px;"
              >
                <span class="sign t-left">签字：</span>
                <span>日期：</span>
              </div>
            </td>
          </tr>
          <tr class="h0">
            <td style="width: 69px; border: none"></td>
            <td style="width: 12px; border: none"></td>
            <td style="width: 12px; border: none"></td>
            <td style="width: 78px; border: none"></td>
            <td style="width: 78px; border: none"></td>
            <td style="width: 12px; border: none"></td>
            <td style="width: 42px; border: none"></td>
            <td style="width: 12px; border: none"></td>
            <td style="width: 30px; border: none"></td>
            <td style="width: 12px; border: none"></td>
            <td style="width: 25px; border: none"></td>
            <td style="width: 66px; border: none"></td>
            <td style="width: 12px; border: none"></td>
            <td style="width: 62px; border: none"></td>
            <td style="width: 24px; border: none"></td>
            <td style="width: 32px; border: none"></td>
            <td style="width: 56px; border: none"></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="17">
              <div class="remarks__wrapper">
                <span>注：</span>
                <ul>
                  <li>（1）园区状况：已投运、已竣工、在建中、规划中；</li>
                  <li>
                    （2）是否分期建设：是、否；如分期建设，请在园区名称后加注“（X期）”，如“XXX园（一期）”；
                  </li>
                  <li>（3）土地来源：划拨、出让、租用、其他；</li>
                  <li>
                    （4）土地性质（可多选）：工业用地、商服用地、创新用地、集体留用地、其他；
                  </li>
                  <li>
                    （5）园区类型：<br />选项1：生产制造类。<br />选项2：生产性服务业等。若是生产性服务业等，则需要进一步说明是：科技园/双创园/文创园/电商园/软件园/其他；
                  </li>
                  <li>
                    （6）开发建设类型：政府主导开发、龙头企业开发、企业联合开发、工业地产开发、村集体联合开发、专业机构开发、
                    其他；
                  </li>
                  <li>
                    （7）公共配套设施（可多选）：宿舍公寓、食堂餐饮、便利超市、图书资料室、运动休闲场馆、会议场馆、展览展示场馆、<br />光纤宽带、仓储、物流、共享仪器设备、研发中心、中试基地、公共实验室、公共检测室、<br />集中环保处理、其他；
                  </li>
                  <li>
                    （8）公共配套服务（可多选）：政策与信息服务、政务代办服务、投融资服务、创业辅导服务、人才招聘引进服务、<br />教育培训服务、管理咨询服务、技术与质量服务、研发设计服务、检验检测服务、法律服务、知识产权服务、市场开拓服务、<br />财务代理服务、物业管理服务、固定资产租赁服务、信息化服务、媒体宣传推广、其他；
                  </li>
                  <li>（9）星级：无、一星、二星、三星、四星、五星；</li>
                  <li>（10）运营机构性质：国有、集体、民营、其他；</li>
                  <li>
                    （11）园区运营管理模式：政府主导运营、开发商负责运营、第三方专业机构运营、其他；
                  </li>
                  <li>（12）企业状态：入驻、退出。</li>
                </ul>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      htmlTitle: 'PDF名称',
      nowTime: ''
    };
  },
  methods: {
    /**
     * @desc 下载认定表
     */
    onDown(event) {
      var target = document.getElementById('pdfCentent');
      target.style.background = '#FFFFFF'; // 打印的底色

      // eslint-disable-next-line no-undef
      html2canvas(target, {
        onrendered: function(canvas) {
          var contentWidth = canvas.width;
          var contentHeight = canvas.height;

          // 一页pdf显示html页面生成的canvas高度;
          var pageHeight = (contentWidth / 595.28) * 841.89;
          // 未生成pdf的html页面高度
          var leftHeight = contentHeight;
          // pdf页面偏移
          var position = 0;
          // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          var imgWidth = 480.28;
          var imgHeight = (480.28 / contentWidth) * contentHeight;

          var pageData = canvas.toDataURL('image/jpeg', 1.0);

          // eslint-disable-next-line
          var pdf = new jsPDF('', 'pt', 'a4');
          // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          // 当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
            pdf.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight);
          } else {
            while (leftHeight > 0) {
              pdf.addImage(pageData, 'JPEG', 60, position, imgWidth, imgHeight);
              leftHeight -= pageHeight;
              position -= 841.89;
              // 避免添加空白页
              if (leftHeight > 0) {
                pdf.addPage();
              }
            }
          }
          pdf.save('园区信息登记表.pdf');
        }
      });
    }
  }
};
</script>

<style lang="less">
.affirm-container {
  .relative;
  .down-button {
    .absolute;

    top: 30px;
    left: 120px;
    cursor: pointer;
  }
  .remarks_box {
    .absolute;

    top: 70px;
    left: 20px;
    li {
      padding-bottom: 10px;
    }
  }
  .no-border {
    border: 0 !important;
  }
  .affirm-table_box {
    .flex-column-top-center;
    .bg-fff;

    font-family: 'SimSun';
    .pb-20;
    .title {
      padding: 2px;
      font-size: 24px;
      font-weight: 700;
    }
    .inner-padding {
      padding: 5px;
    }
    td {
      height: 30px;
      border: 1px solid rgba(37, 50, 55, 0.6);
      .inner-padding;
    }
    tfoot {
      td {
        border: 0;
      }
    }
    .fill-text-color {
      color: rgb(94, 94, 94);
    }
    .position-xy {
      top: 3px;
      left: 3px;
    }
    .sign {
      display: inline-block;
      width: 160px;
    }
    .table-box {
      width: 710px;
      font-family: 'SimSun';
      border-spacing: 0;
      border-collapse: collapse;
      .full-y;
      .bg-fff;
      .flex-column-top-center;
      tr {
        .t-center;
      }
      .h0 {
        /* stylelint-disable selector-max-compound-selectors */
        td {
          height: 0;
          padding: 0;
        }
      }
      .large-td {
        height: 135px;
        .inner-padding;
      }
      .title {
        font-size: 24px;
        font-weight: 700;
      }
      .subtitle {
        background-color: rgb(234, 234, 234);
      }
      .position-xy {
        top: 3px;
        left: 3px;
      }
    }
  }
  .remarks__wrapper {
    .relative;

    font-size: 12px;
    text-align: left;
    li {
      padding-bottom: 5px;
    }
    span {
      .absolute;

      top: 0;
      left: 18px;
    }
  }
}
</style>
