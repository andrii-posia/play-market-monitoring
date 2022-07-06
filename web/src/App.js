import React from 'react';
import 'materialize-css';
import {Link, Outlet} from "react-router-dom";

function App() {
  return (
      <div className="container">
          <Link to="/"><h3 className="center-align">Play Market Apps monitoring</h3></Link>
          <Outlet/>
      </div>
  );
}

export default App;
