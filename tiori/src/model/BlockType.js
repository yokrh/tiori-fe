const _TITLE = 'TITLE'
const _SCHEDULE = 'SCHEDULE'
const _PARTICIPANT = 'PARTICIPANT'
const _SPOT = 'SPOT'
const _MOVE = 'MOVE'
const _TEXT = 'TEXT'
const _IMAGE = 'IMAGE'
const _TEXT_WITH_IMAGE_TOP_LEFT = 'TEXT_WITH_IMAGE_TOP_LEFT'
const _TEXT_WITH_IMAGE_TOP_RIGHT = 'TEXT_WITH_IMAGE_TOP_RIGHT'
const _TEXT_WITH_IMAGE_BOTTOM_LEFT = 'TEXT_WITH_IMAGE_BOTTOM_LEFT'
const _TEXT_WITH_IMAGE_BOTTOM_RIGHT = 'TEXT_WITH_IMAGE_BOTTOM_RIGHT'

const ENUM_LIST = [
  _TITLE,
  // _SCHEDULE,
  // _PARTICIPANT,
  _SPOT,
  _MOVE,
  // _TEXT,
  // _IMAGE,
  // _TEXT_WITH_IMAGE_TOP_LEFT,
  // _TEXT_WITH_IMAGE_TOP_RIGHT,
  // _TEXT_WITH_IMAGE_BOTTOM_LEFT,
  // _TEXT_WITH_IMAGE_BOTTOM_RIGHT,
]

export default class BlockType {
  static get TITLE() { return _TITLE }
  static get SCHEDULE() { return _SCHEDULE }
  static get PARTICIPANT() { return _PARTICIPANT }
  static get SPOT() { return _SPOT }
  static get MOVE() { return _MOVE }
  static get TEXT() { return _TEXT }
  static get IMAGE() { return _IMAGE }
  static get TEXT_WITH_IMAGE_TOP_LEFT() { return _TEXT_WITH_IMAGE_TOP_LEFT }
  static get TEXT_WITH_IMAGE_TOP_RIGHT() { return _TEXT_WITH_IMAGE_TOP_RIGHT }
  static get TEXT_WITH_IMAGE_BOTTOM_LEFT() { return _TEXT_WITH_IMAGE_BOTTOM_LEFT }
  static get TEXT_WITH_IMAGE_BOTTOM_RIGHT() { return _TEXT_WITH_IMAGE_BOTTOM_RIGHT }

  static of(str) {
    const filtered = ENUM_LIST.filter(e => e == str)
    if (filtered.length > 0) return filtered[0]
    return this.TEXT
  }
}
