import { writable } from 'svelte/store'
import localforage from 'localforage'

export const settingsOpen = false

const persistable = (key, initialValue) => {
  const { subscribe, set, update } = writable(initialValue)
  let currentValue = initialValue
  localforage.getItem(key).then((value) => {
    currentValue = value
    set(value)
  })

  const Set = (value) => {
    set(value)
    currentValue = value
    localforage.setItem(key, value)
  }

  return {
    subscribe,
    set: Set,
    update: (f) => {
      Set(f(currentValue))
    },
  }
}

export const calibreDBTab = persistable('calibreDBTab', false)
export const groupByAuthors = persistable('groupByAuthors', true)

const ccalibreDBTab = writable(false)
localforage
  .getItem('calibreDBTab')
  .then((value: boolean) => ccalibreDBTab.set(value))
ccalibreDBTab.subscribe((value) => {
  localforage.setItem('calibreDBTab', value)
})

function createFontSize(initialValue: number) {
  const { subscribe, set, update } = writable(initialValue)

  return {
    subscribe,
    increment: () => update((n) => n + 1),
    decrement: () =>
      update((n) => {
        if (n <= 8) {
          return 8
        }
        return n - 1
      }),
    reset: () => set(initialValue),
  }
}

export const fontSize = createFontSize(12)

const store = writable(localStorage.getItem('store') || '')

store.subscribe((val) => localStorage.setItem('store', val))

export const CalibreDB = writable(undefined)

export const notifier = writable(undefined)

export var AppNotifier = undefined

export const SetAppNotifier = (notifier) => {
  AppNotifier = notifier
}

declare function SelectCalibreDB(): Promise<any>
declare function LoadCalibreDB(filename: string): Promise<any>
export const saveDB = (db, message: string = null) => {
  localforage.setItem('db', JSON.stringify(db))
}

export const setDB = (db, message: string = null) => {
  CalibreDB.set(db)

  localforage.setItem('CalibreDB', db.Filename)
  saveDB(db)

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
