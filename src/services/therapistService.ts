import axios from 'axios'
import { Patient } from '../models'
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
      headers: {
        Authorization: `Bearer ${bearer} `,
      },
    })
  }

  async getPatients() {
    const response = await axios.get<Patient[]>(
      `${this.fullRoute}/patients`,
      BaseCrudService.config
    )

    return response
  }
}

const therapistService = new TherapistService()

export default therapistService
