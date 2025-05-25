<template>
    <v-card title="退出登录">
        <v-card-text>
            <p>这个操作将会退出当前账号, 包括所有的子项目, 继续?</p>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn @click="doLogout" color="error">退出登录</v-btn>
        </v-card-actions>
    </v-card>
</template>


<script setup lang="ts">
import { makeToast } from '@/common/snackbar';
import storage from '@/common/storage';
import { useRouter } from 'vue-router';

const router = useRouter()

const doLogout = () => {
    storage.value.AuthToken = ''

    makeToast("退出登录成功", "success")
    router.push("/login")
}
</script>