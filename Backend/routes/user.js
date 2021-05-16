const express = require('express')
const router = new express.Router()

router.get('/logintesting',async (req,res)=>{
    const userID = req.body.userID
    const password = req.body.password
    const dbo = req.db;
    const objtest = {
        userID:'asddflfh',
        password:'ksdafh'
    }
    const val = await dbo.collection('taxPayer').insertOne(objtest)
    console.log(val)
    res.send('adf')
})

router.post('/login',async (req,res)=>{
    //userID password
    const userID = req.body.userID
    const password = req.body.password
    const dbo = req.db;
    const obj = {
        userID:userID,
        password:password
    }
    const user = await dbo.collection('taxPayer').findOne(obj)
    if(user == null)
    {
        res.send('userID or password is invalid')
    }
    else
    res.send(user)
})

router.post('/signup',async (req,res)=>{
    //userID password accountNo
    const userID = req.body.userID
    const password = req.body.password
    const dbo = req.db;
    let obj = {
        userID:userID
    }
    let user = await dbo.collection('taxPayer').findOne(obj)
    if(user)
        res.send('User already exist')
    else
    {
        obj1 = {
            accountNo:req.body.accountNo
        }
        user = await dbo.collection('taxPayer').findOne(obj1)
        if(user)
            res.send('Account Number already taken')
        else{
            obj2 = {
            userID:userID,
            password:password,
            accountNo:req.body.accountNo,
            money:100
            }
            const val = await dbo.collection('taxPayer').insertOne(obj2)
            res.send('Success')
        }
    }
})

router.get('/allProjects',async (req,res)=>{
    const dbo = req.db
    const results = await dbo.collection('Projects').find({}).toArray()
    console.log(results)
    res.send(results)
})

module.exports = {userRouter:router}