'use strict';

var CANVAS_W = 640;
var CANVAS_H = 700;
var STAGE_COL = 8;
var STAGE_ROW = 20;
var BLOCK_W = CANVAS_W / STAGE_COL;
var BLOCK_H = CANVAS_H / STAGE_ROW;
var PAD_W = BLOCK_W / 20; //ブロックの余白
var BALL_W = BLOCK_H / 4;
var BALL_SPEED = BALL_W * 2.0;
var BAR_SPEED = BALL_W * 2.5;
var BAR_W = BLOCK_W * 2;
var BAR_Y = CANVAS_H - BLOCK_H * 2; // BARのY座標
var INTERVAL = 100;

var STAGE_DEFAULT = [
    [0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,1,0],
    [0,0,1,0,0,1,0,0],
    [0,0,1,1,1,1,0,0],
    [0,1,2,1,1,2,1,0],
    [0,1,2,1,1,2,1,0],
    [0,1,1,1,1,1,1,0],
    [0,1,1,2,2,1,1,0],
    [0,1,1,1,1,1,1,0],
    [0,0,1,0,0,1,0,0],
    [0,1,1,0,0,1,1,0]
];

var BLOCK_COLOR = ["#000000", "#EE00FF", "#FF0000"];

//ゲーム中で利用する変数の定義

var aCanvas, ctx;
var stage = [];
var barX; //バーのx座標
var barSX; //バーの移動方向
var ballX, ballY; //ボールの座標
var ballSX, ballSY; //ボールの移動方向
var score;
var backgroundStyle; //背景グラデーション描画用
var isPlaying = false; //ゲーム中かを表す

window.onload = function() {
    //aCanvas = document.getElementById('canvas');
    aCanvas = $('canvas');
    ctx = aCanvas.getContext("2d");
    backgroundStyle = ctx.createLinearGradient(0, 0, 600, 0);
    backgroundStyle.addColorStop(0, 'black');
    backgroundStyle.addColorStop(0.5, '#303030');
    backgroundStyle.addColorStop(1, 'black');
    ctx.fillStyle = backgroundStyle;
    ctx.fillRect(0, 0, 640, 700);

    //マウス
    aCanvas.onclick = checkStart;
    aCanvas.onmousedown = mouseHandler;
    aCanvas.ontouchstart = touchHandler;
    //加速度センサー
    window.ondevicemotion = motionHandler;
    //キーボード
    window.onkeydown = keyHandler;
    //ゲームデータの初期化
    initGame();
};

function initGame() {
    stage = [];
    for (var y = 0; y < STAGE_ROW; y++) {
        var a = stage[y] = [];
        for (var x = 0; x < STAGE_COL; x++) {
            a[x] = (STAGE_DEFAULT.length > y) ? STAGE_DEFAULT[y][x] : 0;
        }
    }
    //バーやボールなどの座標を初期化
    barX = (CANVAS_W - BAR_W) / 2; //中央に設定
    barSX = BAR_SPEED;
    ballX = (CANVAS_W - BALL_W) / 2;
    ballY = BAR_Y - BALL_W * 3;
    ballSX = BALL_SPEED;
    ballSY = BALL_SPEED;
    score = 0;
    drawStage();
}

