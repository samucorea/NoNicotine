export type Sex = 'M' | 'F'

export type Identification = 'Cédula' | 'Pasaporte'

export interface KeyValue {
  key: string
  value: string | number
}

export interface ModalProps {
  show: boolean
  toggleShow: (value?: boolean) => void
}
