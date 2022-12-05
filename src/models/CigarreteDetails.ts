import { BaseEntity } from './BaseEntity'

export interface CreateCigarreteDetails {
  unitsPerDay: number
  daysPerWeek: number
  unitsPerBox: number
  boxPrice: number
  patientConsumptionMethodsId: string
}

export interface CigarreteDetails extends BaseEntity {
  unitsPerDay: number
  daysPerWeek: number
  unitsPerBox: number
  boxPrice: number
  patientConsumptionMethodsId: string
}
