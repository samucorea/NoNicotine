import { CreateDiaryEntry, DiaryEntry } from '../models'
import BaseCrudService from './baseCrudService'

export class DiaryEntryService extends BaseCrudService<
  DiaryEntry,
  CreateDiaryEntry
> {
  constructor() {
    super('entries')
  }
}

const diaryEntryService = new DiaryEntryService()

export default diaryEntryService
