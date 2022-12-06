import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPreURL] = useState("");

  useEffect(() => {
    fetchPokemonData(initialURL);
  }, []);

  const fetchPokemonData = async (url) => {
    if (!url) return;
    let res = await getAllPokemon(url);
    await loadPokemon(res.results);
    setNextURL(res.next);
    setPreURL(res.previous);
    setLoading(false);
  };

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={() => fetchPokemonData(prevURL)}>Back</button>
              <button onClick={() => fetchPokemonData(nextURL)}>Next</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default App;
