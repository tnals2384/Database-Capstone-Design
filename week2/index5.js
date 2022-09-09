const range= document.getElementById("js-range");
const maxNum =document.getElementById("display-max"); 
const result = document.getElementById("js-result");
const guess= document.getElementById("js-guess");

const handleChange = (max) => {
    maxNum.innerHTML = max;
    guess.querySelector("input").max = max;
};

const handlePlay = (e) => {
    e.preventDefault();
    
    const getRandomInt =(min,max) => {
        min=Math.ceil(min);
        max=Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
    }

    const guessNum = guess.elements[0].value;
    const machineNum = getRandomInt(0,maxNum.innerHTML);

    const displaySpan = result.querySelector("span");

    if(guessNum == machineNum) {
    displaySpan.innerHTML =`you choose: ${guessNum},
    the machine choose: ${machineNum}.<br>
    You won!`;
    }
    else {
        displaySpan.innerHTML =`you choose: ${guessNum},
    the machine choose: ${machineNum}.<br>
    You lost!`;
    }
};


guess.addEventListener("submit",handlePlay);
