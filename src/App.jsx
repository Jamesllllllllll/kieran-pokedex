import { useState } from "react";
import pokemon from "pokemontcgsdk";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

pokemon.configure({ apiKey: import.meta.env.API_KEY });

export default function App() {
  const [params, setParams] = useState("");
  const [searchResults, setSearchResults] = useState({ data: {} });
  const [searchType, setSearchType] = useState("name");
  const [warning, setWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    const searchValue = value.replaceAll(" ", "*");
    setParams(searchValue);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    console.log(isLoading)
    if (params.length < 3) {
      setWarning(true);
      setIsLoading(false);
      setSearchResults({ data: {} });
    } else {
      setWarning(false);
      pokemon.card.where({ q: `${searchType}:*${params}*` }).then((result) => {
        setSearchResults(result);
        setIsLoading(false);
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
    <main className="flex min-h-screen flex-col items-center justify-between px-4 py-12 md:p-24">
      <div className="flex flex-col items-center justify-center w-full">
        <FormControl className="w-9/12 sm:w-72">
          <TextField
            required
            id="outlined-basic"
            label="Search Pokemon"
            variant="outlined"
            onChange={handleChange}
          />
          <RadioGroup
            aria-labelledby="search-type-group-label"
            defaultValue="name"
            name="radio-buttons-group"
            onChange={handleSearchTypeChange}
            sx={{ marginTop: "1rem" }}
          >
            <FormControlLabel
              value="name"
              control={<Radio />}
              label="Search by name"
              sx={{ margin: "0 auto", marginLeft: "1rem" }}
            />
            <FormControlLabel
              value="attacks.name"
              control={<Radio />}
              label="Search by attack"
              sx={{ margin: "0 auto", marginLeft: "1rem" }}
            />
          </RadioGroup>
            <Button
              type="submit"
              variant="outlined"
              sx={{ margin: "1rem" }}
              onClick={handleSubmit}
            >
              Search
            </Button>
        </FormControl>
        {warning && (
          <Alert className="m-4" severity="info">
            Please enter at least 3 characters
          </Alert>
        )}
        {searchResults.data[0] && (
          <p className="font-semibold">{searchResults.data.length + " results"}</p>
        )}
        {searchResults.count === 0 && <p>Nothing found</p>}
        <div className="flex flex-row flex-wrap items-center justify-center">
          {searchResults.count !== 0 && <Cards />}
        </div>
      </div>
    </main>
  );
}
