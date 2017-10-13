"use strict";

const data = require("./data");

$("#fireworks").click((event) => {
    data("Fireworks");
});

$("#demolition").click((event) => {
    data("Demolition");
});

module.exports = {};