import ApiClient from "./ApiClient"

const HEADER_X_TIORI_USER = 'X-Tiori-User'

export default class BffClient extends ApiClient {
  constructor() {
    super({ baseUrl: import.meta.env.VITE_BFF_BASE_URL })
  }

  static get HEADER_X_TIORI_USER() {
    return HEADER_X_TIORI_USER
  }

  async createCustomer(requestBody) {
    const path = '/v1/customer'
    const header = {}
    const res = await this.post(path, header, requestBody)
    return res.body
  }

  async getShioriList(uid) {
    const path = '/v1/shiori/list'
    const header = { [BffClient.HEADER_X_TIORI_USER]: uid }
    const res = await this.get(path, header, {})
    return res.body
  }

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
}
