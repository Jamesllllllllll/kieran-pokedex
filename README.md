# Simple Pokedex 

Production: [Kieran's Pokedex](https://kieran-pokedex.vercel.app)

I made a simple Pokemon Card search using:

- React
- [The Pokémon TCG API](https://pokemontcg.io) and their [Javascript SDK](https://github.com/PokemonTCG/pokemon-tcg-sdk-javascript)
- [MUI](https://mui.com/), and 
- [Tailwind](https://tailwindcss.com)

## The problem

My son is always asking me to lookup Pokémon cards online. The websites I find are typically cluttered with distracting information, and (understandably) make you want to keep browsing the site.

This app simply returns all cards matching all or part of the search term. I caved and added one requested feature - to search by attack. Try it by searching for *lovely kiss*!

## What I learned

- I wanted to reinforce my learning of **fetch** - however the Javascript SDK handled some of that for me. It is fun to use!
- First time using Material UI components for an attractive user interface
- A few ternary statements to conditionally display alerts, warnings and search results
- Hiding API key in .env
- I also learned you can add your secrets in a Vercel deployment from their backend.
