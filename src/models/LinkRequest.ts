import Patient from './Patient'
import { Therapist } from './Therapist'

export interface LinkRequest {
  createdAt: Date
  dateAcceptedOrDeclined: Date
  id: string
  patient: Patient
  patientId: string
  requestAccepted: boolean
  therapist: Therapist
  therapistId: string
}
