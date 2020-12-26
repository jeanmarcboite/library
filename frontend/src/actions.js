import { CalibreDB } from './store'
// import { getNotificationsContext } from 'svelte-notifications'
// const { addNotification } = getNotificationsContext()

import { AppNotifier } from './store'

export const loadCalibreDB = () => {
  LoadCalibreDB().then(
    (db) => {
      CalibreDB.set(db)
      AppNotifier.notify({
        type: 'success',
        text: `Loaded ${db.Filename} [${db.ID}]`,
        position: 'bottom-right',
        removeAfter: 3000,
      })
    },
    (error) => {
      AppNotifier.notify({
        type: 'danger',
        text: error,
        position: 'bottom-right',
        removeAfter: 6000,
      })
    },
  )
}
