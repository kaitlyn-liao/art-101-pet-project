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

// Will hold the pet data of the current displayed pet
let g_currentPet = {};

// Will hold the current random fact
let g_currentFact = "";

// Global Variables for Settings
let g_colorPref = "";
let g_breedPref = "";

// API endpoint
var apiEndpoint = "https://useless-facts.sameerkumar.website/api";

function main() {
    getRandomPet();
}

// FUNCTION USING API
// This function will make a GET call to access our API and
// return a random fact
function getRandomFact() {
    console.log("Doing API Stuff");
    $.ajax({
        // The URL for the request
        url: apiEndpoint,
        // The data to send (will be converted to a query string)
        data: {},
        // Whether this is a POST or GET request
        type: "GET",
        // The type of data we expect back
        dataType: "json",
        // If the request succeeds
        success: function (data) {
            // turn data object into string just so we can display it
            var textData = JSON.stringify(data);
            // get the individual values from data object
            g_currentFact = data.data;
            console.log("Success:", textData);
        }
    })
        // If the request fails
        .fail(function (xhr, status, errorThrown) {
            console.log("Failure.");
            putTextOnPage(errorThrown + " Status:" + status);
        })
    console.log("Asynchronously doing the next thing.");
}

//function to handle random naming conventions
//adj + noun
function getRandomName() {
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

// this function will pull from our json file to get a random pet
function getRandomPet() {
    var pet = {};
    var pet_name = getRandomName();
    getRandomFact();
    fetch("./pets.json",)
        .then(response => {
            // console.log(response.json());
            return response.json();
        })
        .then(data => {
            console.log(data);
            // gets random pet object
            var random_idx = Math.floor(Math.random() * 9);
            // console.log(random_idx);
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

    // displays name on webpage
    document.getElementById("petName").innerHTML = g_currentPet.name;
    // displays img on webpage
    document.getElementById("pet-image").src = g_currentPet.img;
    //set the color
    g_currentPet.color = getRandomColor();
    document.getElementById("pet-image").style.backgroundColor = g_currentPet.color;
    // displays fact on webpage
    document.getElementById("random-fact").innerHTML = g_currentFact;
    // displays adopted pets on webpage
    let adoptPetStr = ""
    // LOOP THROUGH ADOPTED LIST AND DISPLAY ON WEBPAGE
    if (g_adoptedPets.length != 0) {
        for (i = 0; i < g_adoptedPets.length; i++) {
            if (g_adoptedPets[i].type == 'bunny')
                adoptPetStr += "<div><img id='bunny' src=" + g_adoptedPets[i].img + " style= 'background-color:" + g_adoptedPets[i].color + ";''" + ">" + g_adoptedPets[i].name + "</div>";
            else if (g_adoptedPets[i].type == 'cat')
                adoptPetStr += "<div><img id='cat' src=" + g_adoptedPets[i].img + " style= 'background-color:" + g_adoptedPets[i].color + ";''" +">"  + g_adoptedPets[i].name + "</div>";
            else
                adoptPetStr += "<div><img id='profile-img' src=" + g_adoptedPets[i].img + " style= 'background-color:" + g_adoptedPets[i].color + ";''" +">"  + g_adoptedPets[i].name + "</div>";
        }
    }
    document.getElementById("adopted-pets").innerHTML = adoptPetStr;
}

// This function will be called every time the user clicks
// the Adopt Me button on the UI.
function adoptPet() {
    // First it will check if the array is full (max length will be 6).
    if (g_adoptedPets.length == 8) {
        // If it is ‘full’ we will remove the first pet in the array
        let removed_pet = g_adoptedPets.pop();
        console.log(removed_pet);
    }
    // add current pet to beginning of list
    g_adoptedPets.unshift(g_currentPet);
    getRandomPet();
}

function getRandomColor() {
    var colorLetters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += colorLetters[Math.floor(Math.random() * 16)];
    }

    return color;
}

main();
