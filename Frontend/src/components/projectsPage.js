import React, {Component} from 'react';
import Project from './project';
import axios from 'axios'

class ProjectsPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
          data:[
            {
                Project_name: "A",
                document_url: "something A",
                purpose:'We are loading Data so Please Wait',
                official_incharge:'None',
                parent_project:'None'
            }
        ]
        };
            
        axios.get('http://localhost:3001/tax/allProjects').then(res=>{
            console.log('data = ',res.data)
            this.setState({data:res.data})
        })
      }

    render(){
            return (
        <div>
            <h1>Projects</h1>
            {
                this.state.data.map((project) => <Project 
                    projectName={project.Project_name} 
                    document_url={project.document_url}
                    purpose = {project.purpose}
                    official_incharge = {project.official_incharge}
                    parent_project = {project.parent_project}
                />)
            }
        </div>
    );
    }
}

export default ProjectsPage;
