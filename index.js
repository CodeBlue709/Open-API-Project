document.addEventListener('DOMContentLoaded', () => {
    const publicKey = "fa26200d875116a518e6dee26e80526f";
    const apiBaseURL = "https://gateway.marvel.com/v1/public/";

    const headerText = document.getElementById("header-text");
    const characterRosterDiv = document.getElementById("character-roster");
    const charactersContainer = document.getElementById("characters-container");
    const characterDataSection = document.getElementById("character-data");
    const mainNav = document.getElementById("main-nav")

    const char1Link = document.getElementById("char1-link");
    const char2Link = document.getElementById("char2-link");

    const fetchCharacters = (charSet) => {
        let endpoint;
        if (charSet === 1) {
            endpoint = 'characters?limit=10';
        } else {
            endpoint = 'characters?offset=10&limit=10';
        }
        fetch(`${apiBaseURL}${endpoint}&ts=1&apikey=${publicKey}&hash=2f986b8ec81a019b55b28be50325be18`)
            .then(response => response.ok ? response.json() : Promise.reject('Failed to fetch data'))
            .then(data => {
                const characters = data.data.results.filter(character => !character.thumbnail.path.includes('image_not_available'));
                renderCharacterList(characters);
            })
            .catch(error => console.error('Error:', error));
    };

    const renderCharacterList = (characters) => {
        characterRosterDiv.innerHTML = '';
        characters.forEach(character => {
            const listItem = document.createElement('li');
            const img = document.createElement('img');
            const caption = document.createElement('figcaption');

            img.src = `${character.thumbnail.path}/portrait_xlarge.jpg`;
            img.alt = character.name;
            caption.textContent = character.name;

            img.onerror = () => listItem.remove();

            listItem.appendChild(img);
            listItem.appendChild(caption);
            characterRosterDiv.appendChild(listItem);

            img.addEventListener('click', () => displayCharacterData(character, img.src));
        });
    };

    const displayCharacterData = (character, imgSrc) => {
        let description;

        // Provide fallback descriptions for certain characters
        switch (character.name) {
            case "3-D Man":
                description = `An American test pilot, Charles Chandler was abducted by Skrulls looking to use Earth as a strategic position in their war with the Kree...`;
                break;

            case "Absorbing Man":
                description = `Carl "Crusher" Creel aka the Absorbing Man was an American professional Heavyweight boxer turned enforcer.
                    While locked up in prison he was mutated using Asgardian magic by the trickster god Loki using a special potion. 
                    Creel obtained his ability to absorb the properties of anything he touches and used his new-found power 
                    to break free from prison and soon became a villain for hire.`;
                break;

            case "Abyss":
                description = `This specimen was an Abyss carried as an egg along with her brother the Gardener Ex Nihilo by an Aleph...`;
                break;

            case "Abyss (Age of Apocalypse)":
                description = `Abyss is one of the four Horsemen as well as Nightcrawler's half-brother...`;
                break;

            case "Agatha Harkness":
                description = `Agatha Harkness, an ancient and formidable sorceress, possesses a mystical legacy that spans centuries...`;
                break;

            case "Agent Brand":
                description = `Abigail "Brand" Thanriaguiaxus is a half-alien half-human mutant agent of S.W.O.R.D...`;
                break;

            case "Agent Zero":
                description = `Born in the former East Germany, Christoph Nord was an idealist who fought against the communist regime
                    as a freedom fighter for the West German Cell Six. Nord's brother Andreas fought for the East Germans, 
                    and when the two met in battle, Nord was forced to kill him in cold blood.`;

                break;
            case "Agents of Atlas":
                description = `One of the most inscrutable, pervasive, and enduring secret societies on Earth, 
                    the Atlas Foundation traditionally pursued world domination but currently uses 
                    its covert power and influence for humanity's greater good.`;
                break;
            default:
                description = character.description || "No description available.";
        }

        charactersContainer.style.display = 'none';
        headerText.style.display = 'none';
        mainNav.style.display = 'none';
        characterDataSection.style.display = 'flex';
        characterDataSection.innerHTML = `
            <div>
                <h1>${character.name}</h1>
                <img src="${imgSrc}" alt="${character.name}">
                <p>${description}</p>
            </div>
            <button id="return-btn">RETURN</button>
        `;
        document.getElementById('return-btn').addEventListener('click', () => {
            characterDataSection.style.display = 'none';
            mainNav.style.display = 'flex';
            charactersContainer.style.display = 'flex';
            headerText.style.display = 'block';
        });
    };

    char1Link.addEventListener('click', (e) => {
        e.preventDefault();
        fetchCharacters(1);
    });

    char2Link.addEventListener('click', (e) => {
        e.preventDefault();
        fetchCharacters(2);
    });

    // Fetch initial character set
    fetchCharacters(1);
});
