<template>
    <v-empty-state :icon="props.icon">
        <template #media>
            <v-icon :color="props.color"></v-icon>
        </template>

        <template #headline>
            <div v-text="props.title" class="text-h3 my-12"></div>
        </template>

        <template #title>
            <div v-text="props.subtitle" class="text-h5"></div>
        </template>

        <template #text v-if="props.desc">
            <div v-text="props.desc" class="text-medium-emphasis text-caption"></div>
        </template>
    </v-empty-state>
</template>

<script setup lang="ts">
const props = defineProps<{
    icon: string
    color: string
    title: string
    subtitle: string
    desc?: string
}>()
</script>