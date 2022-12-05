import axios from 'axios'
import { ConsumptionExpenses, Patient } from '../models'
import { RegisterPatient } from '../models/Patient'
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
    console.log(BaseCrudService.config)

    return await axios.get<ConsumptionExpenses>(
      `${this.fullRoute}/consumptionExpenses`,
      BaseCrudService.config
    )
  }

  async getConsumptionMethods() {
    return await axios.get<Patient>(
      `${this.fullRoute}/consumptionExpenses`,
      BaseCrudService.config
    )
  }
}

const patientService = new PatientService()

export default patientService
