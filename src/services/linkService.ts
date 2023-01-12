import axios from 'axios'
import { LinkRequest } from '../models/LinkRequest'
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
      await BaseCrudService.GetConfig()
    )

    return response
  }

  async getLinkRequest() {
    const response = await axios.get<LinkRequest>(
      `${this.fullRoute}/Request`,
      await BaseCrudService.GetConfig()
    )

    return response
  }

  async updateLinkRequest(
    approval: boolean,
    userId: string,
    linkRequestId: string
  ) {
    const response = await axios.put<any>(
      `${this.fullRoute}/Request`,
      { userId, linkRequestId, approval },
      await BaseCrudService.GetConfig()
    )

    return response
  }

  async unLink(userId: string, patientId: string) {
    const response = await axios.put<any>(
      `${this.fullRoute}`,
      { userId, patientId },
      await BaseCrudService.GetConfig()
    )

    return response
  }
}

export const linkService = new LinkService()
