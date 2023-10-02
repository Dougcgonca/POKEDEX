
const container = document.querySelector('#container')
const pokemonCont = 40
const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};
const mainType = Object.keys(colours)





const fetchPokemons = async () => {
    for (let index = 1; index <= pokemonCont; index++) {
        await getPokemons(index)
        
        
    }
}


const getPokemons = async (id) => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await resp.json()
    createPokemonCard(data)
    console.log(data)
    addClick(data)
    

}

const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')

    const Poketype = poke.types.map(type => type.type.name)
    const types = mainType.find(type => Poketype.indexOf(type) > -1)
    const color = colours[types]

   
    const cardInnerHTML = `
       <div class="pokemon" style="background-color: ${color};">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png">
    <div class="number">${id}</div>
    <h2 class="nome">${name}</h2>
    <div class="type">${types}</div>
    </div>
`;
    card.innerHTML = cardInnerHTML
    container.appendChild(card)

    card.addEventListener('click', async () =>{
   
            
    
        addClick(poke, color);
      });
    }
   

    
     



const addClick = (poke, color) => { 
    const specsExist = container.querySelector('.specifications')
    if (specsExist) {
        container.removeChild(specsExist)
        return
    }

   const specifications = document.createElement('div')
   specifications.classList.add('specifications');
   specifications.style.backgroundColor = color
   
   specifications.innerHTML = `
   <h3>${poke.name[0].toUpperCase() + poke.name.slice(1)}</h3><br><br>
   Ataque:${poke.stats[1].base_stat.toString()}<br><br>
   velocidade: ${poke.weight.toString()}<br><br>
   peso: ${poke.stats[5].base_stat.toString()}
   `
   
   container.appendChild(specifications)

}


fetchPokemons()

