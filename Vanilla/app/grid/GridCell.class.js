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
    this.isBlocked = false
  }

  #renderHtml() {
    const { gridCellElement, grid: { settings: { cellSize, borderSize, borderColor } } } = this

    Object.assign( gridCellElement.style, {
      width: `${ cellSize }px`,
      height: `${ cellSize }px`,
      border: `${ borderSize }px solid ${ borderColor }`
    })
  }

  #renderOutInCells() {}

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
