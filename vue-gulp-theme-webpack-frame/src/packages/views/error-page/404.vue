<template>
  <div
    :class="[
      { 'error-404-container': true },
      { 'full-y': true },
      { 'flex-center': true },
      {'bg-fff': true}
    ]"
  >
    <div class="error">
      <div class="errorImg">
        <img src="@assets/images/error-page/index-gone.png" />
      </div>
      <p class="title">啊呀！页面飞走了</p>
      <p class="msg">抱歉，您所访问的页面不存在</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Exception404'
};
</script>
