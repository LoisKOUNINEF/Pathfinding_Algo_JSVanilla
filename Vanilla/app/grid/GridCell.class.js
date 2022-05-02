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
    this.renderOutInCells()
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
    this.isOutCell = this.position === '0|0'
    this.isInCell = this.position === `${ numberRows - 1}|${ numberColumns - 1 }`
  }

  #renderHtml() {
    const { gridCellElement, grid: { settings: { cellSize, borderSize, borderColor } } } = this

    Object.assign( gridCellElement.style, {
      width: `${ cellSize }px`,
      height: `${ cellSize }px`,
      border: `${ borderSize }px solid ${ borderColor }`
    })

    gridCellElement.setAttribute('draggable', true)
  }

  renderOutInCells() {
    this.gridCellElement.classList[ this.isOutCell ? 'add' : 'remove' ]( 'out-cell' )
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
      if (this.isOutCell || this.isInCell ) return
        this.isBlocked = !this.isBlocked
      this.renderBlockedCells()
    })
  }

  #renderHoverEvent() {
    const { gridCellElement } = this

    gridCellElement.addEventListener( 'mouseover', _ => {
      if (this.isOutCell || this.isInCell ) {
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
    const { gridCellElement, grid } = this

    gridCellElement.addEventListener('dragover', event => {
      if ( dontAllowDrop.call( this ) ) return
        event.preventDefault()
    })

    gridCellElement.addEventListener('dragstart', event => {
      if ( dontAllowDrag.call( this ) ) {
        event.preventDefault()
        return
      }
      grid.draggedGridCell = this
    })

    gridCellElement.addEventListener('drop', _ => {
      this.resetCell()

      this.isOutCell = grid.draggedGridCell.isOutCell
      this.isInCell = grid.draggedGridCell.isInCell

      this.renderOutInCells()

      grid.draggedGridCell.resetCell()
      // grid.draw()
    })

    function dontAllowDrop() {
      const { gridCellElement, grid } = this

      if ( grid.draggedGridCell.gridCellElement === gridCellElement ) return true
      if ( grid.draggedGridCell.isOutCell && this.isInCell ) return true
      if ( grid.draggedGridCell.isInCell && this.isOutCell ) return true

      return false
    }

    function dontAllowDrag() {
      return ( !this.isOutCell && !this.isInCell )
    }

  }

  resetCell() {
    this.isInCell = false
    this.isOutCell = false
    this.isBlocked = false

    this.renderOutInCells()
    this.renderBlockedCells()
  }

}

export default GridCell
