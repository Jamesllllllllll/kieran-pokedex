import { useState } from "react";
import pokemon from "pokemontcgsdk";
import { Alert } from "@mui/material";
pokemon.configure({ apiKey: import.meta.env.API_KEY });

export default function App() {
  const [params, setParams] = useState("");
  const [searchResults, setSearchResults] = useState({ data: {} });
  const [warning, setWarning] = useState(false);

  const handleChange = (event) => {
    setParams(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (params.length < 3) {
      setWarning(true);
    } else {
      setWarning(false);
      pokemon.card.where({ q: `name:*${params}*` }).then((result) => {
        setSearchResults(result);
      });
    }
  };

  const Cards = () => {
    return Object.values(searchResults.data).map((card) => {
      return (
        <div
          key={`card-${card.id}`}
          className="flex flex-col items-center justify-center"
        >
          <img src={card.images.small} alt={card.name} className="m-4" />
        </div>
      );
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        <p className="m-4">Search Pokemon by Name:</p>
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            className="peer h-full w-full rounded-[7px] m-4 border border-blue-gray-200  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            type="text"
            placeholder="Partial name is okay"
            onChange={handleChange}
          />
          <button className="border-2 rounded-md m-4 py-2 px-4">Search</button>
        </form>
        {warning && (
          <Alert className="m-4" severity="info">
            Please enter at least 3 characters
          </Alert>
        )}
        {searchResults.data[0] && (
          <p>{searchResults.data.length + " results"}</p>
        )}
        {searchResults.count === 0 && <p>Nothing found</p>}
        <div className="flex flex-row flex-wrap items-center justify-center">
          {searchResults.count !== 0 && <Cards />}
        </div>
      </div>
    </main>
  );
}
