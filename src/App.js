import './styles/App.css';
import Home from './routes/Home.js';
import Facilities from './routes/Facilities.js';
import Teacher from './routes/Teacher';
import Test from './routes/test.js';
import Seats from './routes/Seats.js';
import config from './config';
import { firebaseApp } from './firebase';
import {firebaseMessaging} from "./firebase";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
getToken(messaging, { vapidKey: 'BMtqJ5KzHKes3ZDBcX1sdvFI0Jz9-a_RZRvo47ZciIUuo8Wo0DDXn3uYxmc97E-T4zhSAM_tnycS6A0AtLginKY' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
    try {
      axios.post(config.server_address+"/userToken_add",{token: currentToken});
  } catch {
  }
    console.log(currentToken);
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/seats" element={<Seats />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/assignments/:type" element={<Facilities />} />

      </Routes>
    </Router>
  );
}

export default App;