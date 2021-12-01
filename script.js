"use strict"
const allGameBoards = {
    virtualBoard: [],
    divBoard: [],
    marioPillsBoard: [],
    oxBoard: []
}

let gameStart = {

    makeBoard: function () {



        var board = document.createElement('div');
        board.classList.add('board')
        for (let i = 0; i < 19; i++) {
            let collum = document.createElement('div');
            collum.classList.add('column')


            allGameBoards.virtualBoard.push([])
            allGameBoards.divBoard.push([])
            allGameBoards.oxBoard.push([])
            for (let a = 0; a < 8; a++) {
                let row = document.createElement('div');
                row.classList.add('row')

                if (i == 14) {

                    row.classList.add('wall')
                }

                collum.appendChild(row);
                allGameBoards.divBoard[i][a] = row;
                allGameBoards.virtualBoard[i][a] = 0;
                allGameBoards.oxBoard[i][a] = '';

            }
            board.appendChild(collum);
        }
        console.log(allGameBoards.oxBoard)
        document.body.appendChild(board);



        let marioBoard = document.createElement('div');
        marioBoard.classList.add('marioBoard')
        for (let i = 0; i < 8; i++) {
            let collum = document.createElement('div');
            collum.classList.add('marioCoulumn')



            allGameBoards.marioPillsBoard.push([])
            for (let a = 0; a < 13; a++) {
                let row = document.createElement('div');
                row.classList.add('marioRow')


                collum.appendChild(row);
                allGameBoards.marioPillsBoard[i][a] = row;

            }
            marioBoard.appendChild(collum);
        }

        document.body.appendChild(marioBoard);
    }
}


gameStart.makeBoard()



var pillsAtributes = {
    pillPositionY: 0,
    pillPositionX: 3,
    horizontally: true,
    color1: '',
    color2: '',
    rotation: 0,
    rotationLeft: true,
    speed: 500,
    numberOfColor1: 0,
    numberOfColor2: 0,
    pomNumberOfColor1: 0,
    pomNumberOfColor2: 0,
    movingOnlyDown: false,
}

var randomColors = {
    drawColor: function () {
        let randomNumber1 = Math.floor(Math.random() * 3);
        let randomNumber2 = Math.floor(Math.random() * 3);
        var colors = ['blue', 'yellow', 'brown'];
        pillsAtributes.color1 = colors[randomNumber1];
        pillsAtributes.color2 = colors[randomNumber2];
        pillsAtributes.numberOfColor1 = randomNumber1 + 1;
        pillsAtributes.numberOfColor2 = randomNumber2 + 1;

    },

    drawColor2: function () {
        let randomNumber1 = Math.floor(Math.random() * 3);
        let randomNumber2 = Math.floor(Math.random() * 3);

        pillsAtributes.pomNumberOfColor1 = randomNumber1 + 1;
        pillsAtributes.pomNumberOfColor2 = randomNumber2 + 1;

    }
}


function drawVirus() {
    let randomColor = Math.floor(Math.random() * 3);
    for (let i = 0; i < 4; i++) {
        if (randomColor > 3) {
            randomColor = 0
        }

        let x = Math.floor(Math.random() * 8);
        let y = Math.floor(Math.random() * (16 - 8) + 8);
        console.log(x)
        console.log(y)
        let virus = allGameBoards.divBoard[y][x];


        let img = document.createElement('img');
        img.src = imaging.pillImages[randomColor][1].covid;


        if (virus.classList.contains('const')) {

        } else {
            virus.classList.add('covid', 'const');
            virus.appendChild(img);
            allGameBoards.virtualBoard[y][x] = randomColor + 1;
        }

        randomColor++;

    }


}

