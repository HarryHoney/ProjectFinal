import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = (props) => {
    const [ userID, setUserID ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ accountNo, setAccountNo ] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        axios.post("http://localhost:3001/tax/signup", {
            userID,
            password,
            accountNo
        } )
        .then(res => {
            console.log(res);
            if(res.data=="Success"){
                props.history.push('/login')
            }
      })
    
    }

    return (
        <div>
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
                        <td><label>Account No.</label></td>
                        <td><input 
                            value={accountNo}
                            onChange={e => setAccountNo(e.target.value)}
                            type="number" 
                        /></td>
                    </tr>
                    <tr>
                        <td><label>Password</label></td>
                        <td><input 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="text" 
                        /></td>
                    </tr>
                </table>

                <button>Register</button>
                <Link to='/login'>Already have an account</Link>
            </form>
        </div>
    );
}

export default RegisterPage;