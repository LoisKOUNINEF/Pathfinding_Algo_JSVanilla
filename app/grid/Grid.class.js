import { generateQueryConstructor } from '../utils/object.utils.js'
import GridCell from './GridCell.class.js'
import GridDraw from './GridDraw.class.js'

class Grid {

  constructor() {
    generateQueryConstructor.call(this, ...arguments)
  }

  get gridElement() {
    return document.querySelector( this.settings.gridSelector )
  }

  get svgElement() {
    return document.querySelector( this.settings.svgElement )
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

  #buildGridCells() {
    const { numberRows, numberColumns } = this
    this.gridcells = {}

    for ( let row = 0; row < numberRows; row++ ) {
      for ( let col = 0; col < numberColumns; col++ ) {
        const gridcell = new GridCell({ grid: this, row, col })
        gridcell.render()

        this.gridcells[ gridcell.position ] = gridcell
      }
    }
  }

  #buildGridSvg() {
    const { svgElement, gridWidth, gridHeight, gridMarginX, gridMarginY } = this

    Object.assign( svgElement.style, {
      width: `${ gridWidth }px`,
      height: `${ gridHeight }px`,
      left: `${ gridMarginX }px`,
      top: `${gridMarginY }px`,
    })
    svgElement.setAttribute( 'viewbox', `0 0 ${ gridWidth } ${ gridHeight }` )
  }

  draw() {
    const gridDraw = new GridDraw({ grid: this })
    gridDraw.draw()
  }
}

export default Grid
