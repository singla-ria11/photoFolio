import "./App.css";
import Navbar from "./components/navbar";
import MainBody from "./components/mainBody";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      {/* <h1>Hello, React</h1> */}
      <Navbar />
      <MainBody />
    </div>
  );
}

export default App;
