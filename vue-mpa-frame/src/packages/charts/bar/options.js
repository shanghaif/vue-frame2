/**
 * @desc 折线图-参数
 * @see 事件详细介绍请查看
 * {@link https://echarts.apache.org/zh/api.html#events echarts-events}
 * @see 配置项详细介绍请查看
 * {@link https://echarts.apache.org/zh/option.html#title echarts-options}
 */
import echarts from 'echarts';
// 小数点转百位 2->100 3->1000
// eslint-disable-next-line no-unused-vars
const dataDecimalsHandle = function(decimals) {
  let t = 1;
  for (let i = 0; i < decimals; i++) {
    t = t * 10;
  }
  return t;
};
export default function({ dataDecimals = 2, tooltipUnit = [] } = {}) {
  const baseOptions = {
    animation: true, // 如果对动画没要求，关闭动画，效果会更好
    backgroundColor: 'rgba(242,249,250, 0.5)', // echarts 图设置背景色和透明度
    title: {
      text: '标题-柱状图', // 主标题文本
      subtext: '示例-柱状图表', // 副标题文本
      // link: 'http://www.baidu.com', // 打开网页
      // eslint-disable-next-line quotes
      link: "javascript: void('0')", // 调用点击事件，（外部通过 listeners: {titleClick: ()=>{}} 事件）
      target: 'self', // 保证不会在新的窗口弹出
      // left: 'center', // title 组件离容器左侧的距离
      x: 'center',
      y: 'top',
      show: true // 是否显示标题组件
    },
    tooltip: {
      show: true, // 是否显示提示框组件
      transitionDuration: 0, // 防止tooltip的抖动
      trigger: 'axis', // 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
      axisPointer: {
        type: 'shadow', // 坐标轴指示器配置项
        label: {
          backgroundColor: '#6a7985' // 指示器周边坐标抽上的文字块背景色
        }
      },
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
    legend: {
      show: true, // 是否显示图例
      orient: 'horizontal', // 图例列表的布局朝向 'horizontal'、'vertical'
      x: 'center', // 可设定图例在左、右、居中
      y: 'top', // 可设定图例在上、下、居中
      padding: [7, 0, 0, 0], // 图例内边距，单位px，默认5px
      selectedMode: 'multiple', // 单选模式（single 无法显示两根折线，false 则会取消点击事件）
      data: ['当月累计完成总投资', '当月目标完成进度', '去年同期目标完成进度'],
      textStyle: { color: '#BFBFBF', fontSize: 12 },
      // 默认选中某个图例（true 显示 false 不显示）
      selected: {
        // 当月累计完成总投资: false,
        // 当月目标完成进度: true,
        // 去年同期目标完成进度: false
      },
      itemGap: 10, // 图例每项之间的间隔
      itemWidth: 10, // 控制 icon 的宽高
      itemHeight: 10,
      icon: 'circle'
    },
    xAxis: [
      {
        show: true, // 是否显示 x 轴
        name: '\n\n月份', // 给X轴加单位 （\n\n 防止X轴名称与Y轴标签重叠）
        type: 'category', // 坐标轴类型
        data: ['2020-12', '2020-11', '2020-05'], // 数据
        splitLine: {
          show: true // 是否显示分隔线（grid 区域中的分隔线）。
        },
        // 坐标轴轴线相关设置
        axisLine: {
          show: true, // 是否显示坐标轴轴线
          symbol: ['none'], // 坐标轴 axisLine 的样式，（末端显示箭头可以设置为 ['none', 'arrow']）
          lineStyle: {
            color: '#BFBFBF' // x坐标轴设置为红色
          }
        },
        boundaryGap: true, // （false 让折线图从X轴0刻度开始）
        axisLabel: {
          rotate: 0, // 设置x轴上的日期旋转，自己设置旋转角度
          interval: 0, // 强制显示文字
          show: true, // 是否显示刻度标签
          textStyle: {
            color: '#1E1E1E', // x轴坐标颜色
            fontSize: 10
          }
        }
      }
    ],
    yAxis: [
      {
        show: true, // 是否显示 y 轴
        type: 'value', // 坐标轴类 'value' 数值轴，适用于连续数据
        name: '投资金额:(亿元)', // 纵坐标的单位
        position: 'left', // y 轴的位置-第一个y轴位于图标的左侧
        // 坐标轴名称的文字样式
        nameTextStyle: {
          fontSize: 12,
          color: '#DC4D41',
          padding: [0, 0, 0, 20] // 文字块的内边距
        },
        // 坐标轴轴线相关设置
        axisLine: {
          show: true, // 是否显示坐标轴轴线
          lineStyle: {
            color: '#141212' // y坐标轴设置为绿色
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
        // 坐标轴在 grid 区域中的分隔线
        splitLine: {
          show: true, // y轴网格线
          lineStyle: {
            type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
            color: '#595C5C',
            opacity: 0.5
          }
        }
      },
      {
        type: 'value',
        name: '目标完成进度：%',
        nameLocation: 'end',
        nameTextStyle: {
          fontSize: 12,
          color: '#1E1E1E',
          padding: [0, 20, 0, 0]
        },
        axisLine: { show: true },
        axisLabel: {
          textStyle: {
            color: '#1E1E1E',
            margin: 15
          }
        },
        splitLine: {
          show: true
        }
      }
    ],
    series: [
      {
        name: '当月累计完成总投资', // 系列名称，用于tooltip的显示，legend 的图例筛选
        type: 'bar', // 柱状图
        data: [195.6, 45.7, 87.01],
        animation: true, // 单根折线取消动画效果
        smooth: false, // 是否平滑曲线
        yAxisIndex: 0, // 应用第一个数轴
        barWidth: 12, // 柱状图的宽度
        itemStyle: {
          color: '#0068FF' // 柱状图的颜色
        },
        // 基线
        markLine: {
          symbol: 'none',
          data: [
            {
              silent: false, // 鼠标悬停事件  true没有，false有
              lineStyle: {
                // 警戒线的样式  ，虚实  颜色
                type: 'dotted',
                color: '#DD4F43'
              },
              label: {
                position: 'insideEndTop',
                formatter: '本年度目标值(100)'
              },
              yAxis: 100
            }
          ]
        }
      },
      {
        name: '当月目标完成进度',
        type: 'line',
        smooth: true,
        yAxisIndex: 0,
        data: [94, 46, 37],
        symbolSize: 8, // 拐点圆的大小
        itemStyle: {
          borderWidth: 2,
          color: '#0CFEFF'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#0CFEFF'
            },
            {
              offset: 1,
              color: 'transparent'
            }
          ])
        },
        lineStyle: {
          width: 2,
          normal: {
            color: '#0CFEFF', // 折线条的颜色
            borderColor: '#0CFEFF' // 拐点边框颜色
          }
        }
      },
      {
        name: '去年同期目标完成进度',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: [20, 45, 76],
        symbolSize: 8, // 拐点圆的大小
        itemStyle: {
          borderWidth: 2,
          color: '#FFDA35'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#FFFF00'
            },
            {
              offset: 1,
              color: 'transparent'
            }
          ])
        },
        lineStyle: {
          width: 2,
          normal: {
            color: '#FFFF00', // 折线条的颜色
            borderColor: '#FFFF00' // 拐点边框颜色
          }
        }
      }
    ]
  };
  return baseOptions;
}
