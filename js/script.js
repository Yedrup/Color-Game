const redInput = document.querySelector('#red');
const greenInput = document.querySelector('#green');
const blueInput = document.querySelector('#blue');

const button = document.querySelector('#button');
const elemColorCreatedByPlayer = document.querySelector('.colorCreatedByPlayer');
const elemColorToFind = document.querySelector('.colorToFindDiv');

// const = document.querySelector();

// blue.style.color = "red";

button.addEventListener('click', () => {
    let redValue = Number(redInput.value);
    let greenValue = Number(greenInput.value);
    let blueValue = Number(blueInput.value);
    let playerRgb = 'rgb(' + redValue + ',' + greenValue + ',' + blueValue + ')';

    elemColorCreatedByPlayer.style.backgroundColor = playerRgb;
    console.log(playerRgb);
    console.log(greenValue);
    console.log(blueValue);
});
