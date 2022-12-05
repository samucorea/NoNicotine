import { CigarDetails, CreateCigarDetails } from '../models/CigarDetails'
import BaseCrudService from './baseCrudService'

export class CigarService extends BaseCrudService<
  CigarDetails,
  CreateCigarDetails
> {
  constructor() {
    super('cigarDetails')
  }
}

const cigarService = new CigarService()

export default cigarService
