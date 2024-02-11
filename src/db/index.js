/* eslint-disable no-lonely-if */
/* eslint-disable prefer-const */
let db;
let dbNamespace;

const setupDB = namespace => {
  return new Promise((resolve, reject) => {
    if (namespace) {
      if (namespace !== dbNamespace) {
        db = null;
      }
      dbNamespace = namespace;
      if (db) {
        resolve();
        return;
      }

      const dbName = namespace === "" ? "myDatabase" : namespace;
      const dbReq = indexedDB.open(dbName, 3);

      dbReq.onupgradeneeded = event => {
        db = event.target.result;

        let issuesStore;
        if (!db.objectStoreNames.contains("person")) {
          issuesStore = db.createObjectStore("person", {
            autoIncrement: true
          });
        } else {
          issuesStore = dbReq.transaction.objectStore("person");
        }
        if (!issuesStore.indexNames.contains("personIndex")) {
          issuesStore.createIndex(
            "personIndex",
            "email",
            {
              unique: true
            }
          );
        }
        if (!issuesStore.indexNames.contains("personNameSurnameIndex")) {
          issuesStore.createIndex(
            "personNameSurnameIndex",
            ["name", "surname"],
            {
              unique: false
            }
          );
        }
      };

      dbReq.onsuccess = event => {
        db = event.target.result;
        resolve();
      };

      dbReq.onerror = event => {
        reject(new Error(`error opening database ${event.target.errorCode}`));
      };
    } else reject(new Error(`namespace undefined`));
  });
};

const addPersons = async (persons) => {
    const tx = db.transaction(["person"], "readwrite");
    const store = tx.objectStore("person");
  
    return new Promise((resolve, reject) => {
      persons.forEach(person => {
        store.add(person);
      });
      tx.oncomplete = resolve;
      tx.onerror = event => {
        reject(
          new Error(
            `error storing person ${event.target.errorCode}`
          )
        );
      };
    });
  };

  function getKey(person) {
    return `${person.name}####${person.surname}`;
}

  const delPersons = (persons, reverseOrder) => {
    return new Promise((resolve, reject) => {
      if (db) {
        const tx = db.transaction(["person"], "readwrite");
  
        const store = tx.objectStore("person");
        const index = store.index("personNameSurnameIndex");
        const query = null;
        const req = index.openCursor(query);

        const kk =persons.map(person => {
          return getKey(person);
        });
  
        req.onsuccess = event => {
          const cursor = event.target.result;
  
          if (cursor != null) {
            if(kk.indexOf(getKey({name: cursor.key[0], surname: cursor.key[1]})) !== -1){
              store.delete(cursor.primaryKey);
            }
            cursor.continue();
          } 
        };
  
        req.onerror = event => {
          reject(new Error(`error in cursor request ${event.target.errorCode}`));
        };
      } else {
        resolve([]);
      }
    });
  };
  
export {
  setupDB,
  addPersons,
  delPersons
};
    

