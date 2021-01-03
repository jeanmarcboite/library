import localforage from 'localforage'
import { writable, Writable } from 'svelte/store'

export const calibreDBTab = writable(true)
export const groupByAuthors = writable(true)

function createFontSize(initialValue: number) {
  const { subscribe, set, update } = writable(initialValue)

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

export const fontSize = createFontSize(12)
