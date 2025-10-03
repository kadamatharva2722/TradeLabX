const mongoose=require('mongoose');

async function connectToMongoDB(url) {
    return await mongoose.connect(url);
}
module.exports={connectToMongoDB}