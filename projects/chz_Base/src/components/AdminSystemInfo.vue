<template>
    <v-card title="系统信息">
        <v-card-text>
            <v-row>
                <v-col cols="12" :md="6">
                    <v-card :elevation="4" title="包">
                        <v-card-text>
                            <v-chart style="height:40vh" :option="packetsOption" />
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" :md="6">
                    <v-card :elevation="4" title="Bytes (In GB)">
                        <v-card-text>
                            <v-chart style="height:40vh" :option="bytesOption" />
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn @click="reloadBtn" :loading="reloadBtnState" icon="mdi-reload" />
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { getBaseSDK, getLogger } from '@/common/utils'
import { useLoading } from 'chz_utils'
import { onMounted, reactive, Ref, ref } from 'vue'
import VChart from "vue-echarts";

import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
use([GridComponent, BarChart, CanvasRenderer, TooltipComponent])


const baseSDK = getBaseSDK()
const logger = getLogger()
const startTime = ref(new Date())

const packetsOption = reactive({
    tooltip: {
        trigger: "item",
        formatter: "{b} : {c}"
    },
    xAxis: {
        type: 'category',
        data: ['Send', 'Recv']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [0, 0],
            type: 'bar'
        }
    ]
});
const bytesOption = reactive({
    tooltip: {
        trigger: "item",
        formatter: "{b} : {c}"
    },
    xAxis: {
        type: 'category',
        data: ['Send', 'Recv']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [0, 0],
            type: 'bar'
        }
    ]
});

const prepareData = async () => {
    // 获取数据
    try {
        let cacheInfo = await baseSDK.getSystemInfo()
        logger.debug(cacheInfo)

        packetsOption.series[0].data = [
            cacheInfo.PacketSent,
            cacheInfo.PacketRecv,
        ]
        bytesOption.series[0].data = [
            cacheInfo.BytesSent * (10 ** -9),
            cacheInfo.BytesRecv * (10 ** -9),
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