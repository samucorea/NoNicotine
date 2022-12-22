import { CigarDetails } from './CigarDetails'
import { DiaryEntry } from './DiaryEntry'
import { HookahDetails } from './HookahDetails'
import { Therapist } from './Therapist'
import User, { RegisterUser } from './User'
import { VapeDetails } from './VapeDetails'
import { CigarreteDetails } from './CigarreteDetails'
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
  cigaretteDetails?: CigarreteDetails
  electronicCigaretteDetails?: VapeDetails
  cigarDetails?: CigarDetails
  hookahDetails?: HookahDetails
}

export interface RegisterPatient extends RegisterUser {}