randomColors.drawColor() // musze wylosować pierwszy kolor
var imagesToTake = {
    bluePillImages: [{
            up: "img/bl_up.png",
            right: "img/bl_right.png",
            down: "img/bl_down.png",
            left: "img/bl_left.png",
        },
        {
            dot: "img/bl_dot.png",
            covid: "img/covid_blue.png",
            o: "img/bl_o.png",
            x: "img/bl_x.png"
        },
    ],
    yellowPillImages: [{
            up: "img/yl_up.png",
            right: "img/yl_right.png",
            down: "img/yl_down.png",
            left: "img/yl_left.png",
        },
        {
            dot: "img/yl_dot.png",
            covid: "img/covid_blue.png",
            o: "img/yl_o.png",
            x: "img/yl_x.png"
        },
    ],
    brownPillImages: [{
            up: "img/br_up.png",
            right: "img/br_right.png",
            down: "img/br_down.png",
            left: "img/br_left.png",
        },
        {
            dot: "img/br_dot.png",
            covid: "img/covid_brown.png",
            o: "img/br_o.png",
            x: "img/br_x.png"
        },
    ]


}
var imaging = {
    pillImages: [imagesToTake.bluePillImages, imagesToTake.yellowPillImages, imagesToTake.brownPillImages]
}


const hands = {
    up: ['img/hands/up_1.png', 'img/hands/up_2.png', 'img/hands/up_3.png'],
    mid: ['img/hands/middle11.png', 'img/hands/middle12.png', 'img/hands/middle21.png', 'img/hands/middle22.png'],
    down: ['img/hands/down_1.png', 'img/hands/down_2.png'],
}

var framesMarioThrow = {
    animationPill: [
        [3, 11], //poziomo
        [3, 11], //pionowo
        [2, 10], //poziomo
        [2, 10],
        [1, 9], //koniec etapu 1
        [1, 9],
        [1, 8],
        [1, 8],
        [1, 7],
        [1, 7],
        [1, 6],
        [1, 6],
        [1, 5],
        [1, 5],
        [1, 4],
        [1, 4],
        [1, 3],
        [1, 3],
        [1, 2],
        [1, 2],
        [1, 1],
        [2, 1],
        [3, 1],

    ],
    timer: 0
}
var marioAnimations = {
    throwPill: function () {


        let marioColor1 = pillsAtributes.numberOfColor1;
        let marioColor2 = pillsAtributes.numberOfColor2;
        clearInterval(framesMarioThrow.timer)


        function marioDrawVertical(marioPillY, marioPillX) {


            var leftPartOfPill = allGameBoards.marioPillsBoard[marioPillY][marioPillX];
            var rightPartOfPill = allGameBoards.marioPillsBoard[marioPillY - 1][marioPillX];

            var img1 = document.createElement('img');
            var img2 = document.createElement('img');

            img1.src = imaging.pillImages[marioColor1 - 1][0].down;
            img2.src = imaging.pillImages[marioColor2 - 1][0].up;

            leftPartOfPill.appendChild(img1);
            rightPartOfPill.appendChild(img2);


        }

        function marioDrawHorizontally(marioPillY, marioPillX) {
            var leftPartOfPill = allGameBoards.marioPillsBoard[marioPillY][marioPillX];
            var rightPartOfPill = allGameBoards.marioPillsBoard[marioPillY][marioPillX + 1];

            var img1 = document.createElement('img');
            var img2 = document.createElement('img');
            img1.src = imaging.pillImages[marioColor1 - 1][0].left;
            img2.src = imaging.pillImages[marioColor2 - 1][0].right;

            leftPartOfPill.appendChild(img1);
            rightPartOfPill.appendChild(img2);

        }


        function changeColor() {
            let pomColor = marioColor1;
            marioColor1 = marioColor2;
            marioColor2 = pomColor;
        }
        let start = false;
        let counter = 0;
        let pies = setInterval(() => {
            if (framesMarioThrow.animationPill[counter - 1] != undefined && counter < 20) {
                if (framesMarioThrow.animationPill[counter][0] == framesMarioThrow.animationPill[counter - 1][0] && framesMarioThrow.animationPill[counter][1] == framesMarioThrow.animationPill[counter - 1][1]) {
                    changeColor();
                }
            }
            if (counter < 20) {
                if (counter % 2 == 0) {
                    handMarioAnimations.cleanMarioBoard()
                    marioDrawHorizontally(framesMarioThrow.animationPill[counter][0], framesMarioThrow.animationPill[counter][1]);
                    if (counter < 6) {
                        handMarioAnimations.handUp()
                    } else if (counter >= 6 && counter < 9) {
                        handMarioAnimations.handMid()
                    } else {
                        handMarioAnimations.handDown()
                    }
                } else {
                    handMarioAnimations.cleanMarioBoard()
                    marioDrawVertical(framesMarioThrow.animationPill[counter][0], framesMarioThrow.animationPill[counter][1])
                    if (counter < 6) {
                        handMarioAnimations.handUp()
                    } else if (counter >= 6 && counter < 9) {
                        handMarioAnimations.handMid()
                    } else {
                        handMarioAnimations.handDown()
                    }

                }
            } else if (counter >= 20 && counter <= 22) {
                handMarioAnimations.cleanMarioBoard()
                marioDrawHorizontally(framesMarioThrow.animationPill[counter][0], framesMarioThrow.animationPill[counter][1]);
                handMarioAnimations.handDown()
            } else {
                start = true;
                handMarioAnimations.cleanMarioBoard()
                clearInterval(pies)

            }

            counter++;

            if (start == true) {
                framesMarioThrow.timer = setInterval(lastObject.moveDown, pillsAtributes.speed)
            }

            let gameover = false;
            allGameBoards.divBoard[2].forEach(div => {
                if (div.classList.contains('const')) {
                    gameover = true
                }
            })
            if (gameover == true) {
                clearInterval(framesMarioThrow.timer)

            }
        }, 20);


    },
    previewOfPill: function () {

        var img1 = document.createElement('img')
        var img2 = document.createElement('img')

        img1.src = imaging.pillImages[pillsAtributes.pomNumberOfColor1 - 1][0].left
        img2.src = imaging.pillImages[pillsAtributes.pomNumberOfColor2 - 1][0].right
        allGameBoards.marioPillsBoard[3][11].appendChild(img1)
        allGameBoards.marioPillsBoard[3][12].appendChild(img2)
        handMarioAnimations.handUp();
    },
}




