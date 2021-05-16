import React, { useState,useEffect } from 'react';
import axios from 'axios';
import RequestedProject from './requestedProject'
import RequestedGrant from './requestedGrant'

const OfficialPage = (props) => {
    
    const [ projectName, setprojectName ] = useState("");
    const [ purpose, setPurpose ] = useState("");
    const userID = props.location.detail.userID
    const Project = props.location.detail.Project
    const [url,seturl] = useState('')
    const [component,setComponent] = useState([])
    const [Grantcomponent,setGrantComponent] = useState([])
    const [funding,setFunding] = useState(props.location.detail.money)
    const [official_incharge,setOfficial] = useState(props.location.detail.official_incharge)
    const [NewUserID,setNewUserID] = useState('')
    const [NewUserPassword,setNewUserPassword] = useState('')
    const [purposeofGrant,setPurposeofGrant] = useState('')
    const [AmountofGrant,setAmountofGrant] = useState(0)

    useEffect(() => {
        axios.post('http://localhost:3001/ca/getProjectRequests',{project:Project}).then(res=>{
        setComponent( res.data.map(project =><RequestedProject
            projectName={project.Project_name} 
            document_url={project.document_url}
            purpose = {project.purpose}
            official_incharge = {project.official_incharge}
            parent_project = {project.parent_project}
            currUser = {userID}
            voters = {project.voters}
        />))
            if(res.data.length == 0){
                let val = document.getElementById('rp')
                val.style.display = 'none'
            }
        })
        
        axios.post('http://localhost:3001/tc//getGrantRequests',{project:Project}).then(res=>{
        setGrantComponent( res.data.map(grant =><RequestedGrant
            currUser={userID} 
            purpose={grant.purpose}
            toProject = {grant.Asking_department}
            amount = {grant.Amount}
            voters = {grant.voters}
            currProject = {Project}
        />))
        if(res.data.length == 0){
            let val = document.getElementById('rg')
            val.style.display = 'none'
        }
        })

        if(official_incharge === userID){
            let val = document.getElementById('addofficialbutton')
            val.style.display = 'block'
            if(userID != 'admin'){
                let val = document.getElementById('addgrantbutton')
                val.style.display = 'block'
            }
        }

        }, [])

    function expandAddGrantRequest(e){
        e.preventDefault();
        let val = document.getElementById('formforgrantrequest')
        val.style.display = 'block'
    }

    function expandAddProjectRequest(e){
        e.preventDefault();
        let val = document.getElementById('form')
        val.style.display = 'block'
    }    

    function handleSubmitADD(e){
        e.preventDefault();
        addOfficial(NewUserID,NewUserPassword,Project)
    }

    function ExpandOfficialAddingForm(e){
        e.preventDefault();
        let val = document.getElementById('OfficialAddingForm')
        val.style.display = 'block'
    }

    function submitProjectReq(e){
        e.preventDefault();
        const obj = {
            Project_name:projectName,
            purpose:purpose,
            official_incharge:userID,
            parent_project:Project,
            document_url:url
        }

        axios.post('http://localhost:3001/ca/addProjectRequest',obj).then(res=>{
            alert(res.data)
        })

    }

    function submitGrantReq(e){
        e.preventDefault();
        const obj = {
            userID,
            project:Project,
            purpose:purposeofGrant,
            amount:AmountofGrant
        }
        axios.post('http://localhost:3001/tc/addGrantRequest',obj).then(res=>{
            alert(res.data)
            let val = document.getElementById('formforgrantrequest')
            val.style.display = 'none'
        })
    }
    function addOfficial(userID,password,project){
        axios.post('http://localhost:3001/ca/addOfficial',{userID,password,project}).then(res=>{
            alert(res.data)
            let val = document.getElementById('OfficialAddingForm')
            val.style.display = 'none'
        })
    }
        

    return (
        <div>
            <img src = "government.jpg" height='250px' width='250px' />
            <h3>Project Name: {Project}</h3>
            <br></br>
            <h3>UserID : {userID}</h3>
            <h3>Funding : {funding}</h3>
            <h3>Official Head : {official_incharge}</h3>
            <br></br>

            <button style= {{display:'none'}} id = 'addofficialbutton' onClick={ExpandOfficialAddingForm}>Add New Official</button>
            <form style= {{display:'none'}} id = 'OfficialAddingForm' onSubmit={handleSubmitADD}>
                    <label for="fname">UserID:</label><br/>
                    <input type="text" 
                    value={NewUserID}
                    onChange={(ee) => {
                        // This is official adding form
                        setNewUserID(ee.target.value)
                    }}
                    /><br/>
                    <label for="lname">Password:</label><br/>
                    <input type="text" id="lname" name="lname"
                    value={NewUserPassword}
                    onChange={(e) => {setNewUserPassword(e.target.value)}}
                    />
                    <br/>
                    <button>Submit</button>
                </form>
            
            
            <button onClick={expandAddProjectRequest}>Add Project Request</button>
            <form style= {{display:'none'}} id = 'form' onSubmit={submitProjectReq}>
            <table>
                <tr>
                    <td><label>Project Name</label></td>
                    <td><input 
                        value={projectName}
                        onChange={(e) => {setprojectName(e.target.value)}}
                        type="text" 
                    /></td>
                </tr>
                
                <tr>
                    <td><label>Purpose</label></td>
                    <td><input 
                        value={purpose}
                        onChange={e => setPurpose(e.target.value)}
                        type="text" 
                    /></td>
                </tr>
 
                <tr>
                    <td><label>Choose Relevant Documents</label></td>
                    <td><input onChange={(e)=>{seturl( e.target.files.item(0).name)}} type="file" class="form-control-file" id="exampleFormControlFile1"></input></td>
                </tr>
                
            </table>
            
                <button>Add Request</button>
            </form>


            <button style= {{display:'none'}} id = 'addgrantbutton' onClick={expandAddGrantRequest}>Add Grant Request</button>
            <form style= {{display:'none'}} id = 'formforgrantrequest' onSubmit={submitGrantReq}>
            <table>
                <tr>
                    <td><label>Purpose</label></td>
                    <td><input 
                        value={purposeofGrant}
                        onChange={e => setPurposeofGrant(e.target.value)}
                        type="text" 
                    /></td>
                </tr>
 
                <tr>
                    <td><label>Amount</label></td>
                    <td><input type="number" value={AmountofGrant} onChange={(e)=>setAmountofGrant( e.target.value)} ></input></td>
                </tr>
                
            </table>
            
                <button>Add Request</button>
            </form>

            
            <br></br><br></br>

            <h3 id='rp'>Requested Projects</h3>
            <div>
            {component}
            </div>
            <h3 id = 'rg'>Requested Grants</h3>
            <div>
            {Grantcomponent}
            </div>
        </div>
    );
}

export default OfficialPage;