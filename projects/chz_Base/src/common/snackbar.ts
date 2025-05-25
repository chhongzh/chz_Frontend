import state from "./state"

export type ColorType = 'success' | 'info' | 'warning' | 'error'

export const makeToast = (message: string, color: ColorType) => {
    state.snackbarQueue.push({ text: message, color: color })
}