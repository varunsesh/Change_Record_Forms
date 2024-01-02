const dbName = "CR_DB";
const dbVersion = 5;
const projectStoreName = "projects";
const changeRecordStoreName = "changeRecords";

// Open a connection to the IndexedDB
async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(projectStoreName, { keyPath: "project_id", autoIncrement: true });
      const changeRecordStore = db.createObjectStore(changeRecordStoreName, { autoIncrement: true });
      changeRecordStore.createIndex("project_id", "project_id", { unique: false });
    };

    request.onerror = (event) => {
      reject(`Database error: ${event.target.errorCode}`);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
  });
}

// CRUD for Projects
async function createProject(projectData) {
  const db = await openDB();
  const transaction = db.transaction(projectStoreName, "readwrite");
  const store = transaction.objectStore(projectStoreName);
  return new Promise((resolve, reject) => {
    const request = store.add(projectData);
    request.onsuccess = () => resolve("Project added successfully");
    request.onerror = () => reject("Error adding project");
  });
}

async function getProjects() {
  const db = await openDB();
  const transaction = db.transaction(projectStoreName, "readonly");
  const store = transaction.objectStore(projectStoreName);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error fetching projects");
  });
}

async function updateProject(projectId, updateData) {
  const db = await openDB();
  const transaction = db.transaction(projectStoreName, "readwrite");
  const store = transaction.objectStore(projectStoreName);
  return new Promise((resolve, reject) => {
    const request = store.put({ ...updateData, project_id: projectId });
    request.onsuccess = () => resolve("Project updated successfully");
    request.onerror = () => reject("Error updating project");
  });
}

async function deleteProject(projectId) {
  const db = await openDB();
  const transaction = db.transaction(projectStoreName, "readwrite");
  const store = transaction.objectStore(projectStoreName);
  return new Promise((resolve, reject) => {
    const request = store.delete(projectId);
    request.onsuccess = () => resolve("Project deleted successfully");
    request.onerror = () => reject("Error deleting project");
  });
}

// CRUD for Change Records
async function createChangeRecord(recordData) {
  // Get the highest CR ID for the given project
  const highestCrId = await getHighestCrIdForProject(recordData.project_id);
  
  var crInt = 0;
  if (highestCrId != 0){
    const parts = highestCrId.split('-'); // Split the string at the hyphen
    crInt = parseInt(parts[1]);  
  } 
  const newCrId = crInt + 1;
  
  // Create a composite key (e.g., "project1-1")
  const compoundKey = `${recordData.project_id}-${newCrId}`;
  
  // New record with compound key
  const newRecord = { ...recordData, cr_id: compoundKey };

  const db = await openDB();
  const transaction = db.transaction(changeRecordStoreName, "readwrite");
  const store = transaction.objectStore(changeRecordStoreName);

  return new Promise((resolve, reject) => {
    const request = store.add(newRecord);
    request.onsuccess = () => resolve("Change record added successfully");
    request.onerror = (event) => {
      reject("Error adding change record: " + event.target.error.message);
    };
  });
}


async function getHighestCrIdForProject(projectId) {
  const db = await openDB();
  const transaction = db.transaction(changeRecordStoreName, "readonly");
  const store = transaction.objectStore(changeRecordStoreName);
  const index = store.index("project_id");

  return new Promise((resolve, reject) => {
    let highestCrId = "";
    const request = index.openCursor(IDBKeyRange.only(projectId), "next");

    request.onsuccess = (event) => {
      const cursor = event.target.result;
      
      if (cursor) {
        highestCrId = cursor.value.cr_id;
        cursor.continue();
      } else {
        resolve(highestCrId);
      }
    };

    request.onerror = (event) => {
      reject(`Error in getting highest CR ID: ${event.target.errorCode}`);
    };
  });
}




async function getChangeRecords(projectId) {
  const db = await openDB();
  const transaction = db.transaction(changeRecordStoreName, "readonly");
  const store = transaction.objectStore(changeRecordStoreName);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = (event) => {
      const allRecords = event.target.result;
      // Filter records based on the projectId component of the composite key
      const filteredRecords = allRecords.filter(record => 
        typeof record.cr_id === 'string' && record.cr_id.startsWith(`${projectId}-`)
      );
      resolve(filteredRecords);
    };
    request.onerror = (event) => {
      reject("Error fetching change records: " + event.target.error.message);
    };
  });
}



async function updateChangeRecord(recordId, updateData) {
  const db = await openDB();
  const transaction = db.transaction(changeRecordStoreName, "readwrite");
  const store = transaction.objectStore(changeRecordStoreName);

  return new Promise((resolve, reject) => {
    // Fetch the record first to ensure it exists
    const getRequest = store.get(recordId);

    getRequest.onsuccess = () => {
      if (getRequest.result) {
        // Record exists, update it
        const updatedRecord = { ...getRequest.result, ...updateData };
        const updateRequest = store.put(updatedRecord);

        updateRequest.onsuccess = () => resolve("Change record updated successfully");
        updateRequest.onerror = () => reject("Error updating change record");
      } else {
        reject("Record not found for update");
      }
    };

    getRequest.onerror = () => {
      reject("Error fetching record for update");
    };
  });
}


async function deleteChangeRecord(recordId) {
  const db = await openDB();
  const transaction = db.transaction(changeRecordStoreName, "readwrite");
  const store = transaction.objectStore(changeRecordStoreName);
  return new Promise((resolve, reject) => {
    const request = store.delete(recordId);
    request.onsuccess = () => resolve("Change record deleted successfully");
    request.onerror = () => reject("Error deleting change record");
  });
}

export { createProject, getProjects, updateProject, deleteProject, createChangeRecord, getChangeRecords, updateChangeRecord, deleteChangeRecord };