marioAnimations.throwPill()
// drawVirus()
var handMarioAnimations = {
    cleanMarioBoard: function () {
        allGameBoards.marioPillsBoard.forEach(row => {
            row.forEach(div => {
                div.innerHTML = ""

            })
        })
    },





    handUp: function () {
        let table = [
            allGameBoards.marioPillsBoard[4][12],
            allGameBoards.marioPillsBoard[5][12],
            allGameBoards.marioPillsBoard[6][12]
        ]


        for (let i = 0; i < table.length; i++) {
            let img = document.createElement('img');
            img.src = hands.up[i];
            img.style.width = '16px'
            img.style.height = '16px'
            table[i].appendChild(img)
        }
    },

    handMid: function () {
        let table = [
            allGameBoards.marioPillsBoard[5][11],
            allGameBoards.marioPillsBoard[5][12],
            allGameBoards.marioPillsBoard[6][11],
            allGameBoards.marioPillsBoard[6][12]
        ]
        for (let i = 0; i < table.length; i++) {
            let img = document.createElement('img');
            img.src = hands.mid[i];
            img.style.width = '16px'
            img.style.height = '16px'
            table[i].appendChild(img)
        }
    },

    handDown: function () {
        let table = [
            allGameBoards.marioPillsBoard[6][12],
            allGameBoards.marioPillsBoard[7][12]
        ]
        for (let i = 0; i < table.length; i++) {
            let img = document.createElement('img');
            img.src = hands.down[i];
            img.style.width = '16px'
            img.style.height = '16px'
            table[i].appendChild(img)
        }
    }

}


