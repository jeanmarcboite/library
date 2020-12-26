import FaSearch from 'svelte-icons/fa/FaSearch.svelte'
import FaDatabase from 'svelte-icons/fa/FaDatabase.svelte'
import { loadCalibreDB } from './store'

enum State {
  Active,
  Disable,
  Unimplemented,
}

const quit = () => {}

export const menu = [
  {
    name: 'File',
    menu: [
      {
        name: 'Import EPUB',
        state: State.Active,
        className: 'text-gray-300',
      },
      {
        name: 'Load calibre database...',
        icon: FaDatabase,
        className: 'text-red-300',
        onclick: loadCalibreDB,
      },
      {
        name: 'Exit',
        state: State.Unimplemented,
        onclick: () => quit(),
      },
    ],
  },
  {
    name: 'Edit',
    state: State.Unimplemented,
    className: 'disabled text-red-900',
    menu: [
      {
        name: 'Find',
        className: 'disabled text-red-900',
        icon: FaSearch,
        items: [{ name: 'Python' }, { name: 'Go' }],
      },
    ],
  },
]
