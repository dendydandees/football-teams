import './idb.js'

const dbPromised =  idb.open('teams-favorite', 1, upgradeDb => {
  if (!upgradeDb.objectStoreNames.contains('teams')) {
        upgradeDb.createObjectStore("teams");
    }
})

const saveTeam = ({ id, logo, name, venue }) => {
  dbPromised
    .then((db) => {
      let transaction = db.transaction('teams', 'readwrite')
      let store = transaction.objectStore('teams')
      let item = {
        id: id,
        logo: logo,
        name: name,
        venue: venue,
        created: new Date().getTime(),
      }
      store.put(item, id)

      console.log(item)

      return transaction.complete
    })
    .then(() => {
      console.log('Team Favorite berhasil di simpan.')
    })
    .catch(() => {
      console.log('Gagal Menyimpan Team')
    })
}

const getSavedTeam = () => {
  return dbPromised
    .then((db) => {
      let transaction = db.transaction('teams', 'readonly')
      let store = transaction.objectStore('teams')

      return store.getAll()
    })
    .then((data) => data)
}

const deleteSavedTeam = (id) => {
  return dbPromised
    .then((db) => {
      let transaction = db.transaction('teams', 'readwrite')
      let store = transaction.objectStore('teams')
      store.delete(id)
      return transaction.complete
    })
    .then(() => console.log('Item Deleted'))
}

export default {
  saveTeam,
  getSavedTeam,
  deleteSavedTeam
}
