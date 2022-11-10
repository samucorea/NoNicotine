import axios from 'axios'
import { Patient } from '../models'
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
}

const patientService = new PatientService()

export default patientService
