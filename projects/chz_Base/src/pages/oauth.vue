<template>
    <v-card>
        <v-card-title>授权登录</v-card-title>
        <v-card-subtitle>有一个应用申请登录到你的账号</v-card-subtitle>
        <v-card-text>
            <v-window v-model="windowIndex">
                <v-window-item :value="1">
                    <Text>
                        <v-card class="mb-5" variant="tonal">
                            <v-card-title>应用信息</v-card-title>
                            <v-card-text>
                                <v-text-field v-model:model-value="applicationData.name" label="应用名称"
                                    readonly></v-text-field>
                                <v-textarea auto-grow rows="7" v-model:model-value="applicationData.desc" label="应用描述"
                                    readonly />
                            </v-card-text>
                        </v-card>
                        这个程序希望连接到您的账户.<br />
                        如果同意, 请点击下方同意.
                    </Text>
                </v-window-item>

                <v-window-item :value="2">
                    <State icon="$success" color="success" title="授权成功" subtitle="你已经完成授权!"
                        desc="你现在可以安全的关闭此页面, 返回到原页面继续!" class="mb-6" />

                    <v-row justify="center">
                        <v-col cols="12" :md="4">
                            <v-btn block color="info" @click="closeSelf" prepend-icon="mdi-arrow-left">返回</v-btn>
                        </v-col>
                    </v-row>
                </v-window-item>

                <v-window-item :value="3">
                    <State icon="mdi-alert-circle" color="error" title="失败" subtitle="授权登录遇到问题"
                        desc="可能是参数不完整, 授权会话不存在或者过期, 总之, 试一试返回原应用重试吧!" class="mb-6" />
                </v-window-item>
            </v-window>
        </v-card-text>

        <v-card-actions v-if="windowIndex == 1">
            <v-spacer />
            <v-btn color="success" @click="complete" :loading="completeState">同意并继续</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { makeToast } from '@/common/snackbar';
import { useLoading } from 'chz_utils';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import Text from '@/components/Text.vue';
import State from '@/components/State.vue';
import baseSDK from '@/common/sdk';
import logger from '@/common/logger';
import storage from '@/common/storage';

const route = useRoute()
const windowIndex = ref(1)
const applicationData = reactive({ name: '', desc: '' })

let [complete, completeState] = useLoading(async () => {
    logger.info("尝试完成登录")

    let authToken = storage.value.AuthToken
    let signSessionID = route.query.signSessionID as string

    try {
        await baseSDK.signService.completeSign(authToken, signSessionID)
    } catch (e) {
        logger.error(e)

        windowIndex.value = 3

        makeToast(`授权登录失败: ${e}`, "error")
        return
    }

    logger.info("OK!")
    windowIndex.value = 2
})
const closeSelf = () => {
    window.close()
}

onMounted(async () => {
    // 抓取信息
    try {
        let info = await baseSDK.signService.getSignInfo(route.query.signSessionID as string)

        applicationData.name = info.ApplicationName
        applicationData.desc = info.ApplicationDesc
    } catch (e) {

        logger.error(e)
        makeToast(`抓取信息失败: ${e}`, "error")

        windowIndex.value = 3

        return
    }
})
</script>