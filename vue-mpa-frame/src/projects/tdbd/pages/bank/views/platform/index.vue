<template>
  <basic-layout
    v-bind="basicLayout"
    :titleClick="basicLayout.titleClick.bind(this)"
  ></basic-layout>
</template>

<script>
import { BasicLayout } from '@packages/views/index.js';
import { DEFAULT_SETTINGS } from '../../config/index.js';

export default {
  components: { BasicLayout },
  data() {
    return {
      basicLayout: {
        ...DEFAULT_SETTINGS,
        isPadding: false
      }
    };
  },
  methods: {}
};
</script>
