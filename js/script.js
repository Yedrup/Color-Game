(function () {
    "use strict";
    //targets
    const redInput = document.querySelector('#red');
    const greenInput = document.querySelector('#green');
    const blueInput = document.querySelector('#blue');
    const inputs = document.querySelectorAll('input');
    const buttonTry = document.querySelector('#buttonTry');
    const buttonStart = document.querySelector('#buttonStart');
    const elemColorCreatedByPlayer = document.querySelector('.colorCreatedByPlayer');
    const elemColorToFind = document.querySelector('.colorToFindDiv');
    const elemGamePannel = document.querySelector('.GamePannel');
    //values player
    var redValue;
    var greenValue;
    var blueValue;
    var playerRgb;
     //values Random
    var greenRandom;
    var blueRandom;
    var randomRgb;
    var redRandom;
    //Arays
    var colorsPlayer = [];
    var colorsRandom = [];

    function createRandomRgb() {
        redRandom = Math.floor(256 * Math.random());
        greenRandom = Math.floor(256 * Math.random());
        blueRandom = Math.floor(256 * Math.random());
        randomRgb = 'rgb(' + redRandom + ',' + greenRandom + ',' + blueRandom + ')';
        elemColorToFind.style.backgroundColor = randomRgb;
    }

    function comparison(colorsRandom, colorsPlayer) {
        colorsPlayer = [redValue, greenValue, blueValue];
        colorsRandom = [redRandom, greenRandom, blueRandom];
        var colorFound = 0;
        var color = ['red','green','blue'];
        for (var i = 0; i < colorsRandom.length; i++) {
            if (colorsRandom[i] === colorsPlayer[i]) {
                console.log("you've find the " + color[i]);
                colorFound ++;
                console.log(colorFound);
                if (colorFound === colorsRandom.length) {
                    console.log("GREAT GAME!");
                    return;
                }
            } else if (colorsRandom[i] > colorsPlayer[i]) {
                console.log('There is not enough of ' + color[i]); 
            } else if(colorsRandom[i] < colorsPlayer[i]) {
                console.log('There is too much of ' + color[i]); 
            } else if (colorsPlayer[i] > 255) {
                console.log("Remember, the maximum of each color is 255");
            } 
        }
    }

    buttonStart.addEventListener('click', () => {
        elemGamePannel.style.display = "flex";
        createRandomRgb();
        console.log(randomRgb);
        buttonTry.addEventListener('click', () => {
            //recuperer input
            redValue = Number(redInput.value);
            greenValue = Number(greenInput.value);
            blueValue = Number(blueInput.value);
            playerRgb = 'rgb(' + redValue + ',' + greenValue + ',' + blueValue + ')';
            //
            elemColorCreatedByPlayer.style.backgroundColor = playerRgb;
            comparison();
        //count ++
        });
    });
}());

