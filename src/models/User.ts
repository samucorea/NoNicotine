import { Identification, Sex } from '../sharedTypes'
import { Roles } from '../utils/enums/Roles'
import { BaseEntity } from './BaseEntity'

export default interface User extends BaseEntity {
  name: string
  sex: Sex
  birthDate: Date
  identification: string
  identificationType: Identification
  active?: boolean
  identityUserId?: string
  role: Roles
}

export interface RegisterUser extends User {
  password: string
  email: string
}
