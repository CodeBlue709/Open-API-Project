const privateKey = "ee18589087a30b2a389162ffd577fa0a23ca6f2b";
const publicKey = "fa26200d875116a518e6dee26e80526f";

const apiBaseURL = "https://gateway.marvel.com/v1/public/ ";

const characterRosterDiv = document.getElementById("character-roster")

fetch("http://gateway.marvel.com/v1/public/characters?ts=1&apikey=fa26200d875116a518e6dee26e80526f&hash=2f986b8ec81a019b55b28be50325be18",{
    method: "GET",
})

.then(res => { //checks to see if fetched link is incorrect
    if(!res.ok){
        throw new Error('Oops')
    }
    return res.json()
})

.then(characters => {
    
    let charArray = []; //stores character image data
    
    //This Loop gets character Image data and pushes it to charArray
    for(let i = 0; i < characters.data.results.length; i++){
        const characterImg = characters.data.results[i].thumbnail.path + "/portrait_xlarge.jpg"
        charArray.push(characterImg)
    }

    console.log(charArray)

    //each character from the array is rendered onto the page inside a list item
    charArray.forEach(character => {
        let list = document.createElement('li');
        list.innerHTML = `<img src = "${character}" alt ="Marvel Character "></img>`
        characterRosterDiv.appendChild(list)
    })
}
     
)
.catch(error => console.log(error))