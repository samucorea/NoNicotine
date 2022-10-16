import { Identification, Sex } from '../sharedTypes'
import { BaseEntity } from './BaseEntity'

export default interface User extends BaseEntity {
  name: string
  sex: Sex
  birthDate: Date
  identification: string
  identificationType: Identification
  active?: boolean
  identityUserId?: string
}

export interface RegisterUser extends User {
  password: string
  email: string
}
