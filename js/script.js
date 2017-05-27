(function () {
    //targets
    const elemGamePannel = document.querySelector('.GamePannel');
    const elemColorToFind = document.querySelector('.colorToFindDiv');
    const elemColorCreatedByPlayer = document.querySelector('.colorCreatedByPlayer');
    const redInput = document.querySelector('#red');
    const greenInput = document.querySelector('#green');
    const blueInput = document.querySelector('#blue');
    const elemColorPannelPlayer = document.querySelector('.colorPannelPlayer');
    const elemMessagesColor = document.querySelector('.messageToPlayerClue');
    const elemMessageRed = document.querySelector('.messageColorRed');
    const elemMessageGreen = document.querySelector('.messageColorGreen');
    const elemMessageBlue = document.querySelector('.messageColorBlue');
    const elemOtherMessage = document.querySelector('.messageOther');
    const buttonTry = document.querySelector('#buttonTry');
    const buttonStart = document.querySelector('#buttonStart');

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
    var colorsMessages = [];
    var i = 0;
    //message
    var message = "";

    function createRandomRgb() {
        redRandom = Math.floor(256 * Math.random());
        greenRandom = Math.floor(256 * Math.random());
        blueRandom = Math.floor(256 * Math.random());
        randomRgb = 'rgb(' + redRandom + ',' + greenRandom + ',' + blueRandom + ')';
        elemColorToFind.style.backgroundColor = randomRgb;
    }

    function addMessageToPlayer() {
        colorsMessages[i].innerHTML = message;
    }

    function comparison(colorsRandom, colorsPlayer) {
        message = "";
        colorsMessages = [elemMessageRed, elemMessageGreen, elemMessageBlue];
        colorsPlayer = [redValue, greenValue, blueValue];
        colorsRandom = [redRandom, greenRandom, blueRandom];
        var colorFound = 0;
        var color = ['red', 'green', 'blue'];
        for (i = 0; i < colorsRandom.length; i++) {
            if (colorsRandom[i] === colorsPlayer[i]) {
                message = "You've find the " + color[i];
                colorsMessages[i].classList.remove('messageFail');
                colorsMessages[i].className += " messageSuccess";
                colorFound++;
            } else if (colorsRandom[i] > colorsPlayer[i]) {
                message = 'There is not enough of ' + color[i];
                colorsMessages[i].className += " messageFail";

            } else if ((colorsRandom[i] < colorsPlayer[i]) & (colorsPlayer[i] < 255)) {
                message = 'There is too much of ' + color[i];
                colorsMessages[i].className += " messageFail";

            } else if (colorsPlayer[i] > 255) {
                message = "The maximum of each color is 255";
                colorsMessages[i].className += " messageFail";
            }
            addMessageToPlayer();
            }
            if (colorFound === colorsRandom.length) {
                elemOtherMessage.style.display = "flex";
                elemMessagesColor.remove();
                elemOtherMessage.textContent = " GREAT GAME! ";
                buttonTry.textContent = "GG!";
                return;
        }
    }

    buttonStart.addEventListener('click', function () {
        elemGamePannel.style.display = "flex";
        buttonStart.textContent = "RESTART GAME";
        createRandomRgb();
        console.log(randomRgb);
        buttonTry.addEventListener('click', function () {
            buttonTry.textContent = "RETRY";
            elemColorPannelPlayer.style.display = "flex";
            //recuperer input
            redValue = Number(redInput.value);
            greenValue = Number(greenInput.value);
            blueValue = Number(blueInput.value);
            playerRgb = `rgb(${redValue},${greenValue},${blueValue})`;
            //
            elemColorCreatedByPlayer.style.backgroundColor = playerRgb;
            comparison();
        });
    });
}());