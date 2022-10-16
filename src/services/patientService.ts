import { Patient } from '../models'
import { RegisterPatient } from '../models/Patient'
import BaseCrudService from './baseCrudService'

export class PatientService extends BaseCrudService<Patient, RegisterPatient> {
  constructor() {
    super('patients')
  }
}

const patientService = new PatientService()

export default patientService
