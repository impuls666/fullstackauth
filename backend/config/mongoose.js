const mongoose = require('mongoose');

module.exports = () => {
const { MONGO_USER, MONGO_PASSWORD } = process.env;
mongoose
  .connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.wkgm20f.mongodb.net/test?retryWrites=true&w=majority`)
  .then(() => console.log('Mongoose is connected'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));
}