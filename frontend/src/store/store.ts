import localforage from 'localforage'
import { writable, Writable } from 'svelte/store'

interface FWritable<T> extends Writable<T> {}

function fwritable<T>(key: string, value: T): FWritable<T> {
  let fw: FWritable<T> = writable<T>(value)

  let getItem = localforage.getItem(key)

  if (getItem) {
    getItem.then((value: T) => {
      if (value != null) {
        fw.set(value)
      }
      fw.subscribe((value: T) => {
        localforage.setItem(key, value)
      })
    })
  } else {
    fw.subscribe((value: T) => {
      localforage.setItem(key, value)
    })
  }

  return fw
}

function intwritable(
  key: string,
  initialValue: number,
  minValue: number,
  maxValue?: number,
) {
  let value = initialValue > minValue ? initialValue : minValue
  if (maxValue && value > maxValue) {
    value = maxValue
  }

  const { subscribe, set, update } = fwritable(key, value)

  return {
    subscribe,
    set,
    update,
    increment: () => update((n) => n + 1),
    decrement: () =>
      update((n) => {
        if (n <= minValue) {
          return minValue
        }
        return n - 1
      }),
    reset: () => set(initialValue),
  }
}

const notifier = writable(undefined)

var AppNotifier = undefined

const SetAppNotifier = (notifier) => {
  AppNotifier = notifier
}

export { fwritable, intwritable, notifier, AppNotifier, SetAppNotifier }
