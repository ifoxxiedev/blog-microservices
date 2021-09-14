export enum Protocol {
    HTTP='HTTP',
    HTTPS='HTTPS'
}

export interface IConnectionOptions {
    protocol: Protocol,
    host: string,
    port: number
}