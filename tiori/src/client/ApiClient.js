import axios from 'axios';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.withCredentials = true

/**
 * NOTE: decided to use axios, since 'fetch' doesn't support useful redirect handling when Oauth.
 */
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

    console.log('GET url:', url)
    return axios.get(url, { headers })
    .then((res) => {
      console.log("DEBUG GET then", res)
      return res.data
    })
    .catch((err) => {
      console.log("DEBUG GET catch", err)
      console.error(err)
    })
  }

  async post(path, header, requestBody) {
    const url = `${this.baseUrl}${path}`
    let headers = {
      'Content-Type': 'application/json',
    }
    if (header) headers = Object.assign(headers, header)
      
    console.log('POST url:', url, requestBody)
    return axios.post(url, JSON.stringify(requestBody), { headers })
    .then((res) => {
      console.log("DEBUG POST then", res)
      return res.data
    })
    .catch((err) => {
      console.log("DEBUG POST catch", err)
      console.error(err)
    })
  }

  async put(path, header, requestBody) {
    const url = `${this.baseUrl}${path}`
    let headers = {
      'Content-Type': 'application/json',
    }
    if (header) headers = Object.assign(headers, header)

    console.log('PUT url:', url, requestBody)
    return axios.put(url, JSON.stringify(requestBody), { headers })
    .then((res) => {
      return res.data
    })
    .catch((err) => { console.error(err) })
  }

  async delete(path, header, queryParams) {
    const query = new URLSearchParams(queryParams)
    const url = `${this.baseUrl}${path}?${query}`
    let headers = {}
    if (header) headers = Object.assign(headers, header)

    console.log('DELETE url:', url)
    return axios.delete(url, { headers })
    .then((res) => {
      return res.data
    })
    .catch((err) => { console.error(err) })
  }
}
