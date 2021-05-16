const express = require('express')
const router = new express.Router()

router.post('/addGrantRequest',async (req,res)=>{
    const userID = req.body.userID
    const project = req.body.project//current user project
    const amount = req.body.amount
    const purpose = req.body.purpose
    const dbo = req.db
    const Project = await dbo.collection('Projects').findOne({Project_name:project})
    if(!Project || Project.official_incharge != userID)
    {
        res.send("No such Project Exist or You are not Authorited to request")
    }
    else{
        const parent_project = await dbo.collection('Projects').findOne({Project_name:Project.parent_project})
        if(amount>parent_project)
        {
            res.send("You cannot ask this large amount")
        }
        else{
            let obj = {
            Amount: amount,
            voters:0,
            voted:[],
            purpose:purpose,
            Asking_department:Project.Project_name
            }
            let a = await dbo.collection('MoneyRequest '+Project.parent_project).insertOne(obj)
            res.send("success")
        }
    }
})

router.post('/voteForGrant',async (req,res)=>{
    //The person of current project could only see the current requests so no need to check
    const user = req.body.userID
    const toProject = req.body.toProject//child project which is gained from Asking_department
    const purpose = req.body.purpose
    const dbo = req.db
    const userProject = req.body.currProject//name of voters project
    // console.log(user,toProject,purpose,userProject)
    const request = await dbo.collection('MoneyRequest '+userProject).findOne({Asking_department:toProject,purpose:purpose})

    request.voters = request.voters+1
    const done = (request.voted.find((ele)=>{
        if(ele==user)
        return ele
    }))
    if(done)
        res.send("You cannot vote Again")
    else{

        request.voted.push(user)
        console.log(userProject)
        let a = await dbo.collection('MoneyRequest '+userProject).updateOne({Asking_department:toProject,purpose:purpose},{$set:request})
        //one thing is left ie to add money if approved and send that money to project from parent project
        
        let total = await dbo.collection('Officials '+userProject).countDocuments()
        if((request.voters/total)>=0.75)
        {
            let parentProject = await dbo.collection('Projects').findOne({Project_name:userProject})
            let money = parentProject.money

            if(money>=request.Amount)
            {
                let b = await dbo.collection('MoneyRequest '+userProject).deleteOne(request)
                parentProject.money = parseInt(money - request.Amount);
                b = await dbo.collection('Projects').updateOne({Project_name:userProject},{$set:parentProject})
                let currProject = await dbo.collection('Projects').findOne({Project_name:toProject})
                currProject.money = parseInt(currProject.money + request.Amount)
                b = await dbo.collection('Projects').updateOne({Project_name:toProject},{$set:currProject})
            }
            
        }
        
        res.send("success")
    }

})

router.post("/submitTax",async (req,res)=>{

    //userID deposit
    const userID = req.body.userID.trim()
    const depositAmount = req.body.deposit
    const dbo = req.db
    const user = await dbo.collection("taxPayer").findOne({userID:userID})
    if(user.money < depositAmount)
        res.send("You don't have enough money")
    else{

        user.money = parseInt(parseInt(user.money) - parseInt(depositAmount)) 
        let a = await dbo.collection("taxPayer").updateOne({userID:userID},{$set:user})
        let main = await dbo.collection("Projects").findOne({official_incharge:'admin'})
        // console.log(main)
        main.money = parseInt(parseInt(main.money) + parseInt(depositAmount))
        console.log(main)
        a = await dbo.collection("Projects").updateOne({official_incharge:'admin'},{$set:main})
        res.send("success")
    }
    
})

router.post('/getGrantRequests',async (req,res)=>{
    
    let curr_project = req.body.project;
    const dbo = req.db

    const grantsRequested = await dbo.collection('MoneyRequest '+curr_project).find().toArray()
    
    res.send(grantsRequested)

})

module.exports = {taxCollectionRouter:router}