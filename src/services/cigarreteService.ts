import {
  CigarreteDetails,
  CreateCigarreteDetails,
} from '../models/CigarreteDetails'
import BaseCrudService from './baseCrudService'

export class CigarreteService extends BaseCrudService<
  CigarreteDetails,
  CreateCigarreteDetails
> {
  constructor() {
    super('cigarreteDetails')
  }
}

const cigarreteService = new CigarreteService()

export default cigarreteService
