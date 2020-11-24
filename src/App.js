import "./App.css";
import Home from "./components/Home";
import axios from "axios";
import React, { useState } from "react";

function App() {
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
    <div className="App" style={{ backgroundImage: "URL(" + imageURL + ")" }}>
      <Home />
    </div>
  );
}

export default App;
