
var nameAdjectives = [
"Little",
"Big",
""
];
var nameNouns = [
"Bean",
"Rump",
"Macaroni"
];




//function to handle random naming conventions
//adj + noun
function getRandomName(){

//where is the pets name going to show up on the index.html?
//this is where we figure that out.
var name = document.getElementById("petName");

//get a random adjective from our adjective list
var randomAdj = myArray[Math.floor(Math.random()*nameAdjectives.length)];
//get a random adjective from our adjective list
var randomNoun = myArray[Math.floor(Math.random()*nameNouns.length)];

//assign the pets brand-spanking-new name!
var newPetName = randomAdj + " " + randomNoun;
//return our pets cool name!
name = newPetName;
return newPetName;
}
