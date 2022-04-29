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
    const { innerWidth, innerHeight } = window

    const fullCellSize = cellSize + borderSize * 2

    this.numberColumns = Math.floor( innerWidth / fullCellSize )
    this.numberRows = Math.floor( innerHeight / fullCellSize )

    this.gridWidth = this.numberColumns * fullCellSize
    this.gridHeight = this.numberRows * fullCellSize

    this.gridMarginX = ( innerWidth - this.gridWidth - borderSize * 2 ) / 2
    this.gridMarginY = ( innerHeight - this.gridHeight - borderSize * 2 ) / 2

    Object.assign( gridElement.style, {
      width: `${ this.gridWidth }px`,
      height: `${ this.gridHeight }px`,
      marginLeft: `${ this.gridMarginX }px`,
      marginTop: `${ this.gridMarginY }px`,
      border: `${ borderSize }px solid ${ borderColor }`
    })
  }

  #buildGridCells() {}
  #buildGridSvg() {}

  draw() {}
}

export default Grid
