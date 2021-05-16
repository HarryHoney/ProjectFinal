import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from 'react-alert'

const LoginPage = ( props ) => {
    const [ userID, setUserID ] = useState("");
    const [ password, setPassword ] = useState("");
    const alert = useAlert()

    function handleSubmit(e) {
        e.preventDefault();

        axios.post("http://localhost:3001/tax/login", {
            userID,
            password
        } )
        .then(res => {
            console.log(res.data);
            if(res.data.accountNo){
                props.history.push({
                    pathname: '/pay',
                    detail: res.data 
                  });
            }
            else{
                alert.show("Error: "+res.data)
            }
      })
    
    }

    return (
        <div>
            <img src = "government.jpg" height='250px' width='250px' />
            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td><label>User ID</label></td>
                        <td><input 
                            value={userID}
                            onChange={(e) => {setUserID(e.target.value)}}
                            type="text" 
                        /></td>
                    </tr>
                    <tr>
                        <td><label>Password</label></td>
                        <td><input 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password" 
                        /></td>
                    </tr>
                </table>

                <button>Login</button>
                <Link to='/register'>Create Account</Link>
            </form>
        </div>
    );
}

export default LoginPage;