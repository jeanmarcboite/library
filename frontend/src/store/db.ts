import localforage from 'localforage'
import { writable, Writable } from 'svelte/store'
import { AppNotifier } from './store'

export const CalibreDB = writable(undefined)

declare function SelectCalibreDB(): Promise<any>
declare function LoadCalibreDB(filename: string): Promise<any>
export const saveDB = (db, message: string = null) => {
  localforage.setItem('db', JSON.stringify(db))
}

export const setDB = (db, message: string = null) => {
  CalibreDB.set(db)

  localforage.setItem('CalibreDB', db.Filename)
  saveDB(db)
  console.log(db)

  AppNotifier.notify({
    type: 'success',
    text: message ? message : `Loaded ${db.Filename} [${db.ID}]`,
    position: 'bottom-right',
    removeAfter: 3000,
  })
}

const notifyError = (error) => {
  AppNotifier.notify({
    type: 'danger',
    text: error,
    position: 'bottom-right',
    removeAfter: 6000,
  })
}

export const selectCalibreDB = () => {
  SelectCalibreDB().then(setDB, notifyError)
}

export const loadCalibreDB = (filename: string = null) => {
  if (filename) {
    LoadCalibreDB(filename).then(setDB, notifyError)
  } else {
    localforage
      .getItem('db')
      .then((value: string) => {
        try {
          setDB(JSON.parse(value), 'DB reloaded')
        } catch (e) {
          notifyError(e)
        }
      })
      .catch(() => {
        localforage
          .getItem('CalibreDB')
          .then((value: string) =>
            LoadCalibreDB(value).then(setDB, notifyError),
          )
      })
  }
}
