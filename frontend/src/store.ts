import { writable } from 'svelte/store'

export const settingsOpen = false
export const CalibreDB = writable(undefined)

export const notifier = writable(undefined)

export var AppNotifier = undefined

export const SetAppNotifier = (notifier) => {
  AppNotifier = notifier
}

declare function SelectCalibreDB(): Promise<any>

export const selectCalibreDB = () => {
  SelectCalibreDB().then(
    (db) => {
      console.log('success')
      CalibreDB.set(db)
    },
    (error) => {
      console.log(error)
    },
  )
}