var movingPill = {
    undrawPill: function () {

        if (pillsAtributes.horizontally == true) {

            var leftPartOfPill = allGameBoards.divBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX];
            var rightPartOfPill = allGameBoards.divBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX + 1];

            leftPartOfPill.innerHTML = ""
            rightPartOfPill.innerHTML = ""
            rightPartOfPill.style.background = "";
            leftPartOfPill.style.background = '';

        }
        if (pillsAtributes.horizontally == false) {
            var leftPartOfPill = allGameBoards.divBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX];
            var rightPartOfPill = allGameBoards.divBoard[pillsAtributes.pillPositionY - 1][pillsAtributes.pillPositionX];

            leftPartOfPill.innerHTML = ""
            rightPartOfPill.innerHTML = ""
            rightPartOfPill.style.background = "";
            leftPartOfPill.style.background = '';
        }


    },
    drawPill: function () {

        if (pillsAtributes.horizontally == true) {
            if (pillsAtributes.pillPositionY != 1) {
                var leftPartOfPill = allGameBoards.divBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX];
                var rightPartOfPill = allGameBoards.divBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX + 1];

                var img1 = document.createElement('img');
                var img2 = document.createElement('img');
                img1.src = imaging.pillImages[pillsAtributes.numberOfColor1 - 1][0].left;
                img2.src = imaging.pillImages[pillsAtributes.numberOfColor2 - 1][0].right;

                leftPartOfPill.appendChild(img1);
                rightPartOfPill.appendChild(img2);
            }
        }
        if (pillsAtributes.horizontally == false) {
            var leftPartOfPill = allGameBoards.divBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX];
            var rightPartOfPill = allGameBoards.divBoard[pillsAtributes.pillPositionY - 1][pillsAtributes.pillPositionX];

            var img1 = document.createElement('img');
            var img2 = document.createElement('img');

            if (pillsAtributes.rotationLeft == true) {
                img1.src = imaging.pillImages[pillsAtributes.numberOfColor1 - 1][0].down;
                img2.src = imaging.pillImages[pillsAtributes.numberOfColor2 - 1][0].up;
            } else {

                img1.src = imaging.pillImages[pillsAtributes.numberOfColor2 - 1][0].down;
                img2.src = imaging.pillImages[pillsAtributes.numberOfColor1 - 1][0].up;
            }
            leftPartOfPill.appendChild(img1);
            rightPartOfPill.appendChild(img2);

        }

    },
    oxDraw: function () {

        for (let y = 0; y < allGameBoards.oxBoard.length; y++) {
            for (let x = 0; x < allGameBoards.oxBoard[y].length; x++) {
                var img = document.createElement('img')
                let pill = allGameBoards.divBoard[y][x];
                if (pill.classList.contains('right') && allGameBoards.oxBoard[y][x + 1] != allGameBoards.oxBoard[y][x]) {
                    pill.classList.remove('right')
                    allGameBoards.divBoard[y][x + 1].classList.remove('left');
                    pill.innerHTML = "";
                    img.src = imaging.pillImages[allGameBoards.virtualBoard[y][x] - 1][1].dot;
                    pill.appendChild(img);
                    pill.classList.add('ball')

                } else if (pill.classList.contains('left') && allGameBoards.oxBoard[y][x - 1] != allGameBoards.oxBoard[y][x]) {
                    pill.classList.remove('left')
                    allGameBoards.divBoard[y][x - 1].classList.remove('right');
                    pill.innerHTML = "";
                    img.src = imaging.pillImages[allGameBoards.virtualBoard[y][x] - 1][1].dot;
                    pill.appendChild(img);
                    pill.classList.add('ball')
                } else if (pill.classList.contains('up') && allGameBoards.oxBoard[y][x] != allGameBoards.oxBoard[y + 1][x]) {
                    pill.classList.remove('up');
                    allGameBoards.divBoard[y + 1][x].classList.remove('down');
                    pill.innerHTML = "";
                    img.src = imaging.pillImages[allGameBoards.virtualBoard[y][x] - 1][1].dot;
                    pill.appendChild(img);
                    pill.classList.add('ball')
                } else if (pill.classList.contains('down') && allGameBoards.oxBoard[y][x] != allGameBoards.oxBoard[y - 1][x]) {
                    pill.classList.remove('down');

                    pill.innerHTML = "";
                    img.src = imaging.pillImages[allGameBoards.virtualBoard[y][x] - 1][1].dot;
                    pill.appendChild(img);
                    pill.classList.add('ball')
                }

            }
        }
    },


}

