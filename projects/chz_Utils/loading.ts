import { Ref, ref } from "vue"
export const useLoading = (wrapFunction: Function): [Function, Ref<boolean>] => {
    const loadingState = ref(false)

    const wrappedFunction = async () => {
        loadingState.value = true
        try {
            return await wrapFunction()
        } finally {
            loadingState.value = false
        }
    }

    return [wrappedFunction, loadingState]
}