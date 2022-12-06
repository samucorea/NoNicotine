import { DiaryEntry } from './DiaryEntry'
import { Therapist } from './Therapist'
import User, { RegisterUser } from './User'

export default interface Patient extends User {
  startTime: Date
  therapistId?: string
  therapist?: Therapist
  patientConsumptionMethodsId?: string
  patientConsumptionMethods?: PatientConsumptionMethods
  entries?: DiaryEntry[]
  linkRequests?: any
  patientRelapseHistoric?: any
  patientHabits?: any
}

export interface PatientConsumptionMethods {
  patientId: string
  cigaretteDetailsId?: string
  cigaretteDetails?: null
  electronicCigaretteDetailsId?: string
  electronicCigaretteDetails?: null
  cigarDetailsId?: string
  cigarDetails: null
  hookahDetailsId?: string
  hookahDetails: null
  id: string
  createdAt: Date
}

export interface RegisterPatient extends RegisterUser {}
