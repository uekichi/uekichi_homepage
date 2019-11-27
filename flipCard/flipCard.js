'use strict';

//変数定義
var timer = NaN;  //１秒ごとにtick()を呼び出すためのタイマー
var score = 0;    //何ペア一致したか
var flipTimer;    //２枚目にめくったカードをしばらく表示状態にしておくタイマー
var prevCard;     //１枚目のカード
var startTime;    //開始の時刻


//初期化関数
function init() {
  var table = document.getElementById('table');

//トランプ
  var cards = [];
  var marks = ["♠️","♦️","❤︎","♣️"];
  var numbers = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
  var cards = [];
  for (var i =0; i < marks.length; i++) {
    for (var j = 0; j < numbers.length; j++) {
      cards.push(marks[i]+numbers[j]);
    }
  }
    // ジョーカー追加
    cards.push("👿");
    cards.push("👿");

    // シャッフル
  for (var i = cards.length - 1; i >= 0; i--){
    var rand = Math.floor( Math.random() * ( i + 1 ) );
    [cards[i], cards[rand]] = [cards[rand], cards[i]];
  }

    // ９行X６列を作る
  for (var i = 0; i < 6; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < 9; j++) {
      var td = document.createElement('td');
      td.className = 'card back';
      td.number = cards[i * 9 + j];
      td.onclick = flip;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  startTime = new Date();
}

//カード裏返し
function flip(e) {
  var src = e.srcElement;
  if (flipTimer || src.textContent != "") {
    return;
  }
  
  // numはトランプの札
  var num = src.number;
  src.className = 'card';
  src.textContent = num;
//一枚目
  if (prevCard == null) {
    prevCard = src;
    return;
  }

// 例 '♠️4'.split('') => ['♠️','','4']    '♠️4'.split('')[2] => '4' split('')[2]で数字だけを比較する
//二枚目  
  if (prevCard.textContent.split('')[2] == num.split('')[2]) {

    score += 1;
    // ゲームクリアでメッセージを表示
    if (score === 27) {
      var message = document.getElementById('message');
      message.textContent = 'クリアおめでとうございます';
    }
    
    prevCard = null;
    clearTimeout(flipTimer);
  } else {
    flipTimer = setTimeout(function() {
      src.className = 'card back';
      src.textContent = "";
      prevCard.className = 'card back';
      prevCard.textContent = "";
      prevCard = null;
      flipTimer = NaN;
    }, 1000);
  }
}