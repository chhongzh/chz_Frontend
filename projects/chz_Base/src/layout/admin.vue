<template>
    <v-app>
        <v-app-bar title="chh0ngzh 控制台">
            <template #prepend>
                <v-btn icon="mdi-menu" @click="openDrawer = !openDrawer" />
            </template>
        </v-app-bar>

        <v-navigation-drawer v-model:model-value="openDrawer">
            <AdminNav />
        </v-navigation-drawer>

        <v-main>
            <v-container>
                <RouterView />
            </v-container>
        </v-main>
    </v-app>
</template>


<script setup lang="ts">
import AdminNav from '@/components/AdminNav.vue';
import { ref } from 'vue';

const openDrawer = ref(true)
</script>