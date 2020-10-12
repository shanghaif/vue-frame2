<template>
  <basic-layout
    v-bind="basicLayout"
    :titleClick="basicLayout.titleClick.bind(this)"
  ></basic-layout>
</template>

<script>
import { DEFAULT_SETTINGS } from '../../config/index.js';
import { BasicLayout } from '@packages/views/index.js';

export default {
  components: { BasicLayout },
  data() {
    return {
      basicLayout: DEFAULT_SETTINGS
    };
  },
  methods: {}
};
</script>

<style></style>
