import localforage from 'localforage'
import { writable, Writable } from 'svelte/store'

interface FWritable<T> extends Writable<T> {}

function fwritable<T>(key: string, value: T): FWritable<T> {
  let fw: FWritable<T> = writable<T>(value)

  fw.subscribe((value: T) => {
    console.log('setItem', key, value)
    localforage.setItem(key, value)
  })

  return fw
}

const notifier = writable(undefined)

var AppNotifier = undefined

const SetAppNotifier = (notifier) => {
  AppNotifier = notifier
}

export { fwritable, notifier, AppNotifier, SetAppNotifier }
