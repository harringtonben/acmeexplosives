"use strict";

console.log("I'm in main js");

const data = require("./data");

data.loadCategoriesJSON();
data.loadTypesJSON();
data.loadProductsJSON();