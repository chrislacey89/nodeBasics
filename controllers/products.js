const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  // create a new product based on the info passed into the form using the product class template from models folder
  const product = new Product(req.body.title);
  // use save function found in product class
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  // use save function found in product class. Returns products array
  // products coorisponds to the cb in models/product.js
  Product.fetchAll(products => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};
