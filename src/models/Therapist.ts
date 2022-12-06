import Patient from './Patient'
import User, { RegisterUser } from './User'

export interface Therapist extends User {}

export interface RegisterTherapist extends RegisterUser {
  patients: Patient[]
  LinkRequests: any
}
