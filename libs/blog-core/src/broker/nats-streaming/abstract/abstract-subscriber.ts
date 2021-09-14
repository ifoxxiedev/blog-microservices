import { Stan, Message } from 'node-nats-streaming'
import { IEventData } from '../../interfaces/event-data.interface'

export abstract class AbstractSubscriber<T extends IEventData> {

    abstract subject: T['eventType']
    abstract queueGroupName: string

    private readonly _ackWait: number
    private readonly _client: Stan

    constructor(client: Stan, options?: { ackWait?: number }) {
        this._ackWait = options?.ackWait || 2 * 1000
        this._client = client
    }

    abstract onMessage(data: IEventData['payload'], msg: Message): Promise<any>

    subscribe() {
        const sub = this._client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscribeOptions()
        )

        sub.on('message', async (msg: Message) => {
            let ackMessage = true
            try {
                await this.onMessage(this.parseMessagePayload(msg), msg)
            } catch(err) {
                ackMessage = false
            } finally {
                if (ackMessage) {
                    msg.ack()
                }
            }
        })
    }

    protected parseMessagePayload(msg: Message) {
        const data = msg.getData()
        return JSON.parse(typeof data === 'string' ? data : data.toString('utf-8'))
    }

    protected subscribeOptions() {
        return this._client.subscriptionOptions()
        .setDeliverAllAvailable() // Sempre entrege todas as mensagens
        .setManualAckMode(true) // EU tirar da fila a mensgaem deve ser manual e não auto matica
        .setAckWait(this._ackWait) // Tempo de espera para retirada da mensagem da fila
        .setStartWithLastReceived() // Sempre com a ultima mensagem recebida
        .setDurableName(this.queueGroupName)
    }
}