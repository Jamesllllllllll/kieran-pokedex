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

  const handleChange = (event) => {
    const value = event.target.value;
    const searchValue = value.replaceAll(" ", "*");
    setParams(searchValue);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (params.length < 3) {
      setWarning(true);
      setSearchResults({ data: {} });
    } else {
      setWarning(false);
      pokemon.card.where({ q: `${searchType}:*${params}*` }).then((result) => {
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
        <FormControl>
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
              label="Search name"
              sx={{ margin: "0 auto", paddingRight: "0.5rem" }}
            />
            <FormControlLabel
              value="attacks.name"
              control={<Radio />}
              label="Search attack"
              sx={{ margin: "0 auto", paddingRight: "0.5rem" }}
            />
          </RadioGroup>
          <Button
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
