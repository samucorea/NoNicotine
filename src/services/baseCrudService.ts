import axios, { AxiosError } from 'axios'
import { Patient } from '../models'
import { BaseEntity } from '../models/BaseEntity'

export default class BaseCrudService<T extends BaseEntity, RegisterT = T> {
  apiController: string
  fullRoute: string
  apiRoute = `${process.env.SERVER_HOST}/api/`

  constructor(apiController: string) {
    this.apiController = apiController
    this.fullRoute = this.apiRoute + this.apiController
  }

  async getAll() {
    return await axios.get<T[]>(`${this.fullRoute}`)
  }

  async getById(id: number) {
    return await axios.get<T>(`${this.fullRoute}/${id}`)
  }

  async create(data: RegisterT | FormData) {
    return await axios.post<Patient>(`${this.fullRoute}`, data)
  }

  async update(id: number, data: T | FormData) {
    return await axios.put(`${this.fullRoute}/${id}`, data)
  }
}
