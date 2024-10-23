//Requiring Mongoose
const mongoose = require("mongoose");

//Requiring data module from data.js
const initData = require("./data.js");

//Requiring listing module from listing.js
const Listing = require("../models/listing.js");

//Connection :
main()
.then(() => {
    console.log("connected to  DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/solivagant');
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
      ...obj, owner: "67109e60eb70b3b243723c30"
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB();