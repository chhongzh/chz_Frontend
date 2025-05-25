import packageMeta from './package.json'
import { ILogObj, Logger } from 'tslog'
import Network from 'chz_network'
import { UserService } from './user'
import { BACKEND_BASE_URL, FRONTEND_BASE_URL } from './constants'
import { SignService } from './sign'

export default class BaseSDK {
    private logger: Logger<ILogObj>
    public readonly nw: Network
    private applicationID: string

    private frontendBaseURL: string
    private backendBaseURL: string

    public readonly userService: UserService
    public readonly signService: SignService

    constructor(logger: Logger<ILogObj>, applicationID: string, debug: boolean) {
        this.backendBaseURL = BACKEND_BASE_URL.get(debug || false)
        this.frontendBaseURL = FRONTEND_BASE_URL.get(debug || false)

        this.logger = logger
        this.nw = new Network(logger.getSubLogger({ name: 'Network' }), this.backendBaseURL)
        this.applicationID = applicationID

        this.userService = new UserService(logger, this.nw)
        this.signService = new SignService(logger, this.nw, this.applicationID, this.frontendBaseURL)

        this.logger.info(`Lib ${packageMeta.name}(${packageMeta.version})`)
    }


}