import { writable } from 'svelte/store'
import localforage from 'localforage'

export const settingsOpen = false
export const CalibreDB = writable(undefined)

export const notifier = writable(undefined)

export var AppNotifier = undefined

export const SetAppNotifier = (notifier) => {
  AppNotifier = notifier
}

declare function SelectCalibreDB(): Promise<any>
declare function LoadCalibreDB(filename: string): Promise<any>

export const setDB = (db) => {
  console.log('Set db: ', db.Books[1].Title, db)
  CalibreDB.set(db)

  localforage.setItem('CalibreDB', db.Filename)
  localforage.setItem('db', JSON.stringify(db))
  AppNotifier.notify({
    type: 'success',
    text: `Loaded ${db.Filename} [${db.ID}]`,
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
          setDB(JSON.parse(value))
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
