const express = require('express')
const router = new express.Router()
// root is Main project
router.post('/login',async (req,res)=>{
    const userID = req.body.userID
    const password = req.body.password
    const Project = req.body.project
    const dbo = req.db;
    console.log(req.body)

    const obj = {
        userID:userID,
        password:password
    }

    const user = await dbo.collection('Officials '+Project).findOne(obj)
    if(user){
        let a = await dbo.collection('Projects').findOne({Project_name:Project});
        res.send(a)
    }else
        res.send('failure')
    
})

const addOfficial = async (userID,password,Project,dbo)=>{

    let obj = {
        userID:userID
    }
    let usercol = await dbo.collection('Officials '+Project)
    let num = await usercol.countDocuments()
    if(num==0)
    {
        let obj = {
        userID:userID,
        password:password
        }
        //we can send email to newly added official
        const val = await dbo.collection('Officials '+Project).insertOne(obj)
        return 'success'
    }
    else{

        let user = await usercol.findOne(obj)
        if(user)
            return 'Official already exist'
        else
        {
            let obj = {
            userID:userID,
            password:password
            }
            const val = await dbo.collection('Officials '+Project).insertOne(obj)
            return 'success'
        
        }
    } 
}

router.post('/addOfficial',async (req,res)=>{
    //only admin can add new officials so ask ashu to display only this feature for admin
    const userID = req.body.userID
    const password = req.body.password
    const Project = req.body.project
    const dbo = req.db;
    let obj = {
        userID:userID
    }
    let usercol = await dbo.collection('Officials '+Project)
    let num = await usercol.countDocuments()
    if(num==0)
        res.send('No such project exist')
    else{

        let user = await usercol.findOne(obj)
        if(user)
            res.send('Official already exist')
        else
        {
            let obj = {
            userID:userID,
            password:password
            }
            const val = await dbo.collection('Officials '+Project).insertOne(obj)
            res.send('Success')
        
        }
    }    
     
})

router.post('/addProjectRequest',async (req,res)=>{
    
    const dbo = req.db;
    let project = await dbo.collection('ProjectRequested').findOne({official_incharge:req.body.official_incharge})
    if(project)
        res.send("You have already asked")
    else{
    obj = {
        Project_name:req.body.Project_name,
        document_url:req.body.document_url,
        purpose:req.body.purpose,
        official_incharge:req.body.official_incharge,
        parent_project:req.body.parent_project,
        voters:0,
        voted:[]
    }
    const val = await dbo.collection('ProjectRequested').insertOne(obj)
    res.send('Your Request has been added')
}})

router.post('/voteForProject',async (req,res)=>{

    let Project = req.body.project
    let User = req.body.userID
    const dbo = req.db;
    const project = await dbo.collection('ProjectRequested').findOne({Project_name:Project})
    project.voters = project.voters+1;
    const usr = await dbo.collection('Officials '+project.parent_project).findOne({userID:User})
    // console.log(!usr)
    const done = (project.voted.find((ele)=>{
        if(ele==User)
        return ele
    }))
    if(done || !usr)
        res.send("Already Voted or User can't vote")
    else{
        project.voted.push(User)
        const val = await dbo.collection('ProjectRequested').updateOne({Project_name:Project},{$set:project})
        let votes = project.voters
        let total = await dbo.collection('Officials '+project.parent_project).countDocuments();
        if((votes/total)>=0.75)
        {
            let b = await dbo.collection('ProjectRequested').deleteOne(project)
            project.money = 0
            let a = await dbo.collection('Projects').insertOne(project);
            a = await addOfficial(project.official_incharge,'password',Project,dbo)
        }
        res.send("success")
}
})

router.get("/setupDB",async (req,res)=>{
    obj = {
        Project_name:"Main",
        document_url:"Main",
        purpose:"This is the main authority of all Departments",
        official_incharge:"admin",
        parent_project:"None",
        money:0
    }
    const dbo = req.db;
    let a = await dbo.collection('Projects').insertOne(obj);
    let b = await  dbo.collection('Officials Main').insertOne({userID:'admin',password:'admin'})
    res.send("success")
})

router.post('/getProjectRequests',async (req,res)=>{
    let curr_project = req.body.project;
    const dbo = req.db

    const projectsRequested = await dbo.collection('ProjectRequested').find({parent_project:curr_project}).toArray()
    
    res.send(projectsRequested)

})


module.exports = {centralAuthorityRouter:router}