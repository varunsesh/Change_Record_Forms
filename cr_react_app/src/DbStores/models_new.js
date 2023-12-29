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
      const changeRecordStore = db.createObjectStore(changeRecordStoreName, { keyPath: "cr_id", autoIncrement: true });
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
  const db = await openDB();
  const transaction = db.transaction(changeRecordStoreName, "readwrite");
  const store = transaction.objectStore(changeRecordStoreName);
  return new Promise((resolve, reject) => {
    const request = store.add(recordData);
    request.onsuccess = () => resolve("Change record added successfully");
    request.onerror = () => reject("Error adding change record");
  });
}

async function getChangeRecords() {
  const db = await openDB();
  const transaction = db.transaction(changeRecordStoreName, "readonly");
  const store = transaction.objectStore(changeRecordStoreName);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error fetching change records");
  });
}

async function updateChangeRecord(recordId, updateData) {
  const db = await openDB();
  const transaction = db.transaction(changeRecordStoreName, "readwrite");
  const store = transaction.objectStore(changeRecordStoreName);
  return new Promise((resolve, reject) => {
    const request = store.put({ ...updateData, cr_id: recordId });
    request.onsuccess = () => resolve("Change record updated successfully");
    request.onerror = () => reject("Error updating change record");
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
