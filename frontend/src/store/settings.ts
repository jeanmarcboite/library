import localforage from 'localforage'
import { writable, Writable } from 'svelte/store'
import { fwritable, intwritable } from './store'

export const calibreDBTab = fwritable('calibreDBTab', false)
export const groupByAuthors = fwritable('groupByAuthors', true)

function createFontSize(initialValue: number) {
  const { subscribe, set, update } = fwritable('fontSize', initialValue)

  return {
    subscribe,
    set,
    update,
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

export const fontSize = intwritable('fontSize', 12, 8)
