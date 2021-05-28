/**
 * @desc 折线图-参数
 * @see 事件详细介绍请查看
 * {@link https://echarts.apache.org/zh/api.html#events echarts-events}
 * @see 配置项详细介绍请查看
 * {@link https://echarts.apache.org/zh/option.html#title echarts-options}
 */
// 小数点转百位 2->100 3->1000
const dataDecimalsHandle = function(decimals) {
  let t = 1;
  for (let i = 0; i < decimals; i++) {
    t = t * 10;
  }
  return t;
};
/**
 *
 * @param {Number} [dataDecimals=2] - 小数点位数（不做向上和向下转换）
 * @param {Array} [tooltipUnit=[]] - tooltip 提示框浮层内容的单位
 */
export default function({ dataDecimals = 2, tooltipUnit = [] } = {}) {
  const baseOptions = {
    animation: true, // 如果对动画没要求，关闭动画，效果会更好
    title: {
      text: '标题-折线图', // 主标题文本
      subtext: '示例-折线图表', // 副标题文本
      // link: 'http://www.baidu.com', // 打开网页
      // eslint-disable-next-line quotes
      link: "javascript: void('0')", // 调用点击事件，（外部通过 listeners: {titleClick: ()=>{}} 事件）
      target: 'self', // 保证不会在新的窗口弹出
      // left: 'center', // title 组件离容器左侧的距离
      x: 'center', // 标题位置
      y: 'top',
      show: true // 是否显示标题组件
    },
    backgroundColor: 'rgba(242,249,250, 0.5)', // echarts 图设置背景色和透明度
    legend: {
      show: true, // 是否显示图例
      orient: 'horizontal', // 图例列表的布局朝向 'horizontal'、'vertical'
      x: 'center', // 可设定图例在左、右、居中
      y: 'bottom', // 可设定图例在上、下、居中
      padding: [0, 0, 3, 0], // 图例内边距，单位px，默认5px
      // left: 100, // 左对齐，距离左边边距是 100 （会覆盖 x: 'center' 居中属性）
      selectedMode: 'multiple', // 单选模式（single 无法显示两根折线，false 则会取消点击事件）
      data: [], // '人员总量', '到岗率'
      // selected: { 人员总量: false, 到岗率: true }, // 默认显示某几条折线
      textStyle: {
        // 图例文字的样式
        color: '#DD5246'
      },
      // formatter: 'Legend {name}', // 格式化图例文本
      // legend 文字配置多个颜色
      // data: [{ name: '人员总量', icon: 'circle', textStyle: { color: 'red' } }, { name: '到岗率', icon: 'rect', textStyle: { color: 'blue' } }]
      // 默认选中某个图例（true 显示 false 不显示）
      selected: {
        // 人员总量: false,
        // 到岗率: true
      },
      itemGap: 20, // 图例每项之间的间隔
      itemWidth: 10, // 控制 icon 的宽高
      itemHeight: 10,
      icon: 'circle'
    },
    xAxis: {
      show: true, // 是否显示 x 轴
      name: '\n\n天', // 给X轴加单位 （\n\n 防止X轴名称与Y轴标签重叠）
      type: 'category', // 坐标轴类型
      splitLine: {
        show: true // 是否显示分隔线（grid 区域中的分隔线）。
      },
      // 坐标轴轴线相关设置
      axisLine: {
        show: true,
        symbol: ['none'], // 坐标轴 axisLine 的样式，（末端显示箭头可以设置为 ['none', 'arrow']）
        lineStyle: {
          color: '#FFCD43' // x坐标轴设置为红色
        }
      },
      boundaryGap: true, // （false 让折线图从X轴0刻度开始）
      axisLabel: {
        show: true, // 是否显示刻度标签
        rotate: 30, // 设置x轴上的日期旋转，自己设置旋转角度
        interval: 0, // 强制显示文字
        // 定制化 X轴显示（return ''; 不显示x轴上的数值）
        /* formatter: function (value) {
          var texts = [];
          if (value === '星期一') {
            texts.push('开始');
          } else if (value === '星期天') {
            texts.push('结束');
          }
          return texts;
        }, */
        // 第一个坐标轴显示带有星期，其它都不显示
        /* formatter: function (value) {
          var texts = [];
          if (value === '星期一') {
            texts.push(value);
          } else {
            texts.push(value.replace('星期', ''));
          }
          return texts;
        }, */
        textStyle: {
          color: '#FFCD43'
        }
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: [
      {
        show: true, // 是否显示 y 轴
        type: 'value', // 坐标轴类 'value' 数值轴，适用于连续数据
        name: '个/人', // 纵坐标的单位
        position: 'left', // y 轴的位置
        splitLine: {
          show: true, // y轴网格线
          lineStyle: {
            type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
            color: '#595C5C',
            opacity: 0.5
          }
        },
        axisLine: {
          show: true, // 是否显示坐标轴轴线
          lineStyle: {
            color: 'green' // y坐标轴设置为绿色
          }
        },
        splitNumber: 5, // 坐标轴的分割段数
        // 坐标轴刻度标签的相关设置
        axisLabel: {
          show: true, // 是否显示刻度标签
          textStyle: {
            color: '#B52F2F', // 坐标轴数值颜色
            margin: 8 // 刻度标签与轴线之间的距离
          }
        },
        // y轴，显示数据，但不显示竖线（如果 xAxis 的 splitLine.show 设置为 true 的话也需要修改为 false）
        /* axisLine: { show: false }, // 是否显示坐标轴轴线。
        axisTick: { show: false }, // 是否显示坐标轴刻度。
        splitLine: { show: false }, // 是否显示分隔线（grid 区域中的分隔线）。
        // y轴，不显示数据和不显示竖线
        axisLabel: {
          formatter: function (value) {
            return '';
          }
        }, */
        // max: 2000 // 设置最大刻度过大导致数据贴边显示
        // 坐标轴名称的文字样式
        nameTextStyle: {
          fontSize: 12,
          color: '#DC4D41',
          padding: [0, 0, 0, 20] // 文字块的内边距
        }
      },
      {
        name: '百分比',
        type: 'value',
        splitLine: {
          show: true // y轴网格线
        },
        axisLabel: {
          show: true,
          interval: 'auto', // 居中显示
          formatter: '{value} %' // 以百分比显示坐标轴
        },
        // min: 0,
        max: 100 // 不要同时定义 min和max，否则在点击图例时不能取消对应的 y 轴
      }
    ],
    series: [
      {
        // data: [820, 932, 901.67, 934, 1290, 1330, 1320],
        /* data: [
          { name: 'key1', value: 850 },
          { name: 'key2', value: 932 },
          {
            name: 'key3',
            value: 901.676,
            label: {
              // 格式化单个数据
              formatter: function(v) {
                return Math.floor(v.value * 100) / 100;
              }
            }
          },
          { name: 'key4', value: 934 },
          { name: 'key5', value: 1290 },
          { name: 'key6', value: 1330 },
          { name: 'key7', value: 1320 }
        ], */
        data: [],
        type: 'line', // 折线/面积图
        name: '人员总量', // 系列名称，用于tooltip的显示，legend 的图例筛选
        animation: true, // 单根折线取消动画效果
        smooth: false, // 是否平滑曲线
        yAxisIndex: 0, // 应用第一个数轴
        symbol: 'circle', // 去掉小圆点 （none 去掉小圆点）
        label: {
          normal: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#000'
            }
          }
        },
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: function(v) {
                const t = dataDecimalsHandle(dataDecimals);
                return Math.floor(v.value * t) / t; // 默认小数点后两位
              }
            },
            lineStyle: {
              width: 2,
              type: 'dotted' // 'dotted'虚线 'solid'实线
            }
          }
        }
      },
      {
        name: '到岗率',
        type: 'line',
        smooth: true,
        yAxisIndex: 1, // 应用第二个数轴
        symbol: 'circle', // 去掉小圆点 （none 去掉小圆点）
        itemStyle: {
          normal: {
            label: {
              show: true,
              // 格式化 data 数据，在这里可以进行小数点位数控制（如果需要控制单个值请使用 data 的key和value形式）
              formatter: function(v) {
                // 2->100
                // 3->1000
                const t = dataDecimalsHandle(dataDecimals);
                return Math.floor(v.value * t) / t;
              }
            }, // 每个折点都显示数值
            color: '#333', // 折线每个折点的颜色，会对应图例点的颜色
            lineStyle: {
              color: '#a8f5a1' // 折线颜色
            }
          }
          // 图形的高亮样式
          /* emphasis: {
            label: {
              formatter: function (v) {
                v.value = Math.floor(v.value * 100) / 100;
                v.data = Math.floor(v.data * 100) / 100;
                return v.value;
              }
            }
          } */
        },
        areaStyle: { normal: { color: '#a8f5a1' } }, // 区域填充样式
        // data: [20, 10.135, 50, 35, 60, 30, 50]
        data: []
      }
    ],
    // 右上角工具栏
    toolbox: {
      show: true,
      feature: {
        saveAsImage: { show: true }, // 保存为图片
        // magicType: { show: true, type: ['stack', 'tiled'] }, // 切换为堆叠
        // restore: { show: true }, // 重置
        // dataZoom: { show: true }, // 数据缩放视图
        myTool1: {
          show: true,
          title: '自定义扩展方法1',
          icon:
            'image://https://panjiachen.gitee.io/vue-element-admin/favicon.ico',
          onclick: function() {
            console.info('自定义扩展方法1');
          }
        }
      }
    },
    // 区域缩放，图表x轴数据过多时鼠标在图表区域内可以左右拉动
    dataZoom: [
      {
        type: 'inside', // 鼠标滚轮 （布尔参数 isScale 是否缩放）
        realtime: true
      }
    ],
    // 直角坐标系内绘图网格，也就是图标在绘图区域内的内边距控制
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%', // 控制图表距四边的距离比
      containLabel: true // 是否包含坐标轴的刻度标签
    },
    // 提示框（就是鼠标放上去后出现的框）
    tooltip: {
      show: true, // 是否显示提示框组件
      transitionDuration: 0, // 防止tooltip的抖动
      trigger: 'axis', // 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
      backgroundColor: 'rgba(255,255,255,0.8)', // 通过设置rgba调节背景颜色与透明度
      color: 'black', // 文字颜色
      borderWidth: '1', // 外部的边框ox
      borderColor: 'gray', // 边框颜色
      textStyle: {
        color: '#333'
      },
      axisPointer: {
        type: 'cross', // 坐标轴指示器配置项
        label: {
          backgroundColor: '#6a7985' // 指示器周边坐标抽上的文字块背景色
        }
      },
      confine: true, // 是否将 tooltip 框限制在图表的区域内
      // show: false, // 取消 鼠标滑过的提示框
      // 自定义提示框
      /*
      formatter: function (params) {
        var relVal = params[0].name;
        for (var i = 0, l = params.length; i < l; i++) {
          console.info(params[i].seriesName);
          if (i === 0) {
            relVal += '<br/>' + params[i].seriesName + ' : ' + params[i].value + '个/人';
          }
          if (i === 1) {
            relVal += '<br/>' + params[i].seriesName + ' : ' + params[i].value + '%';
          }
        }
        return relVal;
      }, */
      // 自定义提示框-格式化输出
      // formatter: '{b0}（{a0}）：{c0}个/人<br/>{b1}（{a1}）：{c1}%',
      formatter: function(params) {
        var relVal = params[0].name;
        // params[i].marker 图例的对应小图标
        for (var i = 0, l = params.length; i < l; i++) {
          relVal +=
            '<br/>' +
            params[i].marker +
            params[i].seriesName +
            ' : ' +
            params[i].value +
            tooltipUnit[i];
        }
        return relVal;
      }
    }
  };
  return baseOptions;
}
