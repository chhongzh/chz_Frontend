import Network from "chz_network";
import { ILogObj, Logger } from "tslog";
import { Ref } from "vue"
import { useStorage } from "@vueuse/core"

export class SignService {
    private nw: Network
    private logger: Logger<ILogObj>
    private applicationID: string
    private frontendBaseURL: string
    public readonly accessToken: Ref<string>

    constructor(logger: Logger<ILogObj>, nw: Network, applicationID: string, frontendBaseURL: string) {
        this.logger = logger
        this.nw = nw
        this.applicationID = applicationID
        this.frontendBaseURL = frontendBaseURL
        this.accessToken = useStorage('chz_Base_Sdk AccessToken', '')
    }

    // 打开 Login, 并将会存储 AccessToken.
    public async openSign(whenGetURL: (url: string) => void) {
        this.logger.info('开始 Login')

        // 1
        // 打开一个 Login Session
        let signSessionID = await this.openSignSession(this.applicationID)
        this.logger.info("Sign Session Created.", { signSessionID })

        // 2
        // 生成 LoginURL
        let loginURL = `${this.frontendBaseURL}/oauth?signSessionID=${signSessionID}`

        // 2.1
        // 调用 Hook
        whenGetURL(loginURL)

        // 2.2 打开
        window.open(loginURL)

        // 3
        // 监听
        let accessToken = await this.waitForSignSession(signSessionID)
        this.logger.info('Login Success', { accessToken })

        return accessToken
    }

    public async completeSign(authToken: string, signSessionID: string) {
        await this.nw.post(`/sign/${signSessionID}/complete`, { authToken })
    }

    // 返回 SignSessionID
    private async openSignSession(applicationID: string): Promise<string> {
        return (await this.nw.post("/sign", { ApplicationID: applicationID })).SignSessionID
    }

    private async waitForSignSession(signSessionID: string) {
        let accessToken = (await this.nw.get(`/sign/${signSessionID}`)).AccessToken as string
        this.accessToken.value = accessToken

        this.logger.info("Sign Session Completed.", { signSessionID, accessToken })

        return accessToken
    }

    public async getSignInfo(signSessionID: string): Promise<{
        ApplicationName: string
        ApplicationDesc: string
    }> {
        return this.nw.get(`/sign/${signSessionID}/info`)
    }
}