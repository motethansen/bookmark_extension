import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavbarComponent from "../components/Navbar/NavbarComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavbarComponent />
      </header>
    </div>
  );
}

export default App;
