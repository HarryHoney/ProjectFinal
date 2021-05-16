import React, { useState } from 'react';
import axios from 'axios'

const RequestedGrant = (props) => {

    const [votesCased,setvotesCased] = useState(props.voters)
    const toProject = props.toProject
    const purpose = props.purpose
    function voteUp(e){
        e.preventDefault();
        const obj = {
            userID:props.currUser,
            purpose,
            toProject,
            currProject:props.currProject
        }
        axios.post('http://localhost:3001/tc/voteForGrant',obj).then(res=>{
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
            <h1>Project Name : {toProject}</h1>
            <h4>Aim of Project : {purpose}</h4>
            <h4>Requesting Amount : {props.amount} ETH</h4>
            <h4>votes : {votesCased}</h4>
            <br></br>
            <button onClick={voteUp}>Vote up</button>
            <hr/>
            <br></br><br></br>
        </div>
    )
}

export default RequestedGrant;