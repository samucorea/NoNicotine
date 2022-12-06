import { Buffer } from 'buffer'
import { Roles } from './enums/Roles'

export default function getTokenRole(
  token: string | undefined
): Roles | undefined {
  if (!token) {
    return undefined
  }
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())[
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
  ]
}
