import React from 'react';
import Cookies from "js-cookie";
import io from "socket.io-client";
import './ReceiptUpploade.css'
import { useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';

let receiptValue = { 'userId': "", 'receiptValue': "", 'total': "", 'location': "", 'date': "" };
// https://ocrapinodejs.herokuapp.com
const socket = io("https://ocrapinodejs.herokuapp.com", {
  transports: ["websocket", "polling"]
});

var globalvariable;
var imageData;
var string = "";
function Mysochet() {

  const [messages, setMessages] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [totlValue, setTotalValue] = useState("");
  const [dataTime, setDataTime] = useState("");
  const [dateTime2, setdateTime2] = useState("");


  useEffect(() => {

    //socket.emit("sendImagePath", "thi is the message");

    socket.on("come_api", message => {

      //   setMessages(messages => [...messages, message]);
      imageData = message;
      console.log(message);
      asyncCall();
     socket.close();
      socket.disconnect();
    });
  }, []);



  function drop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var imageUrl = evt.dataTransfer.getData('text/html');
    var rex = /src="?([^"\s]+)"?\s*/;
    var url, res;
    url = rex.exec(imageUrl);
    alert(url[1]);
  }


  function getData(val) {
    globalvariable = val.target.value;
  }


  function getURL(value) {

    socket.emit("sendImagePath", value);


  }


  async function asyncCall() {


    var i;

    for (i = 0; i < imageData.pi_send[0].lines.length; i++) {

      string = string + imageData.pi_send[0].lines[i].text + "\n";

    }

    var j;


    var markets = ["LIDL", "Lidl", "MARKET", "Market", "Carrefour", "CARREFOUR", "Penny", "PENNY", "Unicarm", "UNICARM", "Kaufland", "KAUFLAND"];
    for (j = 0; j < markets.length; j++) {

      if (string.includes(markets[j]) == true) {
        setCompanyName(companyName => [...companyName, markets[j]]);
        receiptValue.location = markets[j];
        j = markets.length;
      }
    }


    const regexTOTALVALUE = /(?<=s|TOTAL)\s(.+[0-9]+\w)/g; //nice regular expresion /(?<=TOTAL\s).[0-9]+.[0-9]+\w/ or use /(?<=TOTAL\s)([0-9]+.[0-9]+)/g
    const found = string.match(regexTOTALVALUE);
    setTotalValue(totlValue => [...totlValue, found[0]]);
    //C:\Users\Leni\Desktop\frontEnd\ProiectDeDiplomaFrontEnd\Receipt\Carrefour.jpg

    const regexData = /(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}/; //
    const foundData = string.match(regexData);

    const regexTime = /(\s){0}([0-9]{2}-(0[0-9]|[0-9]){2}-([0-9]|[0-9]){2})\b/g; //
    const foundTime = string.match(regexTime);

    setDataTime(dataTime => [...dataTime, foundData[0] + " " + foundTime]);
    console.log(foundData[0] + " " + foundTime);

    console.log(foundData[0].replaceAll("/", "-"));
    console.log(foundTime[0].replaceAll("-", ":"));

    var dateString = foundData[0].replaceAll("/", "-");
    dateString = dateString.substr(6, 4) + "-" + dateString.substr(3, 2) + "-" + dateString.substr(0, 2);
    //var date = new Date(dateString);
    console.log(dateString);
    // /(?<=DATA:)([0-9]+.[0-9]+.[0-9]+)/g regex for DATA
    // /(?<=ORA:\s)([0-9]+.[0-9]+.[0-9]+)/g regex for ORA
    ///\W*((?i)Total(?-i))\W+([0-9]+.*)/g -good regex

    setMessages(messages => [...messages, string]);


    receiptValue.userId = Cookies.get('UserId');

    receiptValue.receiptValue = string;
    receiptValue.total = parseFloat(found[0]);
    receiptValue.date = dateString + " " + foundTime[0].replaceAll("-", ":");

  }


  function logOut() {

    Cookies.remove('UserId');
    window.location.replace('https://moneymanagementapp.herokuapp.com/LogIn');
  }

  function chart() {


    window.location.replace('https://moneymanagementapp.herokuapp.com/Chart');
  }

  function seeReceipts() {

		window.location.replace('https://moneymanagementapp.herokuapp.com/ViewReceipts');
	}

  function Send() {



    const recipeUrl = 'https://moneymanagersspring.herokuapp.com/setReceipt';
    const requestMetadata = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(receiptValue)
    };

    fetch(recipeUrl, requestMetadata)
      .then(res => res.json())
      .then(recipes => {

        console.log(recipes);
        if(recipes.message == "All is good"){
            alert("You saved.");
            window.location.reload();
        }
      });

    //window.location.replace('http://localhost:3000/Chart');


  }

  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'sqfchemv')
    setLoading(true)
    const res = await fetch(
      '	https://api.cloudinary.com/v1_1/dofy8ocha/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
console.log(file);
    setImage(file.secure_url)
    setLoading(false)
    getURL(file.secure_url);
  }

  function Dropzone(props) {
    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
      // Disable click and keydown behavior
      noClick: true,
      noKeyboard: true
    });

    const files = acceptedFiles.map(file => (

      <li key={file.path}>

        {file.path} - {file.size} bytes
      </li>
    )

    );
    console.log(acceptedFiles);
    return (
      <div className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <button type="button" onClick={open}>
            Open File Dialog
          </button>
        </div>
        <aside>
          <ul>{files}</ul>
        </aside>
      </div>
    );
  }

  return (


    <div>

      <div className="navBar">
        <button type="button" className="seeReceipts" onClick={seeReceipts} >See Receipts</button>
        <button type="button" id="upploadeReceipt" onClick={chart} >Chart</button>
        <button type="button" id="logOut" onClick={logOut} >Log Out</button>
      </div>
      <div className="upploaderContainer">

        {/* <div>
          <button className="buttonStyle" onClick={getURL}>Get the Value</button>
        </div> */}
        <div className="imageContainer">
        <input
        type="file"
        name="file"
        placeholder="Upload an image"
        onChange={uploadImage}
        className = "imageChuser"
      />
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <img src={image} style={{ width: '200px' }} />
      )}
      </div>
      <br />
        {/* <label ><b>Insert image URL</b></label>
        <input type="text" /*onChange={this.getURL} placeholder="Image URL..." /*onChange={getData}/><br /> */}
        <div className="receiptDataContainer">
          <label ><b>The Company</b></label>
          <input type="text" /*onChange=/*{this.getURL}*/ onChange={e => setCompanyName(e.currentTarget.value)}
            value={companyName} /><br />
          The receipt value:
          <textarea rows="5" cols="60" name="description" type="writebox" id="TextBox" onChange={e => setMessages(e.currentTarget.value)}
            value={messages}>
          </textarea>
          <div>
            <div id="DateTime" className="dateTimeContainer">
              <label ><b>Date and Time</b></label><br />
              <input type="text" onChange={e => setDataTime(e.currentTarget.value)}
                value={dataTime} /><br />
              <hr />
            </div>

          </div>
          <div id="totalValue" className="dateTimeContainer">
            <label ><b>Total value</b></label><br />
            <input type="text"  /*onChange=/*{this.getURL}*/ onChange={e => setTotalValue(e.currentTarget.value)}
              value={totlValue} />
            <hr />
          </div>
        </div>

        <div>
          <button className="buttonStyle" onClick={Send}>Save Receipt</button>
        </div>
        {/* <Dropzone /> */}
      </div>

    </div>
  );
}

export default Mysochet;