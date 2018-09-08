// initialize game variables
var userAttack = 0;
var userHealth = 0;
var enemyHealth = 0;
var enemyAttack = 0;
var userChar = [];  //character uses selected
var enemyChar = []; //char enemy selects to fight
var numEnemies = 3; //3 enemies to fight
var userAlive = true;
var gameStart = 2;

//create character objects
var obiwan = {attack:4, health:150, name:"ObiWan Kenobi",display:$(".obiwan"),fightdisplay:$(".obiwan-arena"),enemydisplay:$(".obiwan-enemy")};
var luke = {attack:5, health:140, name: "Luke Skywalker", display:$(".luke"),fightdisplay:$(".luke-arena"),enemydisplay:$(".luke-enemy") };
var maul = {attack:3, health:180, name: "Darth Maul",display:$(".maul"),fightdisplay:$(".maul-arena"),enemydisplay:$(".maul-enemy")};
var sidious = {attack:4, health:140, name: "Darth Sidious",display:$(".sidious"),fightdisplay:$(".sidious-arena"),enemydisplay:$(".sidious-enemy")};

//One element on page dynamically displays additional information to user.
var gameStatusDisplay = $("game-status");

// function used in game

function resolveAttack () {
/* This function executes each time the user clicks the attack button. It accomplishes the following:
    1) Increment user attack by its base level
    2) Decrement attack value from user health
    3) Determine if enemy is dead
    4) Determine if user is dead
    5) display user and ememy health
    6) Display message depending on health conditions */

    //increment user character attack by its base value
    userAttack += window[userChar].attack;
    console.log("user attack "+ userAttack);

    //do user attack first to determine whether we kill the dueling opponent first
    enemyHealth -= userAttack;
    console.log("enemy health "+ enemyHealth);

    if (enemyHealth <= 0) //did we kill the opponent?
    {
        enemyHealth = 0;    //let's avoid a negative number being display
        numEnemies--;   //number of combatants is reduced
    }
    else {//enemy still alive 
        userHealth -= enemyAttack;
        if (userHealth <= 0)    //did we die?
        {
            userHealth = 0;
            userAlive = false;  //we ded
        }
    }
    //Update user and enemy health display
    window[userChar].health = userHealth;
    window[enemyChar].health = enemyHealth;
    $("."+ userChar+"-health").text(userHealth);
    $("."+ enemyChar+"-health").text(enemyHealth);
    //window[userChar].display;
    //window[enemyChar].display.text(enemyHealth);

    if(enemyHealth === 0 && !numEnemies) {

        //did you defeat the last enemy?
        alert("You have defeated all enemies! To reset the game hit restart.");
        $(".attack").addClass("invisible");
        $(".reset").removeClass("invisible");
    }
    else if (!userAlive)
    {
        alert("You were defeated. Press restart to play again.");
        $(".attack").addClass("invisible");
        $(".reset").removeClass("invisible");
    }
    else if(enemyHealth === 0)
    {
        alert("You have defeated " + window[enemyChar].name +". Please select another character to duel.");
        
        //clean up fighter box and allow user to select another character to duel
        window[enemyChar].enemydisplay.removeClass("d-block"); 
        window[enemyChar].enemydisplay.addClass("d-none");
        gameStart = 1;    //okay we can select another character
    }
    else
        gameStart = gameStart;  //i dunno had to fill the else for now
}

function resetGame() {
    /* The intention of this function is to reset the game. It is invoked:
    1) If game is loaded first time
    2) If reset button is pressed */
    userAttack = 0;
    userHealth = 0;
    enemyHealth = 0;
    enemyAttack = 0;
    userChar = [];  //character uses selected
    enemyChar = []; //char enemy selects to fight
    numEnemies = 3; //3 enemies to fight
    userAlive = true;   
    gameStart = 2;
    $(".obiwan-health").text(window["obiwan"].health);
    $(".luke-health").text(window["luke"].health);
    $(".sidious-health").text(window["sidious"].health);
    $(".maul-health").text(window["maul"].health);
}
//main game loop

resetGame();    //configure game on page load

//Set user char and enemy
$(".card").on("click",function(key) {
    if(gameStart === 2)   //first start
    {
        userChar = this.getAttribute('data-value');  //use object of value of card
        //userAttack = window[userChar].attack;   //object is part of window object, so this works :)
        userHealth = window[userChar].health;
        gameStart--;
        console.log(userChar);
        console.log(userAttack);
        console.log(userHealth);
        //show chosen div in battle arena as user character
        window[userChar].display.addClass("d-none"); 
        window[userChar].fightdisplay.remove("d-none"); 
        window[userChar].fightdisplay.addClass("d-block");
    }
    else if (gameStart === 1)
    {        
        if(this.value === userChar) //did user try to select a card twice?
            alert("Please select a character that is not yours.")
        else {
            enemyChar = this.getAttribute('data-value');  //use object of value of card
            enemyAttack = window[enemyChar].attack;   //object is part of window object, so this works :)
            enemyHealth = window[enemyChar].health;
            gameStart--;
            console.log(enemyChar);
            console.log(enemyAttack);
            console.log(enemyHealth);
            window[enemyChar].display.addClass("d-none"); 
            window[enemyChar].enemydisplay.addClass("d-block"); 
            //make attack button appear
            $(".attack").removeClass("invisible");
        }
    }
    else
        alert("Please use the attack or reset button to continue.")
});

//if attack button is pressed
$(".attack").on("click",function() {

    if(gameStart !== 0) //should attack button be pressed?
        alert("Please select an enemy or attacker before preceeding.");
    resolveAttack();
});

//if reset button is pressed
$(".reset").on("click",function() {
    location.reload();    //reset page
});


