import { CreateVapeDetails, VapeDetails } from '../models/VapeDetails'
import BaseCrudService from './baseCrudService'

export class VapeService extends BaseCrudService<
  VapeDetails,
  CreateVapeDetails
> {
  constructor() {
    super('electronicElectronicCigarreteDetails')
  }
}

const vapeService = new VapeService()

export default vapeService
