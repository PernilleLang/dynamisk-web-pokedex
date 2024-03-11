const params = new URLSearchParams(location.search)
const textbox = document.getElementById("pokemon-class")

async function getPokemon (name){
const response = await fetch ("https://pokeapi.co/api/v2/pokemon/" + name);
const pokemon = await response.json();
return pokemon
}

async function newRenderPokemon() {
    const pokemon = await getPokemon(params.get("name"))
    let article = document.createElement("article")
    let h1 = document.createElement ("h1")
    h1.innerHTML = pokemon.name
    let img = document.createElement("img")
    img.src = pokemon.sprites.other.dream_world.front_default
    article.append(h1)
    article.append(img)
    document.body.append(article)
}

newRenderPokemon()

function pokemonInfoBox () {
    console.log(textbox)
    getPokemon (params.get("name"))
    .then((pokemon)=>{
        textbox.innerHTML=`
    <p>height: ${pokemon.height}</p>
    <p>weight: ${pokemon.weight}</p>
    <p>${pokemon.stats[0].stat.name}: ${pokemon.stats[0].base_stat}</p>
    <p>${pokemon.stats[1].stat.name}: ${pokemon.stats[1].base_stat}</p>
    <p>${pokemon.stats[2].stat.name}: ${pokemon.stats[2].base_stat}</p>
    <p>${pokemon.stats[3].stat.name}: ${pokemon.stats[3].base_stat}</p>
    <p>${pokemon.stats[4].stat.name}: ${pokemon.stats[4].base_stat}</p>
    <p>${pokemon.stats[5].stat.name}: ${pokemon.stats[5].base_stat}</p>
    `
    })
    
}

pokemonInfoBox()



/* <p>Category: ${pokemon.category}</p>
<p>Ability: ${pokemon.abilities[0].ability.name}</p> */