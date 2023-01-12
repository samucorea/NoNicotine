import { CreateHookahDetails, HookahDetails } from '../models/HookahDetails'
import BaseCrudService from './baseCrudService'

export class HookaService extends BaseCrudService<
  HookahDetails,
  CreateHookahDetails
> {
  constructor() {
    super('hookahDetails')
  }
}

const hookahService = new HookaService()

export default hookahService
