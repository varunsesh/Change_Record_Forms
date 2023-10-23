
let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 3;
let db_name = 'CR_DB';

export interface User {
  id: string;
  name: string;
  summary: string;
  title:string;
  status: string;
  created_at:Date;
}

export enum Stores {
  Users = 'users',
}

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // open the connection
    request = indexedDB.open(db_name, version);

    request.onupgradeneeded = (e) => {
      console.log("upgrade event called");
      db = e.target.result;
      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(Stores.Users)) {
        console.log('Creating users store');
        db.createObjectStore(Stores.Users, { keyPath: 'id', autoIncrement:true });
      }
      // no need to resolve here
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      version = db.version;
      console.log('request.onsuccess - initDB', version);
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};


export const addData = <T>(storeName: string, data: T): Promise<T|string|null> => {
  return new Promise((resolve) => {
    let id  = null;
    request = indexedDB.open(db_name, version);
    request.onsuccess = () => {
      console.log('request.onsuccess - addData', data);
      db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      tx.oncomplete=event=>resolve(id);
      store.add(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        resolve(error);
      } else {
        resolve('Unknown error');
      }
    };
  });
};


export const getStoreData = <T>(storeName: string): Promise<T[]> => {
  return new Promise((resolve) => {
    request = indexedDB.open(db_name, version);

    request.onsuccess = (e) => {
      console.log('request.onsuccess - getAllData');
      db = e.target.result;
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const res = store.getAll();
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};


export const deleteData = (storeName: string, key: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // again open the connection
    request = indexedDB.open(db_name, version);

    request.onsuccess = (e) => {
      console.log('request.onsuccess - deleteData', key);
      db = e.target.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const res = store.delete(key);

      // add listeners that will resolve the Promise
      res.onsuccess = () => {
        resolve(true);
      };
      res.onerror = () => {
        resolve(false);
      }
    };
  });
};

export const updateStatusData = (key: string, storeName: string, status:string): Promise<boolean> => {
  return new Promise((resolve) => {
    // again open the connection
    request = indexedDB.open(db_name, version);
    
    request.onsuccess = (e) => {
      console.log('request.onsuccess - updateData', key);
      db = e.target.result;
      const tx = db.transaction(storeName, 'readwrite');
      
      const store = tx.objectStore(storeName);
      
      const res = store.get(key);
      res.onsuccess = (e)=>{
        var o, data = e.target.result;
        data.status = status;
        store.put(data);
        resolve(true);
      };
      res.onerror = ()=>{resolve(false);}
      


      // // add listeners that will resolve the Promise
      // res.onsuccess = () => {
      //   resolve(true);
      // };
      // res.onerror = () => {
      //   resolve(false);
      // }
    };
  });
};