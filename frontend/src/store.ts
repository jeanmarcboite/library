import { writable } from 'svelte/store'

export const settingsOpen = false
export const CalibreDB = writable(undefined)

export const notifier = writable(undefined)

export var AppNotifier = undefined

export const SetAppNotifier = (notifier) => {
  AppNotifier = notifier
}

declare function SelectCalibreDB(): Promise<any>
declare function LoadCalibreDB(filename: string): Promise<any>

const setDB = (db) => {
  CalibreDB.set(db)
  console.log(AppNotifier.ctx)
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

export const loadCalibreDB = (filename: string) => {
  LoadCalibreDB(filename).then(setDB, notifyError)
}
