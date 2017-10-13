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