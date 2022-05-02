import { generateQueryConstructor } from '../utils/object.utils.js'
import renderEvents from './gridcell/gridcell-events.method.js'

class GridCell {

  constructor() {
    generateQueryConstructor.call(this, ...arguments)
  }

  get position() {
    return `${this.row}|${this.col}`
  }

  render() {
    this.#renderHtmlElement()
    this.#renderHtmlStyling()
    this.#renderAttribute()
    this.renderGridCellDynamics()
    renderEvents.call(this)
  }

  #renderHtmlElement() {
    const {grid: { gridElement } } = this
    const gridCellElement = document.createElement('div')

    gridCellElement.classList.add('gridcell')
    gridCellElement.setAttribute('position', this.position)

    gridElement.append(gridCellElement)
    this.gridCellElement = gridCellElement
  }

  #renderHtmlStyling() {
    const { gridCellElement, grid: { settings: { cellSize, borderSize, borderColor } } } = this

    Object.assign( gridCellElement.style, {
      width: `${ cellSize }px`,
      height: `${ cellSize }px`,
      border: `${ borderSize }px solid ${ borderColor }`
    })

    gridCellElement.setAttribute('draggable', true)
  }

  #renderAttribute() {
    const { grid: { numberColumns, numberRows } } = this

    this.isBlocked = false
    this.isOutCell = this.position === '0|0'
    this.isInCell = this.position === `${ numberRows - 1}|${ numberColumns - 1 }`
  }

  renderGridCellDynamics() {
    this.gridCellElement.classList[ this.isOutCell ? 'add' : 'remove' ]( 'out-cell' )
    this.gridCellElement.classList[ this.isInCell ? 'add' : 'remove' ]( 'in-cell' )
    this.gridCellElement.classList[ this.isBlocked ? 'add' : 'remove' ]( 'blocked' )
  }

  resetCell() {
    this.isInCell = false
    this.isOutCell = false
    this.isBlocked = false

    this.renderGridCellDynamics()
  }

}

export default GridCell
