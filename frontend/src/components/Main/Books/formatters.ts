export const StringArrayFormatter = (field: string) => {
  return function (cell) {
    if (!cell || !cell._cell) return ''
    const value = cell._cell.row.data[field]
    if (!value) return ''
    if (Array.isArray(value)) {
      return value.map((p) => p.Name).toString()
    }
    return value
  }
}
