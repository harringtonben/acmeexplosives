(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

let products = [];

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

const productGetter = () => {
    loadProductsJSON().then((productResults) => {
        let productObject;
        for (let i = 0; i < productResults.length; i++) {
            productObject = productResults[i];
        }
        for (let prop in productObject) {
           products.push(productObject[prop]);
        }
        console.log("products on their own", products);
        return loadCategoriesJSON();
    }).then(() => {
        loadCategoriesJSON().then((categoryResults) => {
            products.forEach((product) => {
                categoryResults.forEach((category) => {
                        if (category.id === product.type) {
                            category.name = product.category;
                        }
                });
            });
            console.log("products with categories", products);
        });
    });
};

module.exports = productGetter;
},{}],2:[function(require,module,exports){
"use strict";

console.log("I'm in main js");

const data = require("./data");

data();
},{"./data":1}]},{},[2]);
