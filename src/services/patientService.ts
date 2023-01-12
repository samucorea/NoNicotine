import axios from 'axios'
import { ConsumptionExpenses, Patient } from '../models'
import { ConsumptionMethods } from '../models/ConsumptionMethods'
import { CreateHabitDetails, Habit } from '../models/Habit'
import { RegisterPatient } from '../models/Patient'
import { Sex } from '../sharedTypes'
import apiRoute from '../utils/apiRoute'
import BaseCrudService from './baseCrudService'

export class PatientService extends BaseCrudService<Patient, RegisterPatient> {
  constructor() {
    super('patients')
  }

  async getCurrentPatient(bearer: string) {
    return await axios.get<Patient>(`${this.fullRoute}`, {
      headers: {
        Authorization: `Bearer ${bearer} `,
      },
    })
  }

  async getConsumptionExpenses() {
    console.log(BaseCrudService.config.headers)

    return await axios.get<ConsumptionExpenses>(
      `${this.fullRoute}/consumptionExpenses`,
      BaseCrudService.config
    )
  }

  async getConsumptionMethods(consumptionMethodsId: string) {
    return await axios.get<ConsumptionMethods>(
      `${apiRoute}/patientConsumptionMethods/${consumptionMethodsId}`,
      BaseCrudService.config
    )
  }

  async updatePatient(body: {
    id: string
    name: string
    birthDate: Date
    sex: Sex
  }) {
    const response = await axios.put<Patient>(
      `${this.fullRoute}`,
      body,
      BaseCrudService.config
    )

    return response
  }

  async relapse(userId: string) {
    const response = await axios.put<Patient>(
      `${this.fullRoute}/indicateRelapse`,
      { userId, restartDate: new Date() },
      BaseCrudService.config
    )

    return response
  }

  async addHabit(habit: CreateHabitDetails) {
    const response = await axios.post<CreateHabitDetails>(
      `${this.fullRoute}/habits`,
      habit,
      BaseCrudService.config
    )

    return response
  }

  async getHabits() {
    return await axios.get<Habit>(
      `${this.fullRoute}/habits`,
      BaseCrudService.config
    )
  }
}

const patientService = new PatientService()

export default patientService
