import Block from "./Block"
import PageLayoutContainer from "./PageLayoutContainer"

export default class Page {
  constructor({
    id,
    layout,
    blockList,
  }) {
    this.id = id
    this.layout = new PageLayoutContainer(layout)
    this.blockList = blockList.map(b => new Block(b))
  }
}
