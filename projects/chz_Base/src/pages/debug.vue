<template>
    <h1>Debug 界面</h1>


    <v-btn @click="testSign" :loading="testSignState">打开 SignSession</v-btn>
    <v-btn @click="throwError">Raise Error</v-btn>
</template>

<script setup lang="ts">
import logger from '@/common/logger';
import baseSDK from '@/common/sdk';
import { makeToast } from '@/common/snackbar';
import { useLoading } from 'chz_utils';

const [testSign, testSignState] = useLoading(async () => {
    let res = await baseSDK.signService.openSign((url: string) => makeToast(url, 'success'))

    makeToast(`Res ${res}`, "success")
})

const throwError = () => {
    logger.info(12)
    throw new Error("Test Error")
}
</script>