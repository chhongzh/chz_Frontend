<template>
    <v-card>
        <v-card-title>登录</v-card-title>
        <v-card-text>
            <v-window v-model="windowPage">
                <v-window-item :value="1">
                    <v-form class="mt-5">
                        <v-text-field label="用户名" v-model:model-value="inputData.username"></v-text-field>
                        <v-text-field label="密码" type="password" v-model:model-value="inputData.password"
                            hint="密码错误? 检查大小写锁定和输入法!"></v-text-field>
                    </v-form>
                </v-window-item>

                <v-window-item :value="2">
                    <State icon="$success" color="success" title="登录成功" subtitle="你已经完成登录!"
                        desc="如果你正在尝试登录其他程序, 请返回该程序的页面并重试." />
                </v-window-item>
            </v-window>
        </v-card-text>
        <v-card-actions v-if="windowPage == 1">
            <v-btn @click="router.push('/register')">没有账号, 去注册</v-btn>
            <v-spacer />
            <v-btn @click="doLogin" :loading="loginBtnState" color="success">登录</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { useLoading } from "chz_utils"
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import State from '@/components/State.vue';
import { makeToast } from '@/common/snackbar';
import baseSDK from '@/common/sdk';
import logger from "@/common/logger";
import storage from "@/common/storage";

const router = useRouter()

const inputData = reactive({
    username: '',
    password: ''
})
const windowPage = ref(1)

const [doLogin, loginBtnState] = useLoading(async () => {
    logger.info("Do Login")

    try {
        // 存储 AuthToken
        let authToken = await baseSDK.userService.login(inputData.username, inputData.password)
        storage.value.AuthToken = authToken

        windowPage.value = 2
        makeToast(`登录成功`, "success")

        // 如果还有 signSessionID, 那么就跳转到 oauth
        let signSessionID = router.currentRoute.value.query.signSessionID
        if (signSessionID) {
            logger.info("有 SignSessionID, 跳转到 OAuth")

            router.push({
                path: "/oauth",
                query: {
                    signSessionID: signSessionID
                }
            })
        }
    } catch (error) {
        // 清空
        inputData.password = ''

        makeToast(`登录失败: ${error}`, "error")
    }
})
</script>