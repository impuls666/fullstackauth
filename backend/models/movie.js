const instance2 = require('../db2');

const movie = new instance2.Schema({
title:{
    type: String,
    required: true
}
});
module.exports = instance2.model("movie", movie);
