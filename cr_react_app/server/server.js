const express = require('express');
const path = require('path');
const port = process.argv?.[2] || process.env.PORT || 3000;
const app = express();

// serve static assets normally
app.use(express.static(__dirname + '/dist'));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function(request, response) {
  console.log(request.path);
  
  response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port);
console.log(`started UI dev server : Visit http://localhost:${port}`);
console.log(__dirname);
console.log("__dirname ho ho ho ");