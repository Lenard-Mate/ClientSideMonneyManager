import React, { } from "react";
import axios from 'axios'
//import axios from 'axios';
import './SignUp.css';
import { confirmAlert } from 'react-confirm-alert';
import Cookies from "js-cookie";
//import background from "..//images/SignUp.jpg";
let user = { 'email': "", 'name': "", 'password': "" };
class SignUp extends React.Component {


  getEmail = (email) => {
    user.email = email.target.value;
  }

  getPassword = (password) => {
    //  console.log(password.target.value);
    user.password = password.target.value;
  }

  getRepeatPassword = (repeatPassword) => {
    // console.log(repeatPassword.target.value);
    user.repeatPassword = repeatPassword.target.value;
  }


  getValue() {

    console.log(Cookies.get('IDRegistration')); // => 'value');

  }

  Send() {
    if (user.password === user.repeatPassword && user.email.search("@") > -1) {
      const recipeUrl = 'https://moneymanagersspring.herokuapp.com/saveNewUser';
      const requestMetadata = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      };

      fetch(recipeUrl, requestMetadata).then(response => response.json())
        .then(response => {
          console.log(response.message);
          if(response.message != "Exist"){
          window.location.replace('https://moneymanagementapp.herokuapp.com/LogIn');
        }else{
           alert("This email already exist!");
        }
        });
    }else{
       alert("Wrong email or password!");
    }
  }


  cancel() {

    window.location.replace('https://www.google.com/');
}
  render() {


    return (
      <div className="SignUpContainer">

        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>


        <label htmlFor="email"   ><b>Email</b></label>
        <input type="text" onChange={this.getEmail} placeholder="Enter Email" name="email" required /><br />

        <label htmlFor="psw"><b>Password</b></label>
        <input type="password" onChange={this.getPassword} placeholder="Enter Password" name="psw" required /><br />

        <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
        <input type="password" onChange={this.getRepeatPassword} placeholder="Repeat Password" name="psw-repeat" required /><br />

        <a>Have an Account Already? <a href="https://moneymanagementapp.herokuapp.com/LogIn" id="signUpLink"> Log In</a></a>
        <div className="clearfix">
          <button onClick={this.cancel} className="CancelButton">Cancel</button>
          <button  onClick={this.Send} className="LogInButton">Sign Up</button>


        </div>
     
      </div>

    );
  }
}

export default SignUp;