// import core file system module
const fs = require("fs");
// construct a path that works on all OS
const path = require("path");

const products = [];

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    // access data folder in root project folder
    // store file called products.json
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    //reads entire content of file
    // will either get error or the data
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      // if not an error then reach products from the file we read. JSON is a helper object. Parse takes JSON and gives us back an object or array that we can work with
      if (!err) {
        products = JSON.parse(fileContent);
      }
      // push new product(this) on to products array
      products.push(this);
      // strinify takes JS array and converts into JSON
      fs.writeFile(
        p,
        JSON.stringify(products),
        //callback in case we get an error
        err => {
          console.log(err);
        }
      );
    });
  }

  // cb passes a function into FetchAll that it will execute when it is done. this way we can access the data we need
  static fetchAll(cb) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        //callback with an empty array
        cb([]);
      }

      // it is returned as text so we need JSON.parse
      //callback with the parsed JSON data

      cb(JSON.parse(fileContent));
    });
    return products;
  }
};
