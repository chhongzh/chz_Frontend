<template>
    <v-row>
        <v-col cols="12" :md="5">
            <AdminCacheData />
        </v-col>
        <v-col cols="12" :md="7">
            <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <AdminSystemInfo />
        </v-col>
    </v-row>


</template>

<script setup lang="ts">
import AdminCacheData from './AdminCacheInfo.vue'
import AdminSystemInfo from './AdminSystemInfo.vue';
</script>