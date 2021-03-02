<template>
  <div :class="[$style.box, $style.mb30]">
    <h3><img src="/static/images/avatar.gif" alt="" /> 更新日志</h3>
    <h4>新增：</h4>
    <ul>
      <li>1. 2021-01-04 新增加 行编辑组件，示例菜单：行编辑-grid</li>
      <li>2. 2021-01-05 新增加 行拖拽组件，示例菜单：行拖拽-grid</li>
      <li>
        3. 2021-01-08 新增加 vue 模板html转pdf并且下载，示例菜单：html转pdf下载
      </li>
      <li>
        4. 2021-01-08 新增加 自定义百分比进度条滚动组件，示例菜单：个人中心
      </li>
      <li>5. 2021-01-10 新增加 下拉月份组件，示例菜单：用户管理</li>
      <li>6. 2021-01-10 新增加 v-f-ref 指令，优雅的获取跨层级子孙组件的实例</li>
      <li>7. 2021-01-11 新增加 穿梭-tree，示例菜单：tree 树形控件/穿梭-tree</li>
      <li>8. 2021-01-12 新增加 锚点-tree，示例菜单：tree 树形控件/锚点-tree</li>
      <li>9. 2021-01-12 新增加 表格联动，示例菜单：grid 列表 relevance-grid</li>
      <li>
        10. 2021-01-15 新增加 穿梭框树组件，示例菜单：tree 属性控件/穿梭-tree
      </li>
      <li>
        11. 2020-01-15 新增加
        select下拉滚动分页远程加载数据，并支持搜索功能，示例菜单：表单
      </li>
      <li>
        12. 2020-01-15 新增加 drop-down
        多层级展示功能与svg展示组件，示例菜单：下拉菜单
      </li>
      <li>13. 2020-01-18 新增加 嵌套表头-grid，示例菜单：Grid列表/多表头</li>
      <li>14. 2020-01-26 新增加 表格穿梭，示例菜单：Grid列表/表格穿梭</li>
      <li>15. 2020-01-26 新增加 拖拽对话框，示例菜单：对话框/拖拽-对话框</li>
      <li>16. 2020-02-04 新增加 下拉图标选择器，示例菜单：form表单</li>
      <li>
        17. 2020-02-24 tree 组件 新增加 禁用节点配置，示例菜单：tree
        树形控件/滚动样式-tree
      </li>
      <li>
        18. 2020-02-24 select-tree 组件 新增加
        下拉树自定义插槽展示节点内容，示例菜单：tree 树形控件/下拉select-tree
      </li>
    </ul>
    <h4>更新：</h4>
    <ul>
      <li>
        1. 2021-01-22 grid 组件增加
        isContinuityIndex参数序号是否连续性，第二页的index会在第一页的pageSize上直接增加，示例菜单：Grid列表/静态数据-grid
      </li>
      <li>
        2. 2021-01-22 grid 组件更新 静态数据
        支持分页，示例菜单：Grid列表/静态数据-grid
      </li>
      <li>
        3. 2021-01-24 grid 组件更新 支持 slot="empty"
        插槽，示例菜单：Grid列表/自定义分页参数-grid
      </li>
      <li>4. 2021-01-26 grid 组件更新 支持 api 接口动态修改</li>
      <li>5. 2020-01-26 tree-grid 树形grid，示例菜单：树形-grid</li>
      <li>
        6. 2020-02-03 nav-menu 导航组件增加 菜单参数 hide ，设置为 true
        时会跳过这个菜单的渲染
        <div>
          <pre style="word-wrap: break-word; white-space: pre-wrap;">
{"id": 3,
      "menuCode": "operations-manage",
      "menuName": "运营管理",
      "menuUrl": "operations-manage",
      "iconUrl": "svg-operations",
      "hide": true,"children":[]}</pre
          >
        </div>
      </li>
      <li>
        7. 2020-02-03 view-collapse 折叠面板组件增加 height 高度属性，设置为
        auto，则不会将组件对应父容器的高度设置给组件内折叠组件，示例菜单：视图-折叠面板
      </li>
      <li>
        8. 2020-02-03 view-collapse 折叠面板组件增加
        内部滚动条、外部滚动条，示例菜单：视图-折叠面板
      </li>
      <li>
        9. 2020-02-03 password-check
        密码校验强弱组件更新初始即校验，示例菜单：form表单
      </li>
    </ul>
    <p :class="$style.pl20">布局</p>
    <ul>
      <li>1. 2021-01-26 布局/border布局 示例菜单：布局/border布局</li>
      <li>2. 2021-01-29 布局/垂直布局 示例菜单：布局/垂直布局</li>
      <li>3. 2021-01-29 布局/水平布局 示例菜单：布局/水平布局</li>
      <li>4. 2021-01-29 布局/列布局 示例菜单：布局/列布局</li>
    </ul>
    <h4>修复：</h4>
    <ul>
      <li>
        1. base-select 下拉tree组件 设置：多选，父子级联 `:multiple="true"`
        :check-strictly="false" 时不能获取选中父节点对应的子节点，示例：tree
        属性控件/下拉select-tree （第10个示例）
      </li>
    </ul>
    <h4>说明：</h4>
    <ul>
      <li>1. 浙江省 菜单是用于单独打开某一个指定菜单项</li>
      <li>
        2.
        增加post请求发送不需要键的参数示例，示例菜单：路由嵌套/贷款需求/管理-评审
      </li>
      <li>
        3. 2021-01-12 新增加 如何修改 node_modules
        中依赖包的源码，示例菜单：路由嵌套/贷款需求/修改-源码
      </li>
      <li>4. 2021-01-26 增加 tree-grid 属性grid示例，示例菜单：树形-grid</li>
      <li :class="$style.bbb">
        5. 2021-02-01 修改了 basic-layout.vue
        布局，将中间区域的面包屑和内容展示分离
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" module>
.box {
  .full-y;

  overflow: auto;
  img {
    width: 25px;
    height: 25px;
  }
  li {
    margin: 10px 0;
  }
  .bbb {
    color: rgba(255, 206, 68, 0.5);
  }
}
</style>
