import { generateQueryConstructor } from '../utils/object.utils.js'
import AStarFinder from '../lib/pathfinding/AStarFinder.js'
import PathFindingGrid from '../lib/pathfinding/Grid.js'

window.AStarFinder = AStarFinder
window.PathFindingGrid = PathFindingGrid

class GridPathFinding {

  constructor() {
    generateQueryConstructor.call(this, ...arguments)
  }

  generateHelperPath() {

  }

}

export default GridPathFinding
