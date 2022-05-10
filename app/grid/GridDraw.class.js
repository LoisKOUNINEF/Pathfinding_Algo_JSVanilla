import { generateQueryConstructor } from '../utils/object.utils.js'
import GridPathFinding from './GridPathFinding.class.js'

class GridDraw {

  constructor() {
    generateQueryConstructor.call(this, ...arguments)
  }

  get outCell() {
    const gridcells = Object.values( this.grid.gridcells )
    return gridcells.find( gridcell => gridcell.isOutCell )
  }

  get inCell() {
    const gridcells = Object.values( this.grid.gridcells )
    return gridcells.find( gridcell => gridcell.isInCell )
  }

  get pathElement() {
    return svgElement.querySelector( 'path' )
  }

  draw() {
    const { outCell, inCell, grid, grid: { svgElement } } = this
    const gridPathFinding = new GridPathFinding({ grid, outCell, inCell })

    this.helperPath = gridPathFinding.generateHelperPath()
  }
}

export default GridDraw
