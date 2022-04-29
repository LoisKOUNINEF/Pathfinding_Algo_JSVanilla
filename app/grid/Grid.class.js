import { generateQueryConstructor } from '../utils/object.utils.js'

class Grid {
  constructor() {
    generateQueryConstructor.call(this, ...arguments)
  }
  get gridElement() {
    return document.querySelector( this.settings.gridSelector )
  }
  build() {
    this.#buildGridLayout()
    this.#buildGridCells()
    this.#buildGridSvg()
  }
    #buildGridLayout() {
      const { settings, gridElement } = this
      const { cellSize, borderSize, borderColor } = settings
      console.log(settings, gridElement)
    }
    #buildGridCells() {}
    #buildGridSvg() {}

  draw() {}
}

export default Grid
