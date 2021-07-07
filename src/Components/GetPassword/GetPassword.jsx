import Cookies from "js-cookie";
import React, { } from "react";
import './GetPassword.css'
//import axios from 'axios';
//import './SignUp.css';
//import background from "..//images/SignUp.jpg";
let user = { 'email': "" };
class GetPassword extends React.Component {


  getEmail = (email) => {
    user.email = email.target.value;
  }


  Send() {


    const recipeUrl = 'http://moneymanagersspring.herokuapp.com/GetPassowrd';
    const requestMetadata = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };

    fetch(recipeUrl, requestMetadata)
      .then(res => res.json())
      .then(recipes => {

        console.log(recipes.message);

      
        
      });


console.log(user.email);

  }



  render() {


    return (
      <div className="SignUpContainer">

        <h1>Recover password</h1>
        <p>Write your email here for send your password!</p>


        <label htmlFor="email"   ><b>Email</b></label>
        <input type="text" onChange={this.getEmail} placeholder="Enter Email" name="email" required /><br />

        
        
          <button type="button" className="getPassword" onClick={this.Send}>Get Password</button>

        
      </div>

    );
  }
}

export default GetPassword;