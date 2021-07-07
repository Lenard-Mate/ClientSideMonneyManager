import React, { } from "react";
import './ReceiptUpploade.css'
import io from "socket.io-client";


let globalURL = "";

class ReceiptUpploade extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      Value: "",
      lastName: ""
    }
  }



  getURL = (value) => {

    //console.log(value);

    globalURL = value;

  }

  Counter = () => {


   

    const socket = io("http://localhost:5000", {
      transports: ["websocket", "polling"]
    });

    socket.on("come_api", message => {
      console.log(message);
      socket.emit("sendImagePath", globalURL.target.value);

      var i;
      var string = "";
 if (message !== "[object Object]"){
      for (i = 0; i < 46; i++) {

        string = string + message.api_send[0].lines[i].text + "\n";


      }
    }
      // console.log(globalURL.target.value);
       

if(string.length > 0){
      this.setState({
        Value: string
      });
    }
socket.disconnect();
    });

  }



  updateFirstName(value) {

  }



  // }

  //     Send = () => {


  // if(user.password === user.repeatPassword){
  //       const recipeUrl = 'http://localhost:8080//rest/users/SignUp';
  //       const requestMetadata = {
  //           method: 'POST',
  //           headers: {
  //               'Content-Type': 'application/json'
  //           },
  //           body: JSON.stringify(user)
  //       };

  //       fetch(recipeUrl, requestMetadata)
  //           .then(res => res.json())
  //           .then(recipes => {

  //               console.log(recipes);
  //           });

  //           //window.location.replace('http://localhost:3000/Chart');

  //         }
  //     }

  render() {

    return (
      <div className="SignUpContainer">
        <div>
          <button onClick={this.Counter}>Get the Value</button>
        </div>
        <label ><b>Insert image URL</b></label>
        <input type="text" onChange={this.getURL} placeholder="Image URL..." /><br />
        <p>{this.message}</p>
        {/* asdasdasd */}
        <div>
          The receipt value:
           <textarea rows="5" cols="60" name="description" type="writebox" id="TextBox" value={this.state.Value} onChange={this.updateFirstName.bind(this)}>
            Enter details here...
              </textarea>
          <hr />
        </div>
        <div>
          <button onClick={this.Counter}>Save Receipt</button>
        </div>
      </div>

    );

  }
}
export default ReceiptUpploade;