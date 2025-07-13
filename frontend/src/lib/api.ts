import { hc } from 'hono/client'

const client = hc('/')

export const api = client.api