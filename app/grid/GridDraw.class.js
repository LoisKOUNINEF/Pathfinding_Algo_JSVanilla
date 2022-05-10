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

  draw() {
    const { outCell, inCell, grid, grid: { svgElement } } = this
    const gridPathFinding = new GridPathFinding({ grid, outCell, inCell })

    this.helperPath = gridPathFinding.generateHelperPath()

    const pathElement = svgElement.querySelector('path')
    pathElement.setAttribute('d', this.buildPath() )
  }
  buildPath() {
    return 'M50 15 h100 v100 h50 v-50 h-20'
  }
}

export default GridDraw
