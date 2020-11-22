const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = "640";
canvas.height = "480";

const SCREEN_HEIGHT = canvas.height;
const SCREEN_WIDTH = canvas.width;
const BOARDHEIGHT = 3;
const BOARDWIDTH = 3;
const BOXSIZE = 100

const XMARGIN = (SCREEN_WIDTH - (BOARDWIDTH * BOXSIZE)) / 2;
const YMARGIN = (SCREEN_HEIGHT - (BOARDHEIGHT * BOXSIZE)) / 2;

function convertToPixels(x, y) {
    const pixelX =(x * BOXSIZE) + SCREEN_WIDTH/4;
    const pixelY =(y * BOXSIZE) + SCREEN_HEIGHT/4;
    return { pixelX, pixelY }
}


function draw() {
    for (let x = 0; x < BOARDHEIGHT; x++) {
        for (let y = 0; y < BOARDWIDTH; y++) {
            let cood = convertToPixels(x, y);
            ctx.strokeStyle = "red";
            ctx.strokeRect(cood.pixelX, cood.pixelY, BOXSIZE, BOXSIZE);
        }
    }
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.strokeRect(convertToPixels(0, 0).pixelX, convertToPixels(0, 0).pixelY, BOXSIZE * 3, BOXSIZE * 3);
}

draw();
let boardNum = 0;

function getClick(event) {
    for (let x = 0; x < BOARDHEIGHT; x++) {
        for (let y = 0; y < BOARDWIDTH; y++) {
            let cood = convertToPixels(x, y);
            const endPixelX = cood.pixelX + BOXSIZE;
            const endPixelY = cood.pixelY + BOXSIZE;
            if (event.x > cood.pixelX && event.x < endPixelX) {
                if (event.y > cood.pixelY && event.y < endPixelY) {
                    if (winnerChecker) {
                        moves(cood.pixelX + 50, cood.pixelY + 50, x, y);
                    } else {
                        location.reload()
                    }

                }

            }
        }
    }
}

canvas.addEventListener("click", getClick)

function drawX(x, y) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.beginPath();

    ctx.moveTo(x - 20, y - 20);
    ctx.lineTo(x + 20, y + 20);

    ctx.moveTo(x + 20, y - 20);
    ctx.lineTo(x - 20, y + 20);
    ctx.stroke();

    ctx.closePath();
}

function drawO(x, y) {
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();
}

let counter = 2;
let board = boardStruct();

function moves(posX, posY, x, y) {
    if (board[x][y] == null) {
        counter++;
        if (counter % 2 !== 0) {
            drawX(posX, posY);
            board[x][y] = "X";
        } else {
            drawO(posX, posY);
            board[x][y] = "O";
        }
    }
    checkWinner(board);
}

function boardStruct() {
    let board = [];
    for (let x = 0; x < BOARDHEIGHT; x++) {
        let column = []
        for (let y = 0; y < BOARDWIDTH; y++) {
            column.push(null)
        }
        board.push(column)
    }

    return board;
}


function checkWinner(board) {
    boardNum++;
    for (let i = 0; i < 3; i++) {
        //Vertical wins
        if (board[i][0] === board[i][1] && board[i][2] === board[i][1]) {
            if (board[i][0] !== null) {
                if (board[i][0] === "X") { winnerMessage(board[i][0]) } else { winnerMessage(board[i][0]) }
            }
        }
        //Horizontal wins
        else if (board[0][i] === board[1][i] && board[2][i] === board[1][i]) {
            if (board[0][i] !== null) {
                if (board[0][i] === "X") { winnerMessage(board[0][i]) } else { winnerMessage(board[0][i]) }
            }
        } else if (boardNum == 9) {
            winnerMessage("No one")
        }
    }
    //Diagonal 1
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        if (board[0][0] !== null) {
            if (board[0][0] === "X") { winnerMessage(board[0][0]) } else if (board[0][0] === "O") { winnerMessage(board[0][0]) }
        }
    }
    //Diagonal 2
    else if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        if (board[0][2] !== null) {
            if (board[0][2] === "X") { winnerMessage(board[0][2]) } else if (board[0][2] === "O") { winnerMessage(board[0][2]) }
        }
    }
}

let winnerChecker = true;

function winnerMessage(winner) {
    if (winnerChecker) {
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        //space out
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = "white"
        ctx.textAlign = "left";
        ctx.font = "30px sans-serif";
        ctx.fillText((winner + " wins!!!"), XMARGIN, YMARGIN)
        ctx.fillText("Tap to play again", XMARGIN, YMARGIN + BOXSIZE)
    }
    winnerChecker = false;
    // winnerMessage();

    // canvas.addEventListener("click", winnerMessage("x"))
}

// function computerMove() {
//     for (let x = 0; x < BOARDHEIGHT; x++) {
//         for (let y = 0; y < BOARDWIDTH; y++) {
//             let cood = convertToPixels(x, y);
//             const endPixelX = cood.pixelX + BOXSIZE;
//             const endPixelY = cood.pixelY + BOXSIZE;
//             let comValue = gameAi();
//             if (comValue.xVal > cood.pixelX && comValue.xVal < endPixelX) {
//                 if (comValue.yVal > cood.pixelY && comValue.yVal < endPixelY) {
//                         moves(cood.pixelX + 50, cood.pixelY + 50, x, y);
//                 }

//             }
//         }
//     }
// }

// function gameAi () {
//     let yMax = 390;
//     let yMin = 90;
//     let xMax = 370;
//     let xMin = 170;
//     let xVal = Math.floor(Math.random() * (xMax - xMin + 1) + xMin);
//     let yVal = Math.floor(Math.random() * (yMax - yMin + 1) + yMin);


//     return {xVal, yVal}
// }
