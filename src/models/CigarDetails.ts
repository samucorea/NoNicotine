import { BaseEntity } from './BaseEntity'

export interface CreateCigarDetails {
  unitsPerDay: number
  daysPerWeek: number
  unitsPerBox: number
  boxPrice: number
  patientConsumptionMethodsId: string
}
export interface CigarDetails extends BaseEntity {
  unitsPerDay: number
  daysPerWeek: number
  unitsPerBox: number
  boxPrice: number
  patientConsumptionMethodsId: string
}
