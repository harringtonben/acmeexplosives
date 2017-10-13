(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
const dom = require("./dom");


const loadCategoriesJSON = () => {
    return new Promise((resolve, reject) => {
       $.ajax("./db/categories.json").done((data) => {
            resolve(data.categories);
       }).fail((error) => {
            reject(error);
       }); 
    });
};

const loadTypesJSON = () => {
    return new Promise((resolve, reject) => {
        $.ajax("./db/types.json").done((data) => {
            resolve(data.types);
        }).fail((error) => {
            reject(error);
        });
    });
};

const loadProductsJSON = () => {
    return new Promise((resolve, reject) => {
        $.ajax("./db/products.json").done((data) => {
            resolve(data.products);
        }).fail((error) => {
            reject(error);
        });
    });
};

const dataFetcher = (dropdown) => {
    let products = [];
    loadProductsJSON().then((productResults) => {
        let productObject;
        for (let i = 0; i < productResults.length; i++) {
            productObject = productResults[i];
        }
        for (let prop in productObject) {
           products.push(productObject[prop]);
        }
        return loadCategoriesJSON();
    }).then(() => {
        loadCategoriesJSON().then((categoryResults) => {
            products.forEach((product) => {
                categoryResults.forEach((category) => {
                        if (category.id === product.type) {
                            product.category = category.name;
                        }
                });
            });
        });
    }).then(() => {
        loadTypesJSON().then((typeResults) => {
            products.forEach((product) => {
                typeResults.forEach((type) => {
                    if (type.id === product.id) {
                        product.type = type.name;
                        product.typedescription = type.description;
                    }
                });
            });
            dom(products, dropdown);
        });
    });
};


module.exports = dataFetcher;
},{"./dom":2}],2:[function(require,module,exports){
"use strict";

const domString = (productArray, category) => {
    let printString = '';
    productArray.forEach((product) => {
        if (category === product.category) {
            printString += `<div class="col-md-4" id="productCard">
                                <h3>${product.name}</h3>
                                <h4>${product.category}</h4>
                                <p>${product.type}</p>
                                <p>${product.description}</p>
                            </div>`;
        }
    });
   printToDom(printString);
};

const printToDom = (strang) => {
    $("#productDiv").html(strang);
    $(".container").addClass("product-display");
};

module.exports = domString;
},{}],3:[function(require,module,exports){
"use strict";

const data = require("./data");

$("#fireworks").click((event) => {
    data("Fireworks");
});

$("#demolition").click((event) => {
    data("Demolition");
});

module.exports = {};
},{"./data":1}],4:[function(require,module,exports){
"use strict";

require("./events");

},{"./events":3}]},{},[4]);
