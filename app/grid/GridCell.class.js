import { generateQueryConstructor } from '../utils/object.utils.js'

class GridCell {

  constructor() {
    generateQueryConstructor.call(this, ...arguments)
  }
  get position() {
    return `${this.row}|${this.col}`
  }
  render() {

  }
}

export default GridCell
