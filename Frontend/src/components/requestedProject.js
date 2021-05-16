import React, { useState } from 'react';
import axios from 'axios'

const RequestedProject = (props) => {

    const [votesCased,setvotesCased] = useState(props.voters)
    const project = props.projectName
    const userID = props.currUser 

    function voteUp(e){
        e.preventDefault();
        axios.post('http://localhost:3001/ca/voteForProject',{project,userID}).then(res=>{
            const response = res.data
            if(response == 'success')
            {
                setvotesCased(votesCased+1);    
            }
            alert(response)
        })
    }

    return (
        <div>
            <br></br>
            <h1>Project Name : {props.projectName}</h1>
            <h4>Official Incharge : {props.official_incharge}</h4>
            <h4>Aim of Project : {props.purpose}</h4>
            <h4>Monitoring Project : {props.parent_project}</h4>
            <h4>Documents related to project can be found on {props.document_url}</h4>
            <h4>votes : {votesCased}</h4>
            <br></br>
            <button onClick={voteUp}>Vote up</button>
            <hr/>
            <br></br><br></br>
        </div>
    )
}

export default RequestedProject;