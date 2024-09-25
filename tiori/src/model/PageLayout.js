import PageLayoutType from "./PageLayoutType"

export default class PageLayout {
  constructor({
    type,
    blockIdList,
  }) {
    this.type = PageLayoutType.of(type)
    this.blockIdList = blockIdList
  }
}
