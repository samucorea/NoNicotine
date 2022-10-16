import { string } from 'yup'

export type Sex = 'M' | 'F'

export type Identification = 'Cédula' | 'Pasaporte'

export interface KeyValue {
  key: string
  value: string
}
