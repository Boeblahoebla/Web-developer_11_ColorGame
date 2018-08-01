//////////////////////
// Global variables //
//////////////////////

var colors = generateRandomColors(6);

var squares = document.querySelectorAll(".square");
var squaresHard = document.querySelectorAll(".hard");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("rgbToGuess");
var message = document.getElementById("message");

// .. Buttons
var resetButton = document.getElementById("reset");
var easyButton = document.getElementById("easy");
var hardButton = document.getElementById("hard");

// .. Headers
var h1 = document.querySelector("h1");
var h4 = document.querySelector("h4");

// .. Eventlisteners
resetButton.addEventListener("click", resetGame);
easyButton.addEventListener("click", changeToEasyGame);
hardButton.addEventListener("click", changeToHardGame);

/////////////////////
// Logic goes here //
/////////////////////

colorDisplay.textContent = pickedColor;
setupGame();

// Function to reset a game
function resetGame() {
    resetButton.textContent = "Reset colors";
    // generate all new colors
    colors = generateRandomColors(6);
    // pick a new random color from the array
    pickedColor = pickColor();
    // change the color display to match the picked color
    colorDisplay.textContent = pickedColor;
    // change the colors of the squares
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];
    }
    // reset the background color of the h1
    h1.style.background = "steelblue";
}

// Function to setup a game
function setupGame() {
    for (var i = 0; i < squares.length; i++) {
        // add initial colors to squares
        squares[i].style.background = colors[i];

        // add clicklisteners to squares
        squares[i].addEventListener("click", function() {
            var clickedColor = this.style.background;
            console.log(clickedColor)
            console.log("you have picked " + clickedColor + " while the color was " + pickedColor);

            if (clickedColor === pickedColor) {
                message.textContent = "Correct!";
                changeColors(clickedColor);
                h1.style.background = clickedColor;
                resetButton.textContent = "Play again?";
            } else {
                this.style.fade = '2000';
                this.style.background = '#232323';
                message.textContent = "Try again";
            }
        });
    }
}

// Function to change to an easy game
function changeToEasyGame() {
    // Style the buttons
    easyButton.classList.add("selected");
    hardButton.classList.remove("selected");

    // Create 3 random colors of which 1 random color to pick
    colors = generateRandomColors(3);
    pickedColor = pickColor();

    // Update the header with picked color & reset its background
    colorDisplay.textContent = pickedColor;
    h1.style.background = "steelblue";

    // Hide the last 3 squares
    for (var i = 0; i < squaresHard.length; i++) {
        squaresHard[i].style.display = "none";
    }

    // start the game
    setupGame();
}

// Function to change to a hard game
function changeToHardGame() {
    // Style the buttons
    hardButton.classList.add("selected");
    easyButton.classList.remove("selected");

    // Create 6 random colors of which 1 random color to pick
    colors = generateRandomColors(6);
    pickedColor = pickColor();

    // Update the header with picked color & reset its background
    colorDisplay.textContent = pickedColor;
    h1.style.background = "steelblue";

    // Make sure the last 3 squares are usable in the game
    for (var i = 0; i < squaresHard.length; i++) {
        squaresHard[i].style.display = "block";
    }

    // start the game
    setupGame();
}


// Helper function to generate 6 random colors
function generateRandomColors(num) {
    // Make an array
    var colorsArray = []
        // Add num random colors to array
    for (var i = 0; i < num; i++) {
        // Get random color & push to array
        R = Math.floor(Math.random() * 255, 1);
        G = Math.floor(Math.random() * 255, 1);
        B = Math.floor(Math.random() * 255, 1);

        rgbValue = "rgb(" + R + ", " + G + ", " + B + ")";
        console.log(rgbValue);
        colorsArray.push(rgbValue);
    }
    // return array
    return colorsArray;
}

// Helper function to pick a random color from the colors array
function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// Helper function to change the color of the squares
function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }
}