
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import Home from "./pages/home";

function App() {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className="App">
      <Router>
 
        <div>
          <Home />
 
        </div>

      </Router>
    </div>
  
  
  );
}


export default App;
