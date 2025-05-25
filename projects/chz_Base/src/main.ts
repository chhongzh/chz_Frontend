// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import router from './router'
import { makeToast } from './common/snackbar'
import storage from './common/storage'

const app = createApp(App)

registerPlugins(app)

router.beforeEach((to) => {
    if (to.fullPath == '/debug' || to.fullPath == '/') {
        return
    }

    let authToken = storage.value.AuthToken
    let isToLoginOrRegister = to.fullPath == '/login' || to.fullPath == '/register'

    if (!isToLoginOrRegister && !authToken && !to.meta.notNeedLogin) {
        makeToast("请先登录", "warning")
        return '/login'
    } else if (isToLoginOrRegister && authToken) {
        makeToast("你已经登录过啦!", "warning")
        return '/logout'
    }
})

window.onerror = (message, source, lineno, colno, error) => {
    makeToast(`错误信息: ${message}\n来源: ${source}\n行号: ${lineno}\n列号: ${colno}${error ? '\n堆栈跟踪:\n' + error.stack.split('\n').map(line => line.trim()).join('\n') : ''
        }`, 'error')
}

app.mount('#app')
