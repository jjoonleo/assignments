import './styles/App.css';
import Home from './routes/Home.js';
import Facilities from './routes/Facilities.js';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<div>Not Found</div>} />
        <Route path="/assignments/:type" element={<Facilities />} />
      </Routes>
    </Router>
  );
}

export default App;