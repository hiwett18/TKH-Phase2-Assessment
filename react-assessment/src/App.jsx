import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useSWR from "swr";

const Pokemon = () => {
  const fetcher = (args) => fetch(args).then((res) => res.json());
  const { data } = useSWR(
    "https://pokeapi.co/api/v2/pokemon/?limit=10",
    fetcher
  );
  console.log(data);

  return (
    <div>
      {data &&
        data.results.map((pokemon) => (
          <div>
            <li><div>{pokemon.name}</div></li>
            
          </div>
        ))}
    </div>
  );
};

function App() {
  
  return(
    <Pokemon /> 
  )
}

export default App
