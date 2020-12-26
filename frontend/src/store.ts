import { writable } from 'svelte/store'

export const settingsOpen = false
export const CalibreDB = writable(undefined)

export const notifier = writable(undefined)

export var AppNotifier = undefined

export const SetAppNotifier = (notifier) => {
  AppNotifier = notifier
}

declare function LoadCalibreDB(): Promise<any>

export const loadCalibreDB = () => {
  LoadCalibreDB().then(
    (db) => {
      CalibreDB.set(db)
      AppNotifier.addNotification({
        type: 'success',
        text: `Loaded ${db.Filename} [${db.ID}]`,
        position: 'bottom-right',
        removeAfter: 3000,
      })
    },
    (error) => {
      AppNotifier.addNotification({
        type: 'danger',
        text: error,
        position: 'bottom-right',
        removeAfter: 6000,
      })
    },
  )
}
