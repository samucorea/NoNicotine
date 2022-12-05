import { BaseEntity } from './BaseEntity'

export interface CreateHookahDetails {
  daysPerWeek: number
  setupPrice: number
  patientConsumptionMethodsId: string
}
export interface HookahDetails extends BaseEntity {
  daysPerWeek: number
  setupPrice: number
  patientConsumptionMethodsId: string
}
