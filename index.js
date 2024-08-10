var activePlayer = 'X';
var gamesPlayed = 1;
var index,winner,scoreO = 0,scoreX = 0;
var playerX = "PLAYER X";
var playerO = "PLAYER O";
var ifwinner = false;
board = [91,92,93,94,95,96,97,98,99];

function keypress(){
    $(".player-info").addClass("display");
    $(".full-board").removeClass("display");
    $(".info").html(playerX + "'s TURN!!");
}

$(document).one("keypress", keypress);

$("#e1").on("click", function (){
    $(document).off("keypress");
    $(".screen1").removeClass("display");
});

$("#e2").on("click", function (){
    $(document).off("keypress");
    $(".screen2").removeClass("display");
});

turn();
function turn(){
    $(".box").hover(function () {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    }
    );
    $(".box").one("click",function () {
        $(this).html(activePlayer);
        index = $(this).attr("id");
        $(this).addClass("clicked");
        if(activePlayer === 'X'){
            activePlayer = 'O';
            board[index] = 1;
            $(".info").html(playerO + "'s TURN!!");
        }
        else {
            activePlayer = 'X';
            board[index] = 2;
            $(".info").html(playerX + "'s TURN!!");
        }
        if((board[0] === board[1] && board[1] === board[2]) || 
        (board[3] === board[4] && board[4] === board[5]) || 
        (board[6] === board[7] && board[7] === board[8]) ||
        (board[0] === board[3] && board[3] === board[6]) ||
        (board[1] === board[4] && board[4] === board[7]) ||
        (board[2] === board[5] && board[5] === board[8]) || 
        (board[0] === board[4] && board[4] === board[8]) || 
        (board[2] === board[4] && board[4] === board[6])){
            ifwinner = true;
            gamesPlayed++;
            $(".box").off("click");
            $(".box").removeClass("hover");
            $(".box").off("mouseenter mouseleave");
            if(activePlayer === 'X'){
                scoreO++;
                $(".info").html(playerO + " Won!!");
                $("#scoreO").html("SCORE : " + scoreO);
            }
            else {
                scoreX++;
                $(".info").html(playerX + " Won!!");
                $("#scoreX").html("SCORE : " + scoreX);
            }
            $(".btn").removeClass("display");
        }
        full = 1;
        for(let a of board){
            if (a > 3)
                full = 0;
        }
        if(full === 1 && ifwinner === false){
            $(".info").html("TIE,PLAY AGAIN!!");
            $(".btn").removeClass("display");
        }
    });
}

$("#btn").on("click", function() {
    if(gamesPlayed%2 === 1)
        activePlayer = 'X';
    else activePlayer = 'O';
    if(activePlayer === 'X')
        $(".info").html(playerX + "'s TURN!!");
    else
        $(".info").html(playerO + "'s TURN!!");
    ifwinner = false;
    board = [91,92,93,94,95,96,97,98,99];
    $(".box").html("");
    $(".box").removeClass("clicked");
    turn();
    $(".btn").addClass("display");
});

function changeName1() {
    playerX = document.getElementById("name1").value.toUpperCase();
    if(playerX !== ""){
        $(".player1").html(playerX);
        $(".screen1").addClass("display");
        $(document).one("keypress", keypress);
    }
}

function changeName2() {
    playerO = document.getElementById("name2").value.toUpperCase();
    if(playerO !== ""){
        $(".player2").html(playerO);
        $(".screen2").addClass("display");
        $(document).one("keypress", keypress);
    }
}

function cancel1() {
    $(".screen1").addClass("display");
    $(document).one("keypress", keypress);
}

function cancel2() {
    $(".screen2").addClass("display");
    $(document).one("keypress", keypress);
}

$("#exit").on("click", function () {
    if(scoreO > scoreX)
        winner = playerO;
    else
        winner = playerX;
    $(".winner").html(winner + " is winning.Are you sure to exit??");
    $(".screen3").removeClass("display");
    $("#cancel").on("click", function () {
        $(".screen3").addClass("display");
    });
});