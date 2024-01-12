# Change Record Forms (Electron + React)

This is a simple application that logs change requests submitted by the user. The app is built with Electron and React and uses indexedDB to store data. This can be packaged to a desktop standalone application.


# Instructions to Deploy
## React Frontend: 
- npm start

The app runs on localhost:3000.
## Desktop app:
### Dev mode: 
- From cr_desktop root folder: npm start
- From cr_react_app: npm start
### Packaging
- From cr_react_app: npm run build
- Once the app is built, from the cr_desktop root folder: npm run start


# References
- https://legacy.reactjs.org/docs/thinking-in-react.html
- https://www.taniarascia.com/getting-started-with-react/
- https://legacy.reactjs.org/docs/getting-started.html#learn-react
- https://www.youtube.com/watch?v=QFaFIcGhPoM&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3
- https://www.freecodecamp.org/news/how-indexeddb-works-for-beginners/
- https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
- https://www.javatpoint.com/javascript-indexeddb
- https://dev.to/esponges/indexeddb-your-offline-and-serverless-db-in-your-browser-with-react-3hm7 
- https://medium.com/@willikay11/how-to-link-your-react-application-with-google-drive-api-v3-list-and-search-files-2e4e036291b7
- https://medium.com/@yukthihettiarachchissck/getting-started-with-google-maps-api-in-react-js-1390b19d18f0
- https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow

## Known Bugs
- The build file generated by react uses relative imports incorrectly. The index.html file at this point is manually edited to point to relative import (href, src, ...)
