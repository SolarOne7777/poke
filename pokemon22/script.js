document.addEventListener("DOMContentLoaded", function() {
    // When the page is fully loaded, execute this function
    // Fetch data for all 151 original Pokémon from PokeAPI
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(response => response.json())
        .then(data => { 
            // Extract the container for the Pokémon list
            const pokemonList = document.getElementById("pokemonList");

            // Iterate through each Pokémon data
            data.results.forEach(pokemon => {
                // Fetch detailed data for each Pokémon
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokemonData => {
                        // Create a container for each Pokémon card
                        const pokemonCard = document.createElement("div");
                        pokemonCard.classList.add("pokemon-card");

                        // Display Pokémon name
                        const name = document.createElement("div");
                        name.classList.add("pokemon-name");
                        name.innerText = pokemonData.name;

                        // Display Pokémon image
                        const image = document.createElement("img");
                        image.classList.add("pokemon-image");
                        image.src = pokemonData.sprites.front_default;
                        image.alt = pokemonData.name;

                        // Display Pokémon data (height and weight)
                        const dataContainer = document.createElement("div");
                        dataContainer.classList.add("pokemon-data");
                        dataContainer.innerHTML = `
                            <p>Height: ${pokemonData.height}</p>
                            <p>Weight: ${pokemonData.weight}</p>
                        `;

                        // Append name, image, and data to the Pokémon card
                        pokemonCard.appendChild(name);
                        pokemonCard.appendChild(image);
                        pokemonCard.appendChild(dataContainer);

                        // Append the Pokémon card to the Pokémon list
                        pokemonList.appendChild(pokemonCard);
                    });
            });
        });
});
