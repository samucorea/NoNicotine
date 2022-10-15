import { BaseEntity } from './BaseEntity'

export default interface User extends BaseEntity {
  first_name: string
  last_name: string
}

export interface RegisterUser extends User {
  password: string
}
