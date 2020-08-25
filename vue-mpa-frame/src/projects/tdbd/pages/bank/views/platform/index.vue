<template>
  <basic2-layout v-bind="basicLayout"></basic2-layout>
</template>

<script>
import { DEFAULT_SETTINGS } from '../../config/index.js';
import { Basic2Layout } from '@packages/views/index.js';

export default {
  components: { Basic2Layout },
  data() {
    return {
      basicLayout: DEFAULT_SETTINGS
    };
  }
};
</script>

<style>

</style>
