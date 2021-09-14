import { connect, Stan } from 'node-nats-streaming'
import { IConnectionOptions } from '../../interfaces/connection-options.interface'

class NatsConnection {

    private _client: Stan

    protected makeUrl({ host, port, protocol }: IConnectionOptions) {
        return `${protocol}://${host}:${port}`
    }

    makeConnection(clusterId: string, clientId: string, options: IConnectionOptions): Promise<Stan> {
        return new Promise((resolve, reject) => {
            if (!this._client) {
                const stan = connect(
                    clusterId,
                    clientId,
                    {
                        url: this.makeUrl(options)
                    }
                )

                stan.on('connect', () => {
                    this._client = stan
                    resolve(this._client)
                })

                stan.on('error', error => {
                    reject(error)
                })
            } else {
                resolve(this._client)
            }

        })
    }

    get client(): Stan {
        if (!this._client) {
            throw new Error('Connect to nats before to get a connection!')
        }

        return this._client
    }
}
// DesignPattern => Singleton
export default new NatsConnection()