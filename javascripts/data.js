"use strict";

let products = [];

const loadCategoriesJSON = () => {
    return new Promise((resolve, reject) => {
       $.ajax("./db/categories.json").done((data) => {
            console.log(data.categories);
       }).fail((error) => {
            console.log(error);
       }); 
    });
};

const loadTypesJSON = () => {
    return new Promise((resolve, reject) => {
        $.ajax("./db/types.json").done((data) => {
            console.log(data.types);
        }).fail((error) => {
            console.log(error);
        });
    });
};

const loadProductsJSON = () => {
    return new Promise((resolve, reject) => {
        $.ajax("./db/products.json").done((data) => {
            console.log(data.products);
        }).fail((error) => {
            console.log(error);
        });
    });
};

module.exports = {loadCategoriesJSON, loadTypesJSON, loadProductsJSON};