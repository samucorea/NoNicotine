import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { Patient } from '../models'
import { BaseEntity } from '../models/BaseEntity'
import apiRoute from '../utils/apiRoute'

export default class BaseCrudService<T extends BaseEntity, RegisterT = T> {
  apiController: string
  fullRoute: string
  static config: AxiosRequestConfig = {}

  constructor(apiController: string) {
    this.apiController = apiController
    this.fullRoute = apiRoute + this.apiController
    BaseCrudService.UpdateConfig()
  }

  static async UpdateConfig() {
    await AsyncStorage.getItem('token').then((value) => {
      BaseCrudService.config = { headers: { Authorization: `Bearer ${value}` } }
    })
  }

  async getAll() {
    return await axios.get<T[]>(`${this.fullRoute}`, BaseCrudService.config)
  }

  async getById(id: number) {
    return await axios.get<T>(`${this.fullRoute}/${id}`, BaseCrudService.config)
  }

  async create(data: RegisterT | FormData) {
    return await axios.post<Patient>(
      `${this.fullRoute}`,
      data,
      BaseCrudService.config
    )
  }

  async update(id: number, data: T | FormData) {
    return await axios.put(
      `${this.fullRoute}/${id}`,
      data,
      BaseCrudService.config
    )
  }
}
