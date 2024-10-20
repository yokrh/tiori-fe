import BlockType from "./BlockType"

export default {
  [BlockType.TITLE]: { text: "tttt", description : "dddd" },
  [BlockType.SCHEDULE]: {},
  [BlockType.PARTICIPANT]: {},
  [BlockType.SPOT]: {
    title: 'タイトル',
    image: 'https://pbs.twimg.com/profile_images/1786403614988337152/YSZfAX0q_400x400.jpg',
    description: 'あいうえおかきくけこ',
  },
  [BlockType.MOVE]: {
    leaveAt: '11/23 10:00',
    arriveAt: '11/23 17:00',
    moveBy: '列車',
    description: 'あいうえおかきくけこ',
  },
  [BlockType.TEXT]: {},
  [BlockType.IMAGE]: {},
  [BlockType.TEXT_WITH_IMAGE_TOP_LEFT]: {},
  [BlockType.TEXT_WITH_IMAGE_TOP_RIGHT]: {},
  [BlockType.TEXT_WITH_IMAGE_BOTTOM_LEFT]: {},
  [BlockType.TEXT_WITH_IMAGE_BOTTOM_RIGHT]: {},
}
