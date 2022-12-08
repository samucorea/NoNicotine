import axios from 'axios'
import BaseCrudService from './baseCrudService'

export default class LinkService extends BaseCrudService<any> {
  constructor() {
    super('Link')
  }

  async makeLinkRequest(therapistUserId: string, patientEmail: string) {
    const response = await axios.post(
      `${this.fullRoute}/Request`,
      {
        therapistUserId,
        patientEmail,
      },
      BaseCrudService.config
    )

    return response
  }
}

export const linkService = new LinkService()
