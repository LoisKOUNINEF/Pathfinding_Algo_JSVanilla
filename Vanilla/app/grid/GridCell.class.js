import { generateQueryConstructor } from '../utils/object.utils.js'

class GridCell {

  constructor() {
    generateQueryConstructor.call(this, ...arguments)
  }

  get position() {
    return `${this.row}|${this.col}`
  }

  get gridCellElement() {
    return document.querySelector(`.gridcell[position="${ this.position }"]`)
  }

  render() {
    this.#renderElement()
    this.#renderGridCell()
    this.#renderHtml()
    this.#renderOutInCells()
    this.#renderEvents()
  }

  #renderElement() {
    const {grid: { gridElement } } = this
    const gridCellElement = document.createElement('div')

    gridCellElement.classList.add('gridcell')
    gridCellElement.setAttribute('position', this.position)

    gridElement.append(gridCellElement)
  }

  #renderGridCell() {
    const { grid: { numberColumns, numberRows } } = this

    this.isBlocked = false
    this.isOutcell = this.position === '0|0'
    this.isInCell = this.position === `${ numberRows - 1}|${ numberColumns - 1 }`
  }

  #renderHtml() {
    const { gridCellElement, grid: { settings: { cellSize, borderSize, borderColor } } } = this

    Object.assign( gridCellElement.style, {
      width: `${ cellSize }px`,
      height: `${ cellSize }px`,
      border: `${ borderSize }px solid ${ borderColor }`
    })
  }

  #renderOutInCells() {
    this.gridCellElement.classList[ this.isOutcell ? 'add' : 'remove' ]( 'out-cell' )
    this.gridCellElement.classList[ this.isInCell ? 'add' : 'remove' ]( 'in-cell' )
  }

  renderBlockedCells() {
    this.gridCellElement.classList[ this.isBlocked ? 'add' : 'remove' ]( 'blocked' )
  }

  #renderEvents() {
    this.#renderClickEvent()
    this.#renderHoverEvent()
    this.#renderDragDropEvent()
  }

  #renderClickEvent() {
    const { gridCellElement } = this

    gridCellElement.addEventListener('click', _ => {
      if (this.isOutcell || this.isInCell ) return
      this.isBlocked = !this.isBlocked
      this.renderBlockedCells()
    })
  }

  #renderHoverEvent() {
    const { gridCellElement } = this

    gridCellElement.addEventListener( 'mouseover', _ => {
      if (this.isOutcell || this.isInCell ) {
        gridCellElement.style.cursor = 'grab'
      }
      else if ( !this.isBlocked ) {
        gridCellElement.style.cursor = 'pointer'
      }
      else {
        gridCellElement.style.cursor = 'crosshair'
      }
    })
  }

  #renderDragDropEvent() {

  }

}

export default GridCell
