import Network from "chz_network";
import type { ILogObj, Logger } from "tslog";
import { useStorage } from '@vueuse/core'

export class UserService {
    private logger: Logger<ILogObj>
    private nw: Network

    constructor(logger: Logger<ILogObj>, nw: Network) {
        this.logger = logger
        this.nw = nw
    }


    public register(username: string, password: string, publicName: string, personalizedSignature: string) {
        return this.nw.post("/user/register", { username, password, publicName, personalizedSignature })
    }

    public async login(username: string, password: string) {
        let result = await this.nw.post("/user/login", { username, password }) as any

        return result.AuthToken
    }
}