var beatingPills = {
    beating: function () {


        for (let i = 0; i < allGameBoards.virtualBoard.length; i++) {
            let tabToDelete = []
            for (let j = 0; j < allGameBoards.virtualBoard[i].length; j++) {
                if (j < allGameBoards.virtualBoard.length - 3) {
                    let startValue = allGameBoards.virtualBoard[i][j]

                    if (allGameBoards.virtualBoard[i][j + 1] == startValue && allGameBoards.virtualBoard[i][j + 2] == startValue && allGameBoards.virtualBoard[i][j + 3] == startValue && startValue != 0) {
                        tabToDelete.push(j, j + 1, j + 2, j + 3)


                    }
                }


            }

            if (tabToDelete.length > 0) {
                for (let j = 0; j < tabToDelete.length; j++) {
                    let pillToDelete = allGameBoards.divBoard[i][tabToDelete[j]]

                    var img = document.createElement('img');
                    if (pillToDelete.classList.contains('covid')) {
                        img.src = imaging.pillImages[allGameBoards.virtualBoard[i][tabToDelete[j]] - 1][1].x;
                    } else {
                        img.src = imaging.pillImages[allGameBoards.virtualBoard[i][tabToDelete[j]] - 1][1].o;
                    }

                    pillToDelete.innerHTML = "";
                    pillToDelete.appendChild(img);
                    allGameBoards.oxBoard[i][tabToDelete[j]] = 0;
                }
                setTimeout(function () {
                    for (let j = 0; j < tabToDelete.length; j++) {
                        let pillToDelete = allGameBoards.divBoard[i][tabToDelete[j]]

                        pillToDelete.style.background = "";
                        pillToDelete.className = "row";
                        pillToDelete.innerHTML = "";
                        allGameBoards.virtualBoard[i][tabToDelete[j]] = 0;

                    }
                    movingPill.oxDraw()

                }, 300)
            }
        }

        for (let i = 0; i < 8; i++) {
            let tabToDelete = []
            let actualXposition = 0;
            for (let j = 0; j < allGameBoards.virtualBoard.length; j++) {
                if (j < allGameBoards.virtualBoard.length - 3) {
                    let startValue = allGameBoards.virtualBoard[j][i]

                    if (allGameBoards.virtualBoard[j + 1][i] == startValue && allGameBoards.virtualBoard[j + 2][i] == startValue && allGameBoards.virtualBoard[j + 3][i] == startValue && startValue != 0) {

                        tabToDelete.push(j, j + 1, j + 2, j + 3);
                        actualXposition = i;

                    }
                }


            }

            if (tabToDelete.length > 0) {
                for (let j = 0; j < tabToDelete.length; j++) {
                    let pillsToDelete = allGameBoards.divBoard[tabToDelete[j]][actualXposition];

                    var img = document.createElement('img');
                    if (pillsToDelete.classList.contains('covid')) {
                        img.src = imaging.pillImages[(allGameBoards.virtualBoard[tabToDelete[j]][actualXposition]) - 1][1].x;
                    } else {
                        img.src = imaging.pillImages[(allGameBoards.virtualBoard[tabToDelete[j]][actualXposition]) - 1][1].o;
                    }

                    pillsToDelete.innerHTML = ""
                    pillsToDelete.appendChild(img);

                    allGameBoards.oxBoard[tabToDelete[j]][actualXposition] = 0;
                }
                setTimeout(function () {
                    for (let j = 0; j < tabToDelete.length; j++) {
                        let pillsToDelete = allGameBoards.divBoard[tabToDelete[j]][actualXposition];


                        pillsToDelete.style.background = "";
                        pillsToDelete.className = "row";
                        pillsToDelete.innerHTML = "";
                        allGameBoards.virtualBoard[tabToDelete[j]][actualXposition] = 0;

                    }
                    movingPill.oxDraw()

                }, 300)
            }
        }



        // animation()

    },
    couplesPill: 2
}









// function fallDown() {
//     for (let y = 18; y > 0; y--) {
//         for (let x = 7; x > 0; x--) {
//             let pill = allGameBoards.divBoard[y][x];
//             let img = document.createElement('img');
//             if (pill.classList.contains('ball') && allGameBoards.oxBoard[y + 1][x] != undefined && allGameBoards.oxBoard[y + 1][x] == 0) {
//                 pill.classList.remove('ball', 'const')
//                 pill.innerHTML = "";
//                 img.src = imaging.pillImages[allGameBoards.virtualBoard[y][x] - 1][1].dot;
//                 allGameBoards.oxBoard[y][x] = 0;
//                 allGameBoards.divBoard[y + 1][x].appendChild(img);
//                 allGameBoards.divBoard[y + 1][x].classList.add('const')
//             }

