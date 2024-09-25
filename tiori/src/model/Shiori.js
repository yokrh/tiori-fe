import Page from "./Page"

export default class Shiori {
  constructor({
    id,
    title,
    pageList,
  }) {
    this.id = id
    this.title = title
    this.pageList = pageList.map(p => new Page(p))
  }
}
