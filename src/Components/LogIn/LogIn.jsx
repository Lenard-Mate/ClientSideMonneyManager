import Cookies from "js-cookie";
import React, { } from "react";
import './LogIn.css'
import { confirmAlert } from 'react-confirm-alert';
//import axios from 'axios';
//import './SignUp.css';
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



  getData() {



    console.log(Cookies.get('IDRegistration')); // => 'value');
  }

  Send() {

    
	// confirmAlert({
  //   customUI: ({ onClose }) => {
  //     return (
  //       <div className="alert">
  //         <h1 className="alert__title">Are you sure?</h1>
  //         <p className="alert__body">You want to delete this receipt?</p>
  //         <button onClick={onClose} className="noButton">No</button>
  //         <button
  //           onClick={() => {
  //             this.handleClickDelete();
  //             onClose();
  //           }}
  //           className="confirm"
  //         >
  //           Yes, Delete it!
  //         </button>
  //       </div>
  //     );
  //   }
  // });

    const recipeUrl = 'https://moneymanagersspring.herokuapp.com/LogIn';
    const requestMetadata = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };

    
    if(user.email.search("@") > -1){
      fetch(recipeUrl, requestMetadata)
      .then(res => res.json())
      .then(recipes => {

        console.log(recipes);

        if (recipes.validation == true && recipes.numberId != null) {

          window.location.replace('https://moneymanagementapp.herokuapp.com/Chart');
          //Cookies.set('name','value');
          Cookies.set('UserId', recipes.numberId);
          console.log("Loged in");
        }
        else{
          alert("Wrong email or password!");
        }
      });
     

    }else{
      alert("Wrong email!");
    }
    




  }




  Cancel() {

    window.location.replace('https://www.google.com/');
  }



  render() {


    return (
      <div className="SignUpContainer">

        <h1>Log In</h1>
        <p>Please fill in this form to log in.</p>


        <label htmlFor="email"   ><b>Email</b></label>
        <input type="text" onChange={this.getEmail} placeholder="Enter Email" name="email" required /><br />

        <label htmlFor="psw"><b>Password</b></label>
        <input type="password" onChange={this.getPassword} placeholder="Enter Password" name="psw" required /><br />

        <p className="signUpClass">Don't have an account yet? <a href="https://moneymanagementapp.herokuapp.com/SignUp" id="signUpLink"> Sign Up</a></p> 
        <p className="forgotPasswordClass">Forgot your username or password? <a href="https://moneymanagementapp.herokuapp.com/GetPassword" id="findPassword">Find out Here!</a></p>
        <div className="clearfix">
          <button type="button" className="CancelButton" onClick={this.Cancel}>Cancel</button>
          <button type="button" className="LogInButton" onClick={this.Send}>Log In</button>

        </div>
      </div>

    );
  }
}

export default SignUp;