import { DiaryEntry } from '../models'
import BaseCrudService from './baseCrudService'

export class DiaryEntryService extends BaseCrudService<DiaryEntry> {
  constructor() {
    super('diaryEntry')
  }
}

const diaryEntryService = new DiaryEntryService()

export default diaryEntryService
