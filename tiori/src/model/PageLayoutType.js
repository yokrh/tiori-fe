const _SIMPLE_100 = 'SIMPLE_100'
const _SIMPLE_50_50 = 'SIMPLE_50_50'
const _SIMPLE_30_70 = 'SIMPLE_30_70'
const _SIMPLE_70_30 = 'SIMPLE_70_30'
const ENUM_LIST = [
  _SIMPLE_100,
  _SIMPLE_50_50,
  _SIMPLE_30_70,
  _SIMPLE_70_30,
]

export default class PageLayoutType {
  static get SIMPLE_100() { return _SIMPLE_100 }
  static get SIMPLE_50_50() { return _SIMPLE_50_50 }
  static get SIMPLE_30_70() { return _SIMPLE_30_70 }
  static get SIMPLE_70_30() { return _SIMPLE_70_30 }

  static of(str) {
    const filtered = ENUM_LIST.filter(e => e == str)
    if (filtered.length > 0) return filtered[0]
    return this.SIMPLE_100
  }
}
