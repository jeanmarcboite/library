import { writable } from 'svelte/store'

function createOpenStore(initialValue: boolean) {
  const { subscribe, set, update } = writable(initialValue)

  return {
    subscribe,
    set,
    update,
    open: () => set(true),
    close: () => set(false),
    toggle: () => update((n) => !n),
  }
}

export const modalState = createOpenStore(false)
