export default class ApiClient {
  constructor({
    baseUrl,
  }) {
    this.baseUrl = baseUrl
  }

  async get(path, header, queryParams) {
    const query = new URLSearchParams(queryParams)
    const url = `${this.baseUrl}${path}?${query}`
    let headers = {}
    if (header) headers = Object.assign(headers, header)

    return fetch(url, {
      method: 'GET',
      headers,
    })
    .then((res) => {
      return res.json()
    })
    .catch((err) => { console.error(err) })
  }

  async post(path, header, requestBody) {
    const url = `${this.baseUrl}${path}`
    let headers = { 'Content-Type': 'application/json' }
    if (header) headers = Object.assign(headers, header)

    return fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    })
    .then((res) => {
      return res.json()
    })
    .catch((err) => { console.error(err) })
  }

  async put(path, header, requestBody) {
    const url = `${this.baseUrl}${path}`
    let headers = { 'Content-Type': 'application/json' }
    if (header) headers = Object.assign(headers, header)

    return fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(requestBody),
    })
    .then((res) => {
      return res.json()
    })
    .catch((err) => { console.error(err) })
  }

  async delete(path, header, queryParams) {
    const query = new URLSearchParams(queryParams)
    const url = `${this.baseUrl}${path}?${query}`
    let headers = {}
    if (header) headers = Object.assign(headers, header)

    return fetch(url, {
      method: 'DELETE',
      headers,
    })
    .then((res) => {
      return res.json()
    })
    .catch((err) => { console.error(err) })
  }
}
