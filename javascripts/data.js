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