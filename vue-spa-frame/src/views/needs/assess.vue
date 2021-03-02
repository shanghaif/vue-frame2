<template>
  <div>
    贷款需求管理-评审
    <h3>增加post请求发送不需要键的参数</h3>
    <div>
      <p>注意：</p>
      <ul>
        <li>
          1. 接口的 headers 需要设置为 headers: { 'content-type':
          'aplication/json;charset=UTF-8' }，api接口默认为 aplication/json
        </li>
        <li>2. 接口模型设置 isAbandonCheckedParams: true</li>
        <li>3. 参数必须使用 JSON.stringify</li>
        <li>4. 接口的method是post</li>
      </ul>
    </div>
    <p>定义 api 模型：</p>
    <div>
      <!-- { name: 'add', method: 'POST', desc: '添加账号', path:
      '/organization/user/add', mockPath: '', mock: false, isAbandonCheckedParams: true // 是否放弃校验请求参数，默认会校验,data: { name: '',
      city: '', county: '', username: '', mobile: '', unit: '', id: 0, groupIds:
      [] } -->
      <ul>
        <li>{</li>
        <li>name: 'add',</li>
        <li>method: 'POST',</li>
        <li>desc: '添加账号',</li>
        <li>path: '/organization/user/add',</li>
        <li>mockPath: '', mock: false,</li>
        <li>
          isAbandonCheckedParams: true, // 是否放弃校验请求参数，默认会校验
        </li>
        <li>}</li>
      </ul>
    </div>
    <p>接口发送 this.$api：</p>
    <div>
      this.$api['system/authority/add']({ data: JSON.stringify([1, 2, 3, 4, 5])
      })
    </div>
  </div>
</template>

<script>
export default {};
</script>
