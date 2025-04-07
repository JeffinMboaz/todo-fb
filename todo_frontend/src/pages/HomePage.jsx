import React from "react";

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function HomePage() {
  
  

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 regback">
      <div className="text-center reg-login">
        <Link to="/mytodo/userregister">
          <Button variant="primary" className="mx-2 r-l-button ">Register</Button>
        </Link>
        <Link to="/mytodo/userlogin">
          <Button variant="success" className="mx-2 r-l-button ">Login</Button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
