import { Patient } from '../models'
import BaseCrudService from './baseCrudService'

export class PatientService extends BaseCrudService<Patient> {
  constructor() {
    super('patient')
  }
}

const patientService = new PatientService()

export default patientService
