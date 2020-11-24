import "./App.css";
import Home from "./components/Home";
import axios from "axios";
import React, { useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import $ from "jquery";

function App() {
  function loading() {
    $(window).on("load", () => {
      $(".loading-screen").fadeOut("fast");
      document.querySelector(".App").style.display = "block";
    });
  }

  const [imageURL, setImageURL] = useState("");

  axios
    .get(
      "https://api.nasa.gov/planetary/apod?api_key=vajGJMdv5V8KjRss7EhwK52vwq8Q74hJ0qfcG4VA"
    )
    .then((res) => {
      setImageURL(res.data.hdurl);
    })
    .catch((err) => {
      console.error(err);
    });

  return (
    <div onLoadStart={loading()}>
      <div className="loading-screen">
        <ClimbingBoxLoader size={20} color={"#34B09A"} />
      </div>
      <div className="App" style={{ backgroundImage: "URL(" + imageURL + ")" }}>
        <Home />
      </div>
    </div>
  );
}

export default App;
