import { BaseEntity } from './BaseEntity'
import User, { RegisterUser } from './User'

export default interface Patient extends User {}

export interface RegisterPatient extends RegisterUser {}
