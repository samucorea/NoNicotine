import { BaseEntity } from './BaseEntity'

export interface DiaryEntry extends BaseEntity {
  patientId: string
  therapistAllowed: boolean
  message: string
  createdAt: Date
  symptoms: string[] | string
  feelings: string[] | string
}

export interface CreateDiaryEntry {
  therapistAllowed: boolean
  message: string
  symptoms: string[]
  feelings: string[]
}
