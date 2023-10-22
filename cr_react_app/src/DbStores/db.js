let db;

const openRequest = db.open('crDb',1);

openRequest.onupgradeneeded = (e)=>{
    db = e.target.result;
    console.log('running upgrade');
   
    if (!db.objectStoreNames.contains('records')) { // if there's no "records" store
      db.createObjectStore('records', {keyPath: 'id', autoincrement:true}); // create it
    }

}

openRequest.onsuccess = () => {
    let db = openRequest.result;
  
    db.onversionchange = ()=> {
      db.close();
      alert("Database is outdated, please reload the page.")
    };
}


let transactions = db.transactions("records", "readwrite");


