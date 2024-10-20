const _USER_NAME_INPUT = 'USER_NAME_INPUT'
const _JSESSION_ID = 'JSESSIONID'
const ENUM_LIST = [
  _USER_NAME_INPUT,
  _JSESSION_ID,
]

export default class CookieKey {
  static get USER_NAME_INPUT() { return _USER_NAME_INPUT }
  static get JSESSION_ID() { return _JSESSION_ID }

  static of(str) {
    const filtered = ENUM_LIST.filter(e => e == str)
    if (filtered.length > 0) return filtered[0]
    return null
  }
}