//         }
//     }
// }



var mroziGame = {
    freeze: function () {

        if (pillsAtributes.horizontally == true) {
            if (allGameBoards.divBoard[pillsAtributes.pillPositionY + 1] == undefined ||
                allGameBoards.divBoard[pillsAtributes.pillPositionY + 1][pillsAtributes.pillPositionX].classList.contains('const') ||
                allGameBoards.divBoard[pillsAtributes.pillPositionY + 1][pillsAtributes.pillPositionX + 1].classList.contains('const')

            ) {

                allGameBoards.divBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX].classList.add("const", "right");
                allGameBoards.divBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX + 1].classList.add("const", "left");
                allGameBoards.virtualBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX] = pillsAtributes.numberOfColor1;
                allGameBoards.virtualBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX + 1] = pillsAtributes.numberOfColor2;
                allGameBoards.oxBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX] = beatingPills.couplesPill;
                allGameBoards.oxBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX + 1] = beatingPills.couplesPill;


                beatingPills.beating()
                beatingPills.couplesPill++;
                pillsAtributes.pillPositionY = 0;
                pillsAtributes.pillPositionX = 3;
                pillsAtributes.horizontally = true;
                pillsAtributes.movingOnlyDown = false;
                clearInterval(tiimer.timer2)
                pillsAtributes.numberOfColor1 = pillsAtributes.pomNumberOfColor1;
                pillsAtributes.numberOfColor2 = pillsAtributes.pomNumberOfColor2;
                marioAnimations.throwPill()

            }

        } else if (pillsAtributes.horizontally == false) {
            if (allGameBoards.divBoard[pillsAtributes.pillPositionY + 1] == undefined ||
                allGameBoards.divBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX].classList.contains('const') ||
                allGameBoards.divBoard[pillsAtributes.pillPositionY + 1][pillsAtributes.pillPositionX].classList.contains('const')
            ) {


                allGameBoards.divBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX].classList.add("const", "down");
                allGameBoards.divBoard[pillsAtributes.pillPositionY - 1][pillsAtributes.pillPositionX].classList.add("const", "up");
                allGameBoards.virtualBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX] = pillsAtributes.numberOfColor1;
                allGameBoards.virtualBoard[pillsAtributes.pillPositionY - 1][pillsAtributes.pillPositionX] = pillsAtributes.numberOfColor2;
                allGameBoards.oxBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX] = beatingPills.couplesPill;
                allGameBoards.oxBoard[pillsAtributes.pillPositionY - 1][pillsAtributes.pillPositionX] = beatingPills.couplesPill;

                beatingPills.beating()
                beatingPills.couplesPill++;
                pillsAtributes.pillPositionY = 0;
                pillsAtributes.pillPositionX = 3;

                pillsAtributes.horizontally = true;
                pillsAtributes.movingOnlyDown = false;
                clearInterval(tiimer.timer2)
                pillsAtributes.numberOfColor1 = pillsAtributes.pomNumberOfColor1;
                pillsAtributes.numberOfColor2 = pillsAtributes.pomNumberOfColor2;
                marioAnimations.throwPill()

            }

        }




    },

    gameOver: function () {
        let gameover = false;
        allGameBoards.divBoard[2].forEach(div => {
            if (div.classList.contains('const')) {
                gameover = true
            }
        })
        if (gameover == true) {
            clearInterval(framesMarioThrow.timer)
            virusAnimation.laughingViruses()
            let img1 = document.createElement('img');
            img1.src = 'img/go_dr.png';
            img1.classList.add('gameOverMario')
            document.body.appendChild(img1)

            let img2 = document.createElement('img');
            img2.src = 'img/go.png';
            img2.classList.add('gameOverTitle')
            document.body.appendChild(img2)
        }

    }

}


var tiimer = {
    timer2: 0
}

