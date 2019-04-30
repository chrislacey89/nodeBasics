const path = require("path");

//main module refers to the main file we use to start the application. app.js in in this case
module.exports = path.dirname(process.mainModule.filename);
