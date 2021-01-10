import moment from 'moment'
import { saveDB, modalState } from '../../../store'

let editor = {
  title: '',
  data: undefined,
  cell: undefined,
  success: undefined,
  cancel: undefined,
}

export const save = (db, event) => {
  editor.cell.setValue(event.detail.tags)
  editor.success(event.detail.tags)
  console.log('save', editor.cell._cell.row.data, event.detail.tags)
  db.Books[editor.cell._cell.row.data.ID][editor.data] = event.detail.tags
  saveDB(db)
}

export const cancel = (event) => {
  editor.cancel()
}

/*
export const authorEditor = (cell, onRendered, success, cancel) => {
  if (db.Books) {
    let x = Object.values(db.Authors).reduce(
      (set: Set<string>, author: any) => {
        set.add(author.Name)

        return set
      },
      new Set(),
    )
    datalist = [...x]
  }
  modalState.toggle()
  tags = [cell.getValue()]
  editor = { title: 'Author(s)', data: 'Authors', cell, success, cancel }
}
*/

export const tagList = (db): string[] => {
  if (!db.Books) return []

  const x: Iterable<string> = Object.values(db.Books).reduce(
    (set: Set<string>, book: any) => {
      book.Tags?.forEach((element: string) => {
        set.add(element)
      })

      return set
    },
    new Set(),
  )

  return [...x]
}

export const tagEditor = (
  db,
  cell,
  onRendered,
  success,
  cancel,
): HTMLBaseElement => {
  modalState.toggle()
  editor = { title: 'Edit tags', data: 'Tags', cell, success, cancel }

  return null
}

export const dateEditor = function (cell, onRendered, success, cancel) {
  //cell - the cell component for the editable cell
  //onRendered - function to call when the editor has been rendered
  //success - function to call to pass the successfuly updated value to Tabulator
  //cancel - function to call to abort the edit and return to a normal cell

  //create and style input
  var cellValue = moment(cell.getValue(), 'DD/MM/YYYY').format('YYYY-MM-DD')
  var input = document.createElement('input')

  input.setAttribute('type', 'date')

  input.style.padding = '4px'
  input.style.width = '100%'
  input.style.boxSizing = 'border-box'

  input.value = cellValue

  onRendered(function () {
    input.focus()
    input.style.height = '100%'
  })

  function onChange() {
    if (input.value != cellValue) {
      success(moment(input.value, 'YYYY-MM-DD').format('DD/MM/YYYY'))
    } else {
      cancel()
    }
  }

  //submit new value on blur or change    input.addEventListener("blur", onChange);

  //submit new value on enter
  input.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
      onChange()
    }

    if (e.keyCode == 27) {
      cancel()
    }
  })

  return input
}
