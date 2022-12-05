import { BaseEntity } from './BaseEntity'

export interface CreateVapeDetails {
  cartridgeLifespan: number
  unitsPerBox: number
  boxPrice: number
  patientConsumptionMethodsId: string
}

export interface VapeDetails extends BaseEntity {
  cartridgeLifespan: number
  unitsPerBox: number
  boxPrice: number
  patientConsumptionMethodsId: string
}
