import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { AxiosRequestConfig } from 'axios'
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

  static async GetConfig() {
    const token = await AsyncStorage.getItem('token')

    return { headers: { Authorization: `Bearer ${token}` } }
  }

  async getAll() {
    return await axios.get<T[]>(
      `${this.fullRoute}`,
      await BaseCrudService.GetConfig()
    )
  }

  async getById(id: number) {
    return await axios.get<T>(
      `${this.fullRoute}/${id}`,
      await BaseCrudService.GetConfig()
    )
  }

  async create(data: RegisterT | FormData) {
    return await axios.post<RegisterT>(
      `${this.fullRoute}`,
      data,
      await BaseCrudService.GetConfig()
    )
  }

  async update(data: T | FormData, id?: number) {
    let route = this.fullRoute

    if (id) {
      route += '/' + id.toString()
    }

    return await axios.put(route, data, await BaseCrudService.GetConfig())
  }
}
