export const authorSorter = function (
  a,
  b,
  aRow,
  bRow,
  column,
  dir,
  sorterParams,
) {
  //a, b - the two values being compared
  //aRow, bRow - the row components for the values being compared (useful if you need to access additional fields in the row data for the sort)
  //column - the column component for the column being sorted
  //dir - the direction of the sort ("asc" or "desc")
  //sorterParams - sorterParams object from column definition array
  //console.log(a, b, aRow, bRow, column, dir, sorterParams);
  let as = aRow._row.data.AuthorSort
  let bs = bRow._row.data.AuthorSort

  return as.toLowerCase().localeCompare(bs.toLowerCase())
}

export const titleSorter = function (
  a,
  b,
  aRow,
  bRow,
  column,
  dir,
  sorterParams,
) {
  return a.toLowerCase().localeCompare(b.toLowerCase())
}
