import React, { useState } from "react";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashLoader } from "react-spinners";

import "./home.css";

function Home() {
  const [isToggled, setToggle] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [asteroidArr, setAsteroidArr] = useState([]);

  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  const buttonFade = useSpring({
    color: isToggled ? "red" : "white",
  });

  function fetchNasa(e) {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;

    setLoading(true);
    e.style.display = "none";
    axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&api_key=vajGJMdv5V8KjRss7EhwK52vwq8Q74hJ0qfcG4VA`
      )
      .then((res) => {
        // console.log(res.data.near_earth_objects[today]);
        setAsteroidArr(res.data.near_earth_objects[today]);
        setLoading(false);
        e.style.display = "block";
        e.style.textAlign = "center";
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        e.style.display = "block";
      });
  }

  return (
    <div className="container">
      <animated.h3 style={buttonFade}>Home!</animated.h3>
      <animated.button
        className="btn btn-primary m-3"
        onClick={(e) => fetchNasa(e.currentTarget)}
        style={fade}
      >
        Asteroids near Earth Today
      </animated.button>
      <HashLoader size={50} color={"white"} loading={isLoading} />
      <animated.button
        className="btn btn-primary m-3"
        onClick={() => setToggle(!isToggled)}
        style={fade}
      >
        Toggle Color
      </animated.button>
      <div className="row m-3">
        {asteroidArr.map((asteroid) => {
          // console.log(asteroid);
          return (
            <div key={asteroid.id} className="col-sm-6">
              <div className="card mb-3">
                <div className="card-header">
                  Name: <strong>{asteroid.name}</strong>
                </div>
                <div className="card-text">
                  Maximum Diameter:{" "}
                  <strong>
                    {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                      2
                    )}
                  </strong>{" "}
                  km(s)
                  <br />
                  Potentially Hazardous:{" "}
                  <strong>
                    {asteroid.is_potentially_hazardous_asteroid === true
                      ? "Yes"
                      : "No"}
                  </strong>
                  <br />
                  Miss Distance:{" "}
                  <strong>
                    {Number(
                      asteroid.close_approach_data[0].miss_distance.kilometers
                    ).toFixed(2)}
                  </strong>{" "}
                  km(s)
                  <br />
                  Speed:{" "}
                  <strong>
                    {Number(
                      asteroid.close_approach_data[0].relative_velocity
                        .kilometers_per_hour
                    ).toFixed(2)}
                  </strong>{" "}
                  km/h
                  <br />
                  <a
                    href={asteroid.nasa_jpl_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-info m-3"
                  >
                    Official URL
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
