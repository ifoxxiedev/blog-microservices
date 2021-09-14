import { IEventData } from '../../interfaces/event-data.interface'
import { Stan } from 'node-nats-streaming'

export abstract class AbstractPublisher<T extends IEventData> {
    abstract subject: T['eventType']
    private readonly _client: Stan

    constructor(client: Stan) {
        this._client = client
    }

    protected transformPayload(data: any) {
        return JSON.stringify(
            typeof data === 'object' ? 
            data : data ? data : {}
        ) 
    }

    publish(payload: T['payload']): Promise<void> {
        return new Promise((resolve, reject) => {
            this._client.publish(
                `${this.subject}`,
                this.transformPayload(payload),
                err => {
                    if (err) {
                        return reject(err)
                    }
                    resolve()
                })
        })
    }
}