<template>
    <v-list @click:select="onChanged">
        <v-list-item prepend-icon="mdi-monitor-dashboard" title="仪表盘" value="/admin" />

        <v-list-group>
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi-account-circle" title="用户"></v-list-item>
            </template>

            <v-list-item title="封号" value="/admin/user/ban" />

        </v-list-group>

        <v-list-group>
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi-application-cog" title="应用"></v-list-item>
            </template>

            <v-list-item title="创建" value="/admin/application/create" />
            <v-list-item title="列表" value="/admin/application/list" />
        </v-list-group>
    </v-list>
</template>

<script setup lang="ts">
import logger from '@/common/logger';

const onChanged = (value) => {
    logger.info(value.id)
}
</script>