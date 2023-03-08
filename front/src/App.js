  import { useEffect, useState } from "react";
  import "./App.css";
  import { getMovieCharacters } from "./api/api";

  function App() {
    const [userData, setUserData] = useState([]);

    const loadUser = async () => {
      setUserData(await getMovieCharacters());
    }

    useEffect(() => {
      loadUser()
    }, []);

    return (
      <div className="App">
        <h2>User Data</h2>
        <br></br>
        <div className="mainContainer">
        {Array.from(new Array(Math.ceil(userData.length / 3)), (_, i) => i).map((index) => (
          <div key={index} className= "group">
            {(index === 0
                    ? userData.slice(0, 3)
                    : userData.slice(index * 3, (index + 1) * 3)
                  ).map((character) => (
              <div key={`i${index}${character.name}`} className= "border">
                <p>
                  <img className="ima" alt={character.image} src={character.image}></img>
                </p>
                <p>
                  <strong>Name: </strong> {character.name || "(name here)"}
                </p>
                <p>
                  <strong>gender: </strong>
                  {character.gender || "(gender here)"}
                </p>
                <p>
                  <strong>height: </strong>
                  {character.height || "(height here)"}
                </p>
                <p>
                  <strong>eye_color: </strong>
                  {character.eye_color || "(eye_color here)"}
                </p>
              </div>
            ))}
          </div>
        ))}
        </div>
      </div>
    );
  }

  export default App;
