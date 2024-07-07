//starting with the startGame function which is called when pressing the button. It will execute the code in the block which
//will make the game visible.
function startGame() {
    const gameContainer = document.querySelector(".game-container");
    
    //Toggle the visibility of the game container
    if (gameContainer.style.display === "none") {
          gameContainer.style.display = "block";
    }
    //This part will make the button disappear with the into and resetting the board to 0. 
    document.getElementById("button-83").style.display = "none";
    document.getElementById("paragraph1").style.display = "none";
    document.getElementById("paragraph2").style.display = "none";
    document.getElementById("paragraph3").style.display = "none";
    userScore = 0;
    computerScore = 0;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
}

//Declaring the variables with starting value of 0
let userScore=0;
let computerScore=0;

//declaring the variables using the DOM with the id's and classes from the html file
const userScore_span=document.getElementById("user-score");
const computerScore_span=document.getElementById("computer-score");
const scoreBoard_div=document.querySelector(".board");
const rockButton = document.getElementById("r");
const paperButton = document.getElementById("p");
const scissorsButton = document.getElementById("s");
const result_p = document.getElementById("result_p");

//setting the winning score to 3 which will be the max score to win the game
const winningScore = 3;

/*making a function to get the random choice from the computer. We are giving the computer 3 choices, which are
going to be randomly picked using math.random method and math.floor method which will round the given random number.
this function will later be called in the gameChoices function to compare it with the user choice.*/
function getComputerChoice(){
    const choices=['r','p','s'];
    const randomNumber=Math.floor(Math.random()*3);
    return choices[randomNumber];
}
//function for adding points to the user and updating it on the board, which will be called everytime when the user wins a round.
//also after the added point the function will perform another function for checking if we have a winner.
function pointUser(){
    userScore++;
    userScore_span.innerHTML=userScore;
    checkWinner();
}

//same as previous function but for the computer
function pointComputer(){
    computerScore++;
    computerScore_span.innerHTML=computerScore;
    checkWinner();
}

/*function named gameChoices for comparison between the user choice and the computer choice. We passed the new variable computerChoice
where is stored the random choice from the computer. Then using switch statment with true condition we are comparing
the choices in 4 cases. One is for the tie, 3 are for our winning conditions and the default for the losing condition.
In every case we are updationg the result paragraph with the coresponding message and calling the function for adding the points,
except for the first case where the points are not changed.*/
function gameChoices(userChoice){
    const computerChoice=getComputerChoice();
    switch (true){
        case userChoice === computerChoice: 
            result_p.innerHTML="It's a tie!";
            break;
        case userChoice === "r" && computerChoice === "s":
            pointUser();
            result_p.innerHTML="Rock crushes scissors. You win!";
            break;
        case userChoice === "p" && computerChoice === "r":
            pointUser();   
            result_p.innerHTML="Paper covers rock. You win!";
            break;
        case userChoice === "s" && computerChoice === "p":
            pointUser();
            result_p.innerHTML="Scissors cut paper. You win!";
            break;
        default:
            pointComputer();
            result_p.innerHTML="Bad move.You lose!";
            break;
    }}

/*Function for the button. We are using the addEventListener method to add the click event to the button
Also clicking the button we are calling the gameChoices function and passing the user's choice as a parameter r,p or s.*/
function buttons(){
    rockButton.addEventListener('click', function(){
        gameChoices("r");
    })

    paperButton.addEventListener('click', function(){
        gameChoices("p");
    })
    scissorsButton.addEventListener('click', function(){
        gameChoices("s");
    })
}
buttons();

//getting the result message from the html file
let resultMessage =document.getElementById("winner");

//function for checking the winner. We are calling every time when adding the points in the previous functions already explained.
//using switch statment we are comparing the scores and if the user or computer score is  equal to the winning score we are
//displaying the message in the result message paragraph.Also in very case we are calling the fuction for resetting the scores.
function checkWinner() {
    switch (true) {
        case userScore == winningScore:
            resultMessage.innerHTML= "Congratulations! You won the match!";
            reset();
            break;
        case computerScore == winningScore:
            resultMessage.innerHTML = "Oops! You lost the match.";
            reset();
            break;

        case computerScore===3 && userScore===3:
            resultMessage.innerHTML = "It's a tie! Try again";
            reset();
            break;
        default:
            break;
            
    }
}
// Reset scores and updates the board after 1.3seconds so that the user can see the final result and the message clearly.
function reset() {
        setTimeout(() => {
        // Reset scores after a 2-second delay
        userScore = 0;
        computerScore = 0;
        resultMessage.innerHTML="";
        result_p.innerHTML="";
        userScore_span.innerHTML = userScore;
        computerScore_span.innerHTML = computerScore;
        }, 1300); 
}
