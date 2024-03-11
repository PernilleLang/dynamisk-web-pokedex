const params = new URLSearchParams (location.search);
const searchParam = params.get("search") || ""
console.log(searchParam);

const limit = parseInt(params.get("limit")) || 20



// && - Begge skal være true
// true || false -> true
// true || true -> true
// false || false -> false
// false || true -> true

// <
// >
// ===
// <=
// >=

let offset;
if (params.get("offset")) {
  offset = parseInt(params.get("offset"));
} else {
  offset = 0;
}

console.log(limit, offset);

async function renderPokemons(){
  const pokemons = await getPokemonList(limit, offset)
  const listOfPokemonsWithSprites = await getListOfPokemonsWithSprites(pokemons)
  console.log(listOfPokemonsWithSprites);
  listOfPokemonsWithSprites.forEach(function (pokemon){
    let li = document.createElement("li")
    li.innerHTML = `
    <a href="detail.html?name=${pokemon.name}">
    <img src="${pokemon.sprites.other.home.front_default}">${pokemon.name}</a><div class="flex-container"></div>
    `
    document.querySelector("ul").append(li);
    const divFlexContainer = document.querySelectorAll (".flex-container")
    for (let i = 0; i < pokemon.types.length; i++) {
      const element = document.createElement("div")
      element.setAttribute("class", "types-info")
      element.setAttribute("id", pokemon.types[i].type.name)
      element.innerHTML = `
      <p class="type-container">${pokemon.types[i].type.name}</p>
    `
    divFlexContainer.forEach((index)=>{
      index.append(element)
    })
    }
  })
  let next = document.querySelector("#next")
  let previous = document.querySelector("#previous")
  next.href = `pokedex.html?limit=${limit}&offset=${offset + limit}`;
  previous.href= `pokedex.html?limit=${limit}&offset=${offset - limit}`;
}

renderPokemons()

async function getPokemonList(limit, offset){
  const response = await fetch(
  `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  // const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000")
  const data = await response.json()
  return data
}

async function getPokemonByName(name) {
  const response = await fetch ("https://pokeapi.co/api/v2/pokemon/" + name)
  const data = await response.json()
  return data
}

async function getListOfPokemonsWithSprites(pokemons) {
  return await Promise.all(pokemons.results.map(async function (pokemon){
    const data = await getPokemonByName(pokemon.name)
    return data 
  } ));
}

// async function getPokemonByURL(url) {
//   const response = await fetch ("https://pokeapi.co/api/v2/pokemon/" + type)
//   const data = await response.json()
//   return data
// }

// async function getListOfPokemonsWithSprites(pokemon) {
//   return await Promise.all(pokemon.results.map(async function (pokemon){
//     const data = await getPokemonByType(pokemon.type)
//     return data 
//   } ));
// }

function makeSearhField(){
  return `
  <serach>
    <form >
      <input type="search" name="search">
      <button type="submit"><button>
    </form>
  </search> 
  `     
}

function filterPokemons (pokemons){
  return pokemons.filter()
}

function filterCallback (pokemon){
  return getPokemonByName.name.includes(searchParam)
}