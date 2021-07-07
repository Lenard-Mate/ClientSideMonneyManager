
// import Api from './api';

import { Route, BrowserRouter as Router } from "react-router-dom"
import Chart from './Components/Chart/Chart.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import LogIn from './Components/LogIn/LogIn.jsx';
import GetPassword from './Components/GetPassword/GetPassword';
//import Receipt from './Components/UpploadeReceipt/ReceiptUpploade.jsx';
import MyReceipt from './Components/UpploadeReceipt/NewReceipt.jsx';
import ViewReceipts from './Components/Receipts/ViewReceipts.jsx';
import Cookies from "js-cookie";

// const socket = io("http://localhost:5000", {
//   transports: ["websocket", "polling"]
// });
let visible = false;

function App() {

  // useEffect(() => {

  //   socket.on("come_api", message => {
  //    console.log(message);
  //   });
  // }, []);

  if (Cookies.get('UserId') == null) {
    visible = false;


  } else {
    visible = true;
  }


  if (window.location.href != 'https://moneymanagementapp.herokuapp.com/LogIn' && visible == false) {
    if (window.location.href != 'https://moneymanagementapp.herokuapp.com/SignUp') {
      if (window.location.href != 'https://moneymanagementapp.herokuapp.com/GetPassword') {
        window.location.replace('https://moneymanagementapp.herokuapp.com/LogIn');
      }

    }
  }


  return (
    <Router>
      <Route path="/SignUp" component={SignUp} />
      <Route path="/LogIn" component={LogIn} />
      <Route path="/GetPassword" component={GetPassword} />
      {visible && <Route path="/Chart" component={Chart} />}
      {visible && <Route path="/NewReceipt" component={MyReceipt} />}
      {visible && <Route path="/ViewReceipts" component={ViewReceipts} />}
    </Router>



  );
}

export default App;


