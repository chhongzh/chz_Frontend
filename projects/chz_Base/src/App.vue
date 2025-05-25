<template>
  <v-snackbar-queue v-model="state.snackbarQueue" timer :timeout="2000" />
  <component :is="LAYOUT_MAP.get(route.meta?.layout as string || 'Default')" />
</template>

<script lang="ts" setup>
import AdminLayout from './layout/admin.vue';
import DefaultLayout from './layout/default.vue';
import HomepageLayout from './layout/homepage.vue';
import { useRoute } from 'vue-router';
import state from './common/state';

const LAYOUT_MAP = new Map<string, any>([
  ["Admin", AdminLayout],
  ["Default", DefaultLayout],
  ["HomePage", HomepageLayout]
])

const route = useRoute()
</script>
