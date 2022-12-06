import axios from 'axios'
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
}

const therapistService = new TherapistService()

export default therapistService
