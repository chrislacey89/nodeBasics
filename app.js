const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// set any values globally on our app configuration
// tell express that we want to complile dynamic templates with pug engine
app.set("view engine", "pug");
//tell express wehre we want to compile them
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//registers a middleware. It parses bodies sent through a form. then it calls next to go on to the next function
app.use(bodyParser.urlencoded({ extended: false }));
// allows use of static files
app.use(express.static(path.join(__dirname, "public")));

// admin is a filter. Only paths with /admin goes to adminRouts file

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
``;
