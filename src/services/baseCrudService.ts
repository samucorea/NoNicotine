import axios from 'axios'
import { BaseEntity } from '../models/BaseEntity'

export default class BaseCrudService<T extends BaseEntity> {
  apiController: string
  apiRoute = `${process.env.SERVER_HOST}/api/`

  constructor(apiController: string) {
    this.apiController = apiController
  }

  async getAll() {
    return await axios.get<T[]>(`${this.apiRoute + this.apiController}`)
  }

  async getById(id: number) {
    return await axios.get<T>(`${this.apiRoute + this.apiController}/${id}`)
  }

  async create(data: T | FormData) {
    return await axios.post(`${this.apiRoute + this.apiController}`, data)
  }

  async update(id: number, data: T | FormData) {
    return await axios.put(`${this.apiRoute + this.apiController}/${id}`, data)
  }
}
