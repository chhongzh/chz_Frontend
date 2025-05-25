<template>
    <v-card>
        <v-card-title>注册</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field class="mb-4" label="公开名字" v-model:model-value="inputData.publicName"
                    hint="这是你的公开名字, 即别人可以看到的, 你可以随时更改!" />
                <v-textarea class="mb-4" label="个性签名" v-model:model-value="inputData.personalizedSignature"
                    hint="个性签名, 随便写写, 也可以不写." />
                <v-text-field class="mb-4" label="用户名" v-model:model-value="inputData.username"
                    hint="注意, 这是无法更改的! 将会用于登录和区别谁是谁, 因此请牢记!" />
                <v-text-field class="mb-4" label="密码" type="password" v-model:model-value="inputData.password"
                    hint="将会使用 SHA-256 算法加密存储到服务器中." />
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="router.push('/login')">已经有账号, 去登录</v-btn>
            <v-spacer />
            <v-btn @click="doRegister" :loading="registerBtnState" color="success">注册</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import logger from '@/common/logger';
import baseSDK from '@/common/sdk';
import { makeToast } from '@/common/snackbar';
import { useLoading } from "chz_utils"
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const inputData = reactive({
    username: '',
    password: '',
    publicName: '',
    personalizedSignature: ''
})

const [doRegister, registerBtnState] = useLoading(async () => {
    logger.info("Do Register")

    try {
        await baseSDK.userService.register(inputData.username, inputData.password, inputData.publicName, inputData.personalizedSignature)

        makeToast(`注册成功, 请前往登录`, "success")

        router.push("/login")
    } catch (error) {
        makeToast(`注册失败: ${error}`, "error")
    }
})



</script>