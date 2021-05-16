const express = require('express')
const morgan = require('morgan')
const {LMS,web3} = require('./contractsDev/TaxCollection')
const {other} = require('./contractsDev/Central_Authority')
const app = express();
const connectDB = require('./DB/connection')
const {userRouter} = require('./routes/user')
const {taxCollectionRouter} = require('./routes/taxcollection')
const {centralAuthorityRouter} = require('./routes/centralAuthority');

var db = null

const middleware = async (req,res,next)=>{
    const accounts = await web3.eth.getAccounts();
    const TC_contract = await LMS.deployed();
    const CA_contract = await other.deployed();
    req.accounts = accounts;
    req.TC_contract = TC_contract;
    req.CA_contract = CA_contract;
    next()
}

const database = async (req,res,next)=>{
    req.db = db.connections[0].db
    next()
}

app.use(morgan('tiny'))
app.use(express.json({extended:false}))
// app.use(middleware)
app.use(database)
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use('/tax',userRouter)
app.use('/ca',centralAuthorityRouter)
app.use('/tc',taxCollectionRouter)

app.get('/testing',async (req,res)=>{
    const val = await req.TC_contract.getTotalTaxPayers({from:req.accounts[1]})
    console.log(val)
    res.send(req.accounts);
})


const Port = 3001 || process.env.Port;
const start = async ()=>{
    db = await connectDB();
    app.listen(Port,()=>console.log(`Server started at port ${Port}`))
}

start();
