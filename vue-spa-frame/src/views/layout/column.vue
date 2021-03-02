<template>
  <div :class="$style.box">
    <div :class="$style.topnav">
      <base-select
        v-model="isChecked"
        :options="options"
        displayField="label"
        valueField="value"
        placeholder="请选择-Align"
      ></base-select>
    </div>
    <div :class="$style.baseColumnBox">
      <base-column-layout v-if="isChecked === 1" align="left">
        <div :class="$style.columnBox" width="400px">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.1">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.2">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.3">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.4">
          {{ content }}
        </div>
      </base-column-layout>
      <base-column-layout v-if="isChecked === 2" align="left" space="10px">
        <el-button type="primary">主要按钮</el-button>
        <div :class="$style.columnBox" :columnWidth="1"></div>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </base-column-layout>
      <base-column-layout v-if="isChecked === 3" align="left" space="10px">
        <el-button type="primary">主要按钮</el-button>
        <div :class="$style.columnBox" :columnWidth="0.1"></div>
        <el-button type="success">成功按钮</el-button>
        <div :class="$style.columnBox" :columnWidth="0.2"></div>
        <el-button type="info">信息按钮</el-button>
        <div :class="$style.columnBox" :columnWidth="0.3"></div>
        <el-button type="warning">警告按钮</el-button>
        <div :class="$style.columnBox" :columnWidth="0.4"></div>
        <el-button type="danger">危险按钮</el-button>
      </base-column-layout>
      <base-column-layout v-if="isChecked === 4" align="right" space="10px">
        <div :class="$style.columnBox" width="400px">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.1">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.2">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.3">
          {{ content }}
        </div>
      </base-column-layout>
      <base-column-layout v-if="isChecked === 5" align="center" space="10px">
        <div :class="$style.columnBox" width="400px">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.1">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.2">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.3">
          {{ content }}
        </div>
      </base-column-layout>
      <base-column-layout v-if="isChecked === 6" align="between" space="10px">
        <div :class="$style.columnBox" width="400px">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.1">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.2">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.3">
          {{ content }}
        </div>
      </base-column-layout>
      <base-column-layout v-if="isChecked === 7" align="around" space="10px">
        <div :class="$style.columnBox" width="400px">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.1">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.2">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.3">
          {{ content }}
        </div>
      </base-column-layout>
      <base-column-layout
        v-if="isChecked === 8"
        align="left"
        pack="start"
        space="10px"
      >
        <div :class="$style.columnBox" width="400px">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.1">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.2">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.3">
          {{ content }}
        </div>
      </base-column-layout>
      <base-column-layout
        v-if="isChecked === 9"
        align="left"
        pack="center"
        space="10px"
      >
        <div :class="$style.columnBox" width="400px">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.1">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.2">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.3">
          {{ content }}
        </div>
      </base-column-layout>
      <base-column-layout
        v-if="isChecked === 10"
        align="left"
        pack="end"
        space="10px"
      >
        <div :class="$style.columnBox" width="400px">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.1">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.2">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.3">
          {{ content }}
        </div>
      </base-column-layout>
      <base-column-layout
        v-if="isChecked === 11"
        align="left"
        pack="stretch"
        space="10px"
      >
        <div :class="$style.columnBox" width="400px">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.1">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.2">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.3">
          {{ content }}
        </div>
      </base-column-layout>
      <base-column-layout
        v-if="isChecked === 12"
        align="left"
        pack="start"
        space="10px"
      >
        <div :class="$style.columnBox" width="1920px">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.1">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.2">
          {{ content }}
        </div>
        <div :class="$style.columnBox" :columnWidth="0.3">
          {{ content }}
        </div>
      </base-column-layout>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    this.options = [
      { value: 1, label: 'Align: left' },
      { value: 2, label: 'Spaced / Align: left' },
      { value: 3, label: 'Multi-Spaced / Align: left' },
      { value: 4, label: 'Align: right / Pack: start' },
      { value: 5, label: 'Align: center / Pack: start' },
      { value: 6, label: 'Align: between / Pack: start' },
      { value: 7, label: 'Align: around / Pack: start' },
      { value: 8, label: 'Pack: start / Align: left' },
      { value: 9, label: 'Pack: center / Align: left' },
      { value: 10, label: 'Pack: end / Align: left' },
      { value: 11, label: 'Pack: stretch / Align: left' },
      { value: 12, label: 'WidthMax:1920px' }
    ];
    return {
      isChecked: 1,
      content:
        // eslint-disable-next-line quotes
        "<div><p>这是为构建多个垂直式结构而准备的布局，当中包含已指定宽度的多个列，列的宽度可以是固定值，也可以是可伸缩的百分比宽度，但里面的内容就是自适应高度了。应通过继承此类或设置Ext.Containerlayout的配置layout:'column'的方式创建该类，一般很少通过关键字new直接使用该类。</p><p>属性width总是以象素（pixles）来固定宽度，并必须是数字大于或等于1；属性columnWidth是百分比相对单位，并必须是百分比字符串区间是大于0小于1（像.25）。</p></div>"
    };
  }
};
</script>

<style lang="less" module>
.box {
  width: 100%;
  height: 100%;
  .topnav {
    .mb-10;

    height: 5%;
  }
  .column-box {
    box-sizing: border-box;
    border: 1px solid rgba(0, 200, 200, 1);
  }
  .base-column-box {
    box-sizing: border-box;
    width: 100%;
    height: 95%;
    padding: 10px;
    border: 1px dotted rgba(50, 150, 250, 1);
  }
}
</style>
