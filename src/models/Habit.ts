import { BaseEntity } from './BaseEntity'

export interface Habit extends BaseEntity {
  title: string
  days: string[]
  time: Date
}

export interface CreateHabitDetails {
  name: string
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thursday: boolean
  friday: boolean
  saturday: boolean
  sunday: boolean
  hour: string
}

export interface UpdateHabitDetails {
  patientHabitId: string
  userId: string
  hour: string
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thursday: boolean
  friday: boolean
  saturday: boolean
  sunday: boolean
}
