import React, { useState } from 'react';

const Project = (props) => {
    return (
        <div>
            <br></br>
            <h1>Project Name : {props.projectName}</h1>
            <h4>Official Incharge : {props.official_incharge}</h4>
            <h4>Aim of Project : {props.purpose}</h4>
            <h4>Monitoring Project : {props.parent_project}</h4>
            <h4>Documents related to project can be found on {props.document_url}</h4>
            <br></br><br></br>
        </div>
    )
}

export default Project;