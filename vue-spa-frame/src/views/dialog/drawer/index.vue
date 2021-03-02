<template>
  <div>
    {{ row }}
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object
    }
  },
  data() {
    return {};
  },
  created() {
    console.info('...created...');
  },
  destroyed() {
    console.info('...destroyed...');
  }
};
</script>
