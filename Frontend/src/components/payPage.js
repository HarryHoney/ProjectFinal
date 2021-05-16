import React, { useState } from 'react';
import axios from 'axios';

const PayPage = (props) => {

    const [ Amount, setAmount ] = useState("");
    const [Status, setStatus] = useState('Yet to pay');

    const userID = props.location.detail.userID;
    const userBalance = props.location.detail.money
    const accountNo = props.location.detail.accountNo
    function handleSubmit(e) {
        e.preventDefault();
        console.log(userID)
        axios.post("http://localhost:3001/tc/submitTax", {
            userID:userID.trim(),
            deposit:(Amount*30)/100
        } )
        .then(res => {
            console.log(res.data);
            if(res.data == 'success'){
                setStatus('Payment Successful');
            }
            else{
                alert.show("Error: "+res.data)
            }
      })
        
    }

    return (
        <div>
            <img src = "government.jpg" height='250px' width='250px' />
            <h1>Tax Payment</h1>
            <br></br><br></br>
            <div>
                <span>User Account : {accountNo} ----- User Balance : {userBalance}</span>
                <div>
                    <h3>Tax Status : {Status} </h3>
                </div>
                <form >
                    <table>
                        <tr>
                            <td><label>Enter your Income :</label></td>
                            <td><input 
                            value={Amount}
                            onChange={(e) => {setAmount(e.target.value)}}
                            type="number" placeholder={0} /></td>
                        </tr>
                        <tr><br></br></tr>
                        <tr>
                            <td><label>Calculated Tax :</label></td>
                            <td><h4>{(Amount*30)/100} ETH</h4></td>
                        </tr>
                    </table>
                    <button onClick={handleSubmit}>Pay Tax</button>
                </form>
            </div>
        </div>
    );
}

export default PayPage;