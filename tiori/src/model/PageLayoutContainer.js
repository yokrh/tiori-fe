import PageLayout from "./PageLayout"

export default class PageLayoutContainer {
  constructor({
    list,
  }) {
    this.list = list.map(p => new PageLayout(p))
  }
}
