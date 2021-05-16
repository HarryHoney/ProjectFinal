const mongoose = require('mongoose')

const URI_Local = 'mongodb://localhost:27017/Blockchain'
const connectDB = async ()=>{
    const res = await mongoose.connect(
        URI_Local,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    console.log('Database Connected....!')
    return res
}

module.exports = connectDB