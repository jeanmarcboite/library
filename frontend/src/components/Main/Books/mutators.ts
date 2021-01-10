import { saveDB } from '../../../store'

export const Mutator = (db: any, field: string) => {
  return function (value, data, type, params, component) {
    if (type == 'edit') {
      db.Books[data.ID][field] = value
      saveDB(db)
    }

    return value
  }
}
