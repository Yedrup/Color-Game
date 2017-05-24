(function () {
    "use strict";

    const redInput = document.querySelector('#red');
    const greenInput = document.querySelector('#green');
    const blueInput = document.querySelector('#blue');
    const inputs = document.querySelectorAll('input');
    const buttonTry = document.querySelector('#buttonTry');
    const buttonStart = document.querySelector('#buttonStart');
    const elemColorCreatedByPlayer = document.querySelector('.colorCreatedByPlayer');
    const elemColorToFind = document.querySelector('.colorToFindDiv');
    const elemGamePannel = document.querySelector('.GamePannel');
    var greenRandom;
    var blueRandom;
    var randomRgb;
    var redRandom;

    function createRandomRgb() {
        redRandom = Math.floor(256 * Math.random());
        greenRandom = Math.floor(256 * Math.random());
        blueRandom = Math.floor(256 * Math.random());
        randomRgb = 'rgb(' + redRandom + ',' + greenRandom + ',' + blueRandom + ')';
        elemColorToFind.style.backgroundColor = randomRgb;
    }

    buttonStart.addEventListener('click', () => {
        elemGamePannel.style.display = "flex";
        createRandomRgb();
        console.log(randomRgb);
        buttonTry.addEventListener('click', () => {
            var redValue = Number(redInput.value);
            var greenValue = Number(greenInput.value);
            var blueValue = Number(blueInput.value);
            var playerRgb = 'rgb(' + redValue + ',' + greenValue + ',' + blueValue + ')';
            elemColorCreatedByPlayer.style.backgroundColor = playerRgb;
            if ((redValue || greenValue || blueValue) > 255) {
                console.log("Remember, the maximum of each color is 255");
                //count -1
            }
        //count ++
        });
    });
}());

