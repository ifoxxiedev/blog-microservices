import { randomBytes } from 'crypto'

export function generateClientId() {
    return randomBytes(7).toString('hex')
}