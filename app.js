const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//registers a middleware. It parses bodies sent through a form. then it calls next to go on to the next function
app.use(bodyParser.urlencoded({ extended: false }));

// admin is a filter. Only paths with /admin goes to adminRouts file
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
``;
