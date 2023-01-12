import axios from 'axios'
import { DiaryEntry, Patient } from '../models'
import { RegisterTherapist, Therapist } from '../models/Therapist'
import BaseCrudService from './baseCrudService'

export class TherapistService extends BaseCrudService<
  Therapist,
  RegisterTherapist
> {
  constructor() {
    super('therapists')
  }

  async getCurrentTherapist(bearer: string) {
    return await axios.get<Therapist>(`${this.fullRoute}`, {
      headers: { Authorization: `Bearer ${bearer}` },
    })
  }

  async getPatients() {
    const response = await axios.get<Patient[]>(
      `${this.fullRoute}/patients`,
      await BaseCrudService.GetConfig()
    )

    return response
  }

  async getPatientsEntries(patientId: string) {
    const response = await axios.get<DiaryEntry[]>(
      `${this.fullRoute}/patient/${patientId}/entries`,
      await BaseCrudService.GetConfig()
    )

    return response
  }
}

const therapistService = new TherapistService()

export default therapistService
