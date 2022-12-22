import Patient from './Patient'
import User, { RegisterUser } from './User'

export interface Therapist extends User {
  patients: Patient[]
  LinkRequests: any
}

export interface RegisterTherapist extends RegisterUser {}
