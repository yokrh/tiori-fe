import ApiClient from "./ApiClient"

const HEADER_X_TIORI_USER = 'X-Tiori-User'

export default class BffClient extends ApiClient {
  constructor() {
    super({ baseUrl: import.meta.env.VITE_BFF_BASE_URL })
  }

  static get HEADER_X_TIORI_USER() {
    return HEADER_X_TIORI_USER
  }

  /** Customer */
  async createCustomer(requestBody) {
    const path = '/v1/customer'
    const header = {}
    const res = await this.post(path, header, requestBody)
    return res.body
  }

  /** Shiori List */
  async getShioriList(uid) {
    const path = '/v1/shiori/list'
    const header = { [BffClient.HEADER_X_TIORI_USER]: uid }
    const res = await this.get(path, header, {})
    return res.body
  }

  /** Shiori */
  async getShiori(uid, shioriId) {
    const path = `/v1/shiori/${shioriId}`
    const header = { [BffClient.HEADER_X_TIORI_USER]: uid }
    const res = await this.get(path, header, {})
    return res.body
  }
  async createShiori(uid, requestBody) {
    const path = '/v1/shiori'
    const header = { [BffClient.HEADER_X_TIORI_USER]: uid }
    const res = await this.post(path, header, requestBody)
    return res.body
  }
  async updateShiori(uid, shioriId, requestBody) {
    const path = `/v1/shiori/${shioriId}`
    const header = { [BffClient.HEADER_X_TIORI_USER]: uid }
    const res = await this.put(path, header, requestBody)
    return res.body
  }
  async deleteShiori(uid, shioriId) {
    const path = `/v1/shiori/${shioriId}`
    const header = { [BffClient.HEADER_X_TIORI_USER]: uid }
    const res = await this.delete(path, header)
    return res.body
  }

  /** Page */
  async getPage(uid, pageId) {
    const path = `/v1/page/${pageId}`
    const header = { [BffClient.HEADER_X_TIORI_USER]: uid }
    const res = await this.get(path, header, {})
    return res.body
  }
  async createPage(uid, requestBody) {
    const path = '/v1/page'
    const header = { [BffClient.HEADER_X_TIORI_USER]: uid }
    const res = await this.post(path, header, requestBody)
    return res.body
  }
  async updatePage(uid, pageId, requestBody) {
    const path = `/v1/page/${pageId}`
    const header = { [BffClient.HEADER_X_TIORI_USER]: uid }
    const res = await this.put(path, header, requestBody)
    return res.body
  }
  async deletePage(uid, pageId) {
    const path = `/v1/page/${pageId}`
    const header = { [BffClient.HEADER_X_TIORI_USER]: uid }
    const res = await this.delete(path, header)
    return res.body
  }

  /** Block */
  async getBlock(uid, blockId) {
    const path = `/v1/block/${blockId}`
    const header = { [BffClient.HEADER_X_TIORI_USER]: uid }
    const res = await this.get(path, header, {})
    return res.body
  }
  async createBlock(uid, requestBody) {
    const path = '/v1/block'
    const header = { [BffClient.HEADER_X_TIORI_USER]: uid }
    const res = await this.post(path, header, requestBody)
    return res.body
  }
  async updateBlock(uid, blockId, requestBody) {
    const path = `/v1/block/${blockId}`
    const header = { [BffClient.HEADER_X_TIORI_USER]: uid }
    const res = await this.put(path, header, requestBody)
    return res.body
  }
  async deleteBlock(uid, blockId) {
    const path = `/v1/block/${blockId}`
    const header = { [BffClient.HEADER_X_TIORI_USER]: uid }
    const res = await this.delete(path, header)
    return res.body
  }
}
