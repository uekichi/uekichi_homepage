'use strict';

var omikujiResult10 = [
  "大吉",
  "中吉", "中吉",
  "小吉", "小吉", "小吉",
  "吉", "吉", "吉",
  "末吉",
  "凶", "凶",
  "大凶"
]
var omikujiResult100 = [
  "大吉","大吉","大吉",
  "中吉", "中吉",
  "小吉", "小吉", "小吉",
  "吉", "吉", "吉",
  "末吉",
  "凶", "凶",
]
var omikujiResult1000 = [
  "大吉", "大吉", "大吉", "大吉",
  "中吉", "中吉", "中吉",
  "小吉", "小吉",
  "吉", "吉",
  "末吉",
];

$(function(){
  //ボタンにホバーさせると少し動く
  $("#ten").hover(function(){
      $("#ten").addClass("buruburu2");
    setTimeout(function(){
      $("#ten").removeClass("buruburu2");
    },500);
  });
})

$(function(){
  //ボタンにホバーさせると少し動く
  $("#hundred").hover(function(){
      $("#hundred").addClass("buruburu2");
    setTimeout(function(){
      $("#hundred").removeClass("buruburu2");
    },500);
  });
})

$(function(){
  //ボタンにホバーさせると少し動く
  $("#thousand").hover(function(){
      $("#thousand").addClass("buruburu2");
    setTimeout(function(){
      $("#thousand").removeClass("buruburu2");
    },500);
  });
})


$(function(){
  $(".omikujiBtn").click(function(){
    var btn = $(this);
    btn.prop("disabled", true);
    // おみくじを振る
    $("#omikujiImg").addClass("buruburu");
    // ブルブルを止める
    setTimeout(function(){
      $("#omikujiImg").removeClass("buruburu");
    },1500);
    // おみくじをひっくり返す
    setTimeout(function(){
      $("#omikujiImg").addClass("rotate");
    },3000);
    //おみくじ選択
    setTimeout(function(){
      switch (btn.attr('id')){
        case "ten": var omikujiResult = omikujiResult10; break;
        case "hundred": var omikujiResult = omikujiResult100; break;
        case "thousand": var omikujiResult = omikujiResult1000; break;
        default: break;
      }
      // 結果が表示される  
      var result = omikujiResult[Math.floor( Math.random() * omikujiResult.length)];
      $("#omikujiResult").html("<div class='omikujiResultInner'>" + result + "</div>");
      switch (result){
        case "大吉": $("body").css("background", "yellow"); break;
        case "中吉": $("body").css("background", "orange"); break;
        case "凶": $("body").css("background", "gray"); break;
        case "大凶": $("body").css("background", "red"); break;
        default: break;
      }
      // if (result == "大吉"){
      //   $("body").css("background", "yellow");
      // }
    },5000);
    // リセットする
    setTimeout(function(){
      $("#omikujiResult").html("<img id='omikujiImg' src='assets/omikuji.png'>");
      btn.prop("disabled", false);
      //くじの背景削除が必要
      $("body").css("background", "rgb(179, 218, 123)");
    },8000);
  })
})
