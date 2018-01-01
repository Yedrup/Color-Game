(function () {
    //targets
    const elemGamePannel = document.getElementsByClassName('js-game-pannel')[0];
    const elemColorToFind = document.getElementsByClassName('js-random-color')[0];
    const elemColorCreatedByPlayer = document.getElementsByClassName('js-player-color')[0];
    const redInput = document.getElementById('js-input-red');
    const greenInput = document.getElementById('js-input-green');
    const blueInput = document.getElementById('js-input-blue');
    const elemForm = document.getElementsByClassName('js-answers')[0];
    const elemColorPannelPlayer = document.getElementsByClassName('js-color-panel-player')[0];
    const elemMessagesColor = document.getElementsByClassName('js-messages-clue')[0];
    const elemMessageRed = document.getElementsByClassName('js-message-red')[0];
    const elemMessageGreen = document.getElementsByClassName('js-message-green')[0];
    const elemMessageBlue = document.getElementsByClassName('js-message-blue')[0];
    const elemOtherMessage = document.getElementsByClassName('js-message-great-game')[0];
    const buttonTry = document.getElementsByClassName('js-button-try')[0];
    const buttonStart = document.getElementsByClassName('js-button-start')[0];

    //values player
    var redValue;
    var greenValue;
    var blueValue;
    var playerRgb;
    //values Random
    var greenRandom;
    var blueRandom;
    var redRandom;
    var randomRgb;
    //Arays
    var colorsPlayer = [];
    var colorsRandom = [];
    var colorsMessages = [];
    //message
    var message = "";

    //count
    var colorFound;
    var countOfTry;
    var i;


    function changeState(elem) {
        elem.classList.remove("hide");
        elem.classList.add("show");
    }

    function initialize() {
        elemOtherMessage.style.display = "none";
        elemColorPannelPlayer.style.display = "none";
        elemMessagesColor.style.display = "none";
        message = "";
        elemGamePannel.insertBefore(elemMessagesColor, buttonTry);
        elemColorCreatedByPlayer.style.backgroundColor = "transparent";
        changeState(elemGamePannel);
        elemForm.reset();
        console.log("je passe par initialize");
        buttonTry.textContent = "TRY";
    }

    function createRandomRgb() {
        redRandom = Math.floor(256 * Math.random());
        greenRandom = Math.floor(256 * Math.random());
        blueRandom = Math.floor(256 * Math.random());
        randomRgb = `rgb(${redRandom},${greenRandom},${blueRandom})`;
        elemColorToFind.style.backgroundColor = randomRgb;
    }

    function addMessageToPlayer() {
        colorsMessages[i].innerHTML = message;
    }

    function comparison(colorsRandom, colorsPlayer) {
        colorFound = 0;
        colorsMessages = [elemMessageRed, elemMessageGreen, elemMessageBlue];
        colorsPlayer = [redValue, greenValue, blueValue];
        colorsRandom = [redRandom, greenRandom, blueRandom];
        var color = ['red', 'green', 'blue'];
        for (i = 0; i < colorsRandom.length; i++) {
            if (colorsRandom[i] === colorsPlayer[i]) {
                message = "You've find the " + color[i];
                colorsMessages[i].classList.remove('message--fail');
                colorsMessages[i].className += " message--success";
                colorFound++;
            } else if (colorsPlayer[i] === "") {
                message = "at least one number :)";
                colorsMessages[i].className += " message--fail";
            } else if (colorsRandom[i] > colorsPlayer[i]) {
                message = 'There is not enough of ' + color[i];
                colorsMessages[i].className += " message--fail";
            } else if ((colorsRandom[i] < colorsPlayer[i]) && (colorsPlayer[i] < 256)) {
                message = 'There is too much of ' + color[i];
                colorsMessages[i].className += " message--fail";
            } else if (colorsPlayer[i] > 255) {
                message = "The maximum of each color is 255";
                colorsMessages[i].className += " message--fail";
            } else if (isNaN(colorsPlayer[i])) {
                message = "it's not a number :)";
                colorsMessages[i].className += " message--fail";
            }
            addMessageToPlayer();
            if (colorFound === colorsRandom.length) {
                elemOtherMessage.style.display = "flex";
                elemMessagesColor.remove();
                buttonTry.textContent = "GG!";
                elemOtherMessage.textContent = " GREAT GAME! ";
                return;
            }
        }
    }
    buttonStart.addEventListener('click', function () {
        initialize();
        buttonStart.textContent = "RESTART GAME";
        createRandomRgb();
        console.log(randomRgb);
        //function at try
        buttonTry.addEventListener('click', function () {
            buttonTry.textContent = "RETRY";
            elemColorPannelPlayer.style.display = "flex";
            elemMessagesColor.style.display = "block";

            //recuperer input
            if (redInput.value !== "" && redInput.value.length  > 0)  {
                redValue = Number(redInput.value);
            }
            if (greenInput.value !== "" && greenInput.value.length > 0)  {
                greenValue = Number(greenInput.value);
            }
            if (blueInput.value !== "" && blueInput.value.length > 0)  {
                blueValue = Number(blueInput.value);
            }
            
            playerRgb = `rgb(${redValue},${greenValue},${blueValue})`;
            elemColorCreatedByPlayer.style.backgroundColor = playerRgb;
            comparison();
        });
        document.addEventListener('keydown', function (event) {
            if (event.keyCode === 13) {
                buttonTry.click();
                event.preventDefault();
            }

        });
    });




})();