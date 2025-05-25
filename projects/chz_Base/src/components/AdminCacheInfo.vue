<template>
    <v-card title="缓存命中">
        <v-card-text>
            <v-chart style="height:30vh" :option="option" />
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn @click="reloadBtn" :loading="reloadBtnState" icon="mdi-reload" />
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { getBaseSDK, getLogger } from '@/common/utils'
import { onMounted, reactive, ref } from 'vue'
import VChart from "vue-echarts";
import { useLoading } from 'chz_utils';


import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
use([TooltipComponent, PieChart, CanvasRenderer])

const baseSDK = getBaseSDK()
const logger = getLogger()
const option = reactive({
    tooltip: {
        trigger: "item",
        formatter: "{b} : {c} ({d}%)"
    },
    series: [
        {
            name: "Cache Hit Data",
            type: "pie",
            data: []
        }
    ]
});

const prepareData = async () => {
    // 获取数据
    try {
        let cacheInfo = await baseSDK.getCacheInfo()
        option.series[0].data = [
            { value: cacheInfo.TotalHit, name: '命中' },
            { value: cacheInfo.TotalStore, name: '未命中' },
        ]
    } catch (error) {
        logger.error(error)
    }
}

const [reloadBtn, reloadBtnState] = useLoading(prepareData)


onMounted(async () => {
    prepareData()
})
</script>