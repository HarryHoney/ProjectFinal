import React,{Component, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
const HomePage = (props) => {

    const [userID,setUserID] = useState('')
    const [Password,setPassword] = useState('')
    const [Project,setProject] = useState('')
    
    function handleSubmit(e){
        e.preventDefault();

        axios.post('http://localhost:3001/ca/login',{userID,password:Password,project:Project}).then(res=>{
            if(res.data === 'failure'){
                alert('userID or Password is incorrect')
            }
            else{
                props.history.push({
                    pathname: '/officialPage',
                    detail: {userID,Project,money:res.data.money,official_incharge:res.data.official_incharge} 
                  })
            }
        })

    }
    
    function handleLogin(e){
        e.preventDefault();
        let val = document.getElementById('form')
        val.style.display = 'block'
    }

    return (
        <div>
            <img src = "government.jpg" height='250px' width='250px' />
            <h1>Central Authority of India</h1>
            <Link to='/login'><button>Pay Tax</button></Link>
            <Link to='/projects'><button>View Projects</button></Link>
            <br></br>
            <br></br>
            {/* <Link to='/officialPage'><button>Login as Official</button></Link> */}
            <button onClick={handleLogin}>Login as Official</button>
            <div>  
                <form style= {{display:'none'}} id = 'form' onSubmit={handleSubmit}>
                    <label for="fname">UserID:</label><br/>
                    <input type="text" 
                    value={userID}
                    onChange={(ee) => {
                        // console.log(userID);
                        setUserID(ee.target.value)
                    }}
                    /><br/>
                    <label for="lname">Password:</label><br/>
                    <input type="password" id="lname" name="lname"
                    value={Password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <br/>
                    <label for="lname">Your Project:</label><br/>
                    <input type="text" id="lname" name="lname"
                    value={Project}
                    onChange={(e) => {setProject(e.target.value)}}
                    />
                    <button>Submit</button>
                </form>
        </div>
        
        </div>
    );
}


export default HomePage;