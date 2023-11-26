const mongoose = require("mongoose");

const Tajnedata = new mongoose.Schema({
text:{
    type: String,
    required: true
}
});
module.exports = mongoose.model("Tajnedata", Tajnedata);