var movingAround = {
    control: function (e) {
        if (pillsAtributes.pillPositionY > 2 && pillsAtributes.movingOnlyDown == false) {
            if ((e.keyCode === 37 || e.keyCode === 65)) {
                lastObject.moveLeft()
            } else if ((e.keyCode === 38 || e.keyCode === 16)) {
                pillsAtributes.rotationLeft = true;
                lastObject.rotate();

            } else if ((e.keyCode === 39 || e.keyCode === 68)) {
                lastObject.moveRight()
            } else if (e.keyCode === 81) {
                pillsAtributes.rotationLeft = false;
                pillsAtributes.rotationLeft = lastObject.rotate();

            } else if (e.keyCode === 40 || e.keyCode === 83) {
                pillsAtributes.movingOnlyDown = true;

                tiimer.timer2 = setInterval(lastObject.moveDown, 100)

            }
        }

    }
}




document.addEventListener('keyup', movingAround.control)



var lastObject = {
    moveLeft: function () {
        if (pillsAtributes.horizontally == true) {
            if (pillsAtributes.pillPositionX <= 0 || allGameBoards.divBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX - 1].classList.contains('const')) {
                console.log('no nie przejdzie')
            } else {
                movingPill.undrawPill()
                pillsAtributes.pillPositionX--;
                movingPill.drawPill()
            }
        } else {
            if (pillsAtributes.pillPositionX <= 0 || allGameBoards.divBoard[pillsAtributes.pillPositionY - 1][pillsAtributes.pillPositionX - 1].classList.contains('const') ||
                allGameBoards.divBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX - 1].classList.contains('const')
            ) {
                console.log('no nie przejdzie')
            } else {
                movingPill.undrawPill()
                pillsAtributes.pillPositionX--;
                movingPill.drawPill()
            }
        }

    },

    moveRight: function () {
        if (pillsAtributes.horizontally == true) {
            if (pillsAtributes.pillPositionX >= 6 || allGameBoards.divBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX + 2].classList.contains('const')) {
                console.log('no nie da rady')
            } else {
                movingPill.undrawPill()
                pillsAtributes.pillPositionX++;
                movingPill.drawPill()
            }
        } else {
            if (pillsAtributes.pillPositionX >= 7 || allGameBoards.divBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX + 1].classList.contains('const') ||
                allGameBoards.divBoard[pillsAtributes.pillPositionY - 1][pillsAtributes.pillPositionX + 1].classList.contains('const')
            ) {
                console.log('no nie da rady')
            } else {

                movingPill.undrawPill()
                pillsAtributes.pillPositionX++;
                movingPill.drawPill()
            }
        }

    },

    rotate: function () {

        if (pillsAtributes.rotation % 2 == 0) {
            let colorPom = pillsAtributes.color1;
            pillsAtributes.color1 = pillsAtributes.color2;
            pillsAtributes.color2 = colorPom;
            let numberPom = pillsAtributes.numberOfColor1;
            pillsAtributes.numberOfColor1 = pillsAtributes.numberOfColor2;
            pillsAtributes.numberOfColor2 = numberPom
        }
        // ten warunek jest po to gdy jesteśmy przy ściance i chcemy zmienić z poziomu na pion to żeby się nam obróciło
        if (pillsAtributes.pillPositionX == 7 && pillsAtributes.horizontally == false && allGameBoards.virtualBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX - 1] == 0) {
            movingPill.undrawPill();
            pillsAtributes.pillPositionX--;

            pillsAtributes.horizontally = !pillsAtributes.horizontally
            movingPill.drawPill()
        } else if (allGameBoards.divBoard[pillsAtributes.pillPositionY][pillsAtributes.pillPositionX + 1].classList.contains('const')) {
            //to jest w wypadku kiedy jesteśmy przy już postawionych klockach i chcemy obrócić - nie można tego zrobić
            console.log("no nie przejdzie")
        } else {
            movingPill.undrawPill();

            pillsAtributes.horizontally = !pillsAtributes.horizontally
            movingPill.drawPill()
            pillsAtributes.rotation++;
        }


    },





    moveDown: function () {

        if (pillsAtributes.pillPositionY == 3) {
            handMarioAnimations.cleanMarioBoard()
            randomColors.drawColor2()

            marioAnimations.previewOfPill()
        } else if (pillsAtributes.pillPositionY < 3) {
            handMarioAnimations.cleanMarioBoard()
            handMarioAnimations.handDown()
        }
        mroziGame.freeze()
        movingPill.undrawPill()
        pillsAtributes.pillPositionY++

        movingPill.drawPill()
        mroziGame.gameOver()
    }
}





