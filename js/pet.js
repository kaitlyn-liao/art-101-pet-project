let nameAdjectives = [
    "Little",
    "Big",
    "Madame",
    "Mister",
    "Tiny",
    "Sir",
    "Princess",
    ""
];
let nameNouns = [
    "Bean",
    "Rump",
    "Potato",
    "Avocado",
    "Raspberry",
    "Muffin",
    "Bumble",
    "Macaroni"
];
//fetch the image of the current pet
var petImage = document.getElementsByClassName('profile-img');
//add an event listener for the current pet being rolle

// Stores a list of all the Pet Objects that we adopted
let g_adoptedPets = [];

// Not sure how to do this yet but we will set it to a Pet object
let g_currentPet = {};

// Global Variables for Settings
let g_colorPref = "";
let g_breedPref = "";


// CONSOLE LOG FOR TESTING OUR FUNCTIONS
// console.log(getRandomName());

//function to handle random naming conventions
//adj + noun
function getRandomName() {
    //where is the pets name going to show up on the index.html?
    //this is where we figure that out.

    //get a random adjective from our adjective list
    var randomAdj = nameAdjectives[Math.floor(Math.random() * nameAdjectives.length)];
    //get a random adjective from our adjective list
    var randomNoun = nameNouns[Math.floor(Math.random() * nameNouns.length)];

    //assign the pets brand-spanking-new name!
    var newPetName = randomAdj + " " + randomNoun;
    //return our pets cool name!
    return newPetName;
}


// This function will take the user inputs from a dropdown
// list of pet color and breed options. It will set global
// variables that indicate the user settings.
function setFilters(color_pref, breed_pref) {
    g_colorPref = color_pref;
    g_breedPref = breed_pref;
}

// FOR ARIANA
// FUNCTION USING API
// This function will make a GET call to access our API and
// return a random fact or random joke.
function getRandomFact() {

}

// this function will pull from our json file to get a random pet
function getRandomPet() {
    var pet = {};
    var pet_name = getRandomName();
    fetch("./pets.json",)
        .then(response => {
            // console.log(response.json());
            return response.json();
        })
        .then(data => {
            console.log(data);
            // gets random pet object 
            var random_idx = Math.floor( Math.random() * 9 );
            pet = data.pets[random_idx];
            // set name to name field of pet object
            pet.name = pet_name;
            g_currentPet = pet;
            console.log(pet);
            displayPet();
        });
}


// This function will be called every time the user clicks the
// next pet button on the UI. It will call getRandomFact()/getRandomJoke()
// and set the return to a variable. Next it will call getRandomPet()
// and save it to the global variable g_current_pet. Then it will call
// getRandomName and it will set the name field of the global variable
// g_current_pet. Finally it will use jQuery to display the pet’s image,
// name, extras, and the random fact/joke.
function displayPet() {
    let fact = getRandomFact();

    // displays name on webpage
    document.getElementById("petName").innerHTML = g_currentPet.name;
    // displays img on webpage
    document.getElementById("pet-image").src = g_currentPet.img;
}

// This function will be called every time the user clicks
// the Adopt Me button on the UI.
function adoptPet() {
    // First it will check if the array is full (max length will be 6).
    if (g_adoptedPets.length == 6) {
        // If it is ‘full’ we will remove the first pet in the array
    }
    g_adoptedPets.append(g_currentPet);

    // LOOP THROUGH LIST AND DISPLAY ON WEBPAGE

    // ---------- THIS FUNCTION NOT DONE ----------------

}

function getRandomColor() {
    var colorLetters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += colorLetters[Math.floor(Math.random() * 16)];
    }

    return color;
}
