import BaseSDK from "chz_base_sdk";
import logger from "./logger";
import storage from "./storage";
import router from "@/router";
import { makeToast } from "./snackbar";

const baseSDK = new BaseSDK(logger, 'ROOT', true)
baseSDK.nw.onError = (error: string) => {
    if (error.includes('token signature is invalid')) {
        storage.value.AuthToken = ''
        makeToast('登录已过期,请重新登录', 'warning')
        router.push('/login')
    }
}

export default baseSDK