let dancing, moving;

const brownVirus = document.createElement('div')
const blueVirus = document.createElement('div')
const yellowVirus = document.createElement('div')
brownVirus.classList.add("brownVirus")
blueVirus.classList.add('blueVirus')
yellowVirus.classList.add('yellowVirus')
document.body.appendChild(brownVirus)
document.body.appendChild(blueVirus)
document.body.appendChild(yellowVirus)

var animationFrames = {
    frames: [{
            top: "280px",
            left: "30px"
        },
        {
            top: "306px",
            left: "55px"
        },
        {
            top: "312px",
            left: "70px"
        },
        {
            top: "312px",
            left: "90px"
        },
        {
            top: "306px",
            left: "110px"
        },
        {
            top: "295px",
            left: "120px"
        },

        {
            top: "280px",
            left: "130px"
        },
        {
            top: "260px",
            left: "130px"
        },
        {
            top: "250px",
            left: "120px"
        },
        {
            top: "230px",
            left: "110px"
        },
        {
            top: "215px",
            left: "100px"
        },
        {
            top: "215px",
            left: "90px"
        },

        {
            top: "215px",
            left: "75px"
        },
        {
            top: "230px",
            left: "60px"
        },
        {
            top: "245px",
            left: "50px"
        },
        {
            top: "260px",
            left: "40px"
        },
        {
            top: "270px",
            left: "35px"
        }, {
            top: "280px",
            left: "30px"
        }
    ]
}

var virusAnimation = {
    dancingViruses: function () {

        let countingFrames = 1
        let imageChange = 0
        dancing = setInterval(() => {
            brownVirus.style.backgroundImage = `url(img/lupa/br/${countingFrames}.png)`
            blueVirus.style.backgroundImage = `url(img/lupa/bl/${countingFrames}.png)`
            yellowVirus.style.backgroundImage = `url(img/lupa/yl/${countingFrames}.png)`
            if (imageChange % 2 == 0) {
                countingFrames++
            } else {
                countingFrames--
            }
            if (countingFrames == 3 || countingFrames == 1) {
                imageChange++
            }
        }, 250);
    },
    movingViruses: function () {

        let countingFrames = 1
        let offsetBlue = 6
        let offsetYellow = 12
        moving = setInterval(() => {
            brownVirus.style.top = animationFrames.frames[countingFrames].top
            brownVirus.style.left = animationFrames.frames[countingFrames].left
            blueVirus.style.top = animationFrames.frames[countingFrames + offsetBlue].top
            blueVirus.style.left = animationFrames.frames[countingFrames + offsetBlue].left
            yellowVirus.style.top = animationFrames.frames[countingFrames + offsetYellow].top
            yellowVirus.style.left = animationFrames.frames[countingFrames + offsetYellow].left
            countingFrames++
            if (countingFrames == 18) {
                countingFrames = 0
                offsetBlue = 6
                offsetYellow = 12
            }
            if (offsetBlue + countingFrames == 18) {
                offsetBlue = -12
            }
            if (offsetYellow + countingFrames == 18) {
                offsetYellow = -6
            }
        }, 1000);
    },
    laughingViruses: function () {
        clearInterval(dancing)
        clearInterval(moving)
        let countingFrames = 2
        setInterval(() => {
            brownVirus.style.backgroundImage = `url(img/lupa/br/${countingFrames}.png)`
            blueVirus.style.backgroundImage = `url(img/lupa/bl/${countingFrames}.png)`
            yellowVirus.style.backgroundImage = `url(img/lupa/yl/${countingFrames}.png)`
            if (countingFrames == 2) {
                countingFrames = 4
            } else {
                countingFrames = 2
            }
        }, 250);
    }
}


virusAnimation.movingViruses()
virusAnimation.dancingViruses()