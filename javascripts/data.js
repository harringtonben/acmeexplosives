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

const dataFetcher = () => {
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
                            product.category = category.name;
                        }
                });
            });
            console.log("products with categories", products);
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
            console.log("products with categories and types", products);
        });
    });
};

const getProductArray = () => {
    return products;
};

module.exports = {dataFetcher, getProductArray};