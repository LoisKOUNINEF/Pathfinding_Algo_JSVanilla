import { generateQueryConstructor } from '../utils/object.utils.js'
import AStarFinder from '../lib/pathfinding/AStarFinder.js'
import PathFindingGrid from '../lib/pathfinding/Grid.js'

window.AStarFinder = AStarFinder
window.PathFindingGrid = PathFindingGrid

class GridPathFinding {

  constructor() {
    generateQueryConstructor.call(this, ...arguments)
  }

  generateHelperGrid() {
    const {grid: { gridcells, numberRows, numberColumns }} = this
    const helperGrid = []

    for ( let row = 0; row < numberRows; row++ ) {
      const helperRow = []

      for (let col = 0; col < numberColumns; col++) {
        const position = `${row}-${col}`
        const cell = gridcells[ position ]
        helperRow.push(cell.isBlocked ? 1 : 0 )
      }
      helperGrid.push(helperRow)
    }
    return helperGrid
  }
  generateHelperPath() {}
}

export default GridPathFinding