function nextTurn() {
    if (!isPlaying) return;
    //バーを動かす
    barX += barSX;
    if (barX < 0) barX = 0; //左端
    if (barX > CANVAS_W - BAR_W) { barX = CANVAS_W - BAR_W;} //右端
    
    //ボールを動かす 
    var lw = CANVAS_W - PAD_W; //右端の余白
    var tx = ballX + ballSX;
    var ty = ballY + ballSY;

    //壁があるか
    if (tx < PAD_W || tx > lw) {
        ballSX = BALL_SPEED;
        ballSX *= (tx < PAD_W) ? 1 : -1;
        tx = ballX + ballSX * 2;
    }

    if (ty < PAD_W) {
        ballSY *= -1;
        ty = ballY + ballSY;
    }

    //バーがあるか バーに当たったらを条件にしている
    var barX2 = barX + BAR_W;
    if (barX <= ballX && ballX <= barX2 && ballY > (BAR_Y - BALL_W * 2)) {
        ballSY *= -1;
        ty = ballY + ballSY * 2;
    }

    //ブロックがあるか
    var bx = Math.floor(tx / BLOCK_W);
    var by = Math.floor(ty / BLOCK_H);
    var c = stage[by][bx];
    if (c > 0) {
        revBallSX(); //ボールの向きをランダムに変える変数
        ballSY *= -1;
        stage[by][bx] = 0;
        score++;
        if (checkClear()){
            drawStage();
            alert("GAME CLEAR");
            isPlaying = false;
            initGame();
            return;
        }
    }
    ballX = tx; ballY = ty;
    drawStage();
    //ゲームオーバー判定
    if (ty >= CANVAS_H - BLOCK_H) {
        alert("GAME OVER \nSCORE=" + score);
        initGame();
        isPlaying = false;
        return;
    }
    // ターンをセット
    setTimeout(nextTurn, INTERVAL);
}

function revBallSX() {
    var x = Math.random() * BALL_SPEED * 1.2;
    ballSX = x * ((ballSX < 0) ? 1 : -1);
}

function drawStage() {
    //画面の初期化
    ctx.fillStyle = backgroundStyle;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    //画面のふち
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, CANVAS_W, PAD_W);
    ctx.fillRect(0, 0, PAD_W, CANVAS_H);
    ctx.fillRect(CANVAS_W - PAD_W, 0, PAD_W, CANVAS_H);
    //ブロックを描画
    each2a(stage, function(x, y, c) {
        if (c < 0) return true;
        var rx = x * BLOCK_W + PAD_W;
        var ry = y * BLOCK_H + PAD_W;
        ctx.fillStyle = BLOCK_COLOR[c];
        ctx.fillRect(rx, ry, BLOCK_W - PAD_W * 2, BLOCK_H - PAD_W * 2);
        return true;
    });
    //ボールを描画
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(ballX, ballY, BALL_W, 0, Math.PI * 2, false);
    ctx.fill();
    //バーを描画
    ctx.fillStyle = "red";
    ctx.fillRect(barX, BAR_Y, BAR_W, 8);
}

function keyHandler(e) {
    switch (e.keyCode) {
        case 37: //左
            barSX = -1 * BAR_SPEED;
            break;
        case 39: //右
            barSX = BAR_SPEED;
            break;
        case 32: // spaceキー
        case 13: // returnキー
            checkStart();
            break;
        default:
            console.log("PUSH:" + e.keyCode);
    }
}

function mouseHandler(e) {
    var x = e.clientX;
    var r = e.target.getBoundingClientRect();
    x -= r.left;
    checkMove(x);
}

function touchHandler(e) {
    var p = e.touches[0];
    var x = p.clientX;
    var r = e.target.getBoundingClientRect();
    x -= r.left;
    checkMove(x);
}

function checkMove(x) {
    var cx = barX + BAR_W / 2;
    if (x < cx) {
        barSX = -1 * BAR_SPEED;
    } else {
        barSX = BAR_SPEED;
    }
}

//加速度センサー対応
function motionHandler(e) {
    var acc = e.accelerationIncludingGravity;
    if (acc.x < 0) {
        barSX = -1 * BAR_SPEED;
    } else {
        barSX = BAR_SPEED;
    }
    //アンドロイドは逆に動くため
    if (navigator.userAgent.indexOf('Android') > 0) {
        barSX *= -1;
    }
}

function checkStart() {
    if (isPlaying) return;
    isPlaying = true;
    nextTurn();
}

function checkClear() {
    
}

function each2a(ary, f) {
    for (var y = 0; y < ary.length; y++) {
        var a = ary[y];
        for (var x = 0; x < a.length; x++) {
            if (!f(x, y, a[x])) return false;
        }
    }
    return true;
}

function $(id) {
    return document.getElementById(id);
}