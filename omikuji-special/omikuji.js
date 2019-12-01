'use strict';

$(function(){
  var omikuji = [$("#result-1"),$("#result-2"),$("#result-3")];

  $("#btn-start").on("click", function() {
    //スライドアニメーション
    $("#slide").addClass("open"),
    setTimeout(function() {
      $("#app").append("<div id='loading' class='layer wf-nicomoji'>あなたのうんめいのあいては？</div>")
      $("#logo-customcast,#start-charactor,#logo,#btn-start").hide();
      $("#slide").addClass("close");
    }, 1000);
    //終了
    setTimeout(function() {
      $("#loading").addClass("animated fadeOutUp");
    }, 3000);
    //結果
    setTimeout(function() {
      var random = Math.floor(Math.random() * 3);
      $(".result-screen").show();
      omikuji[random].show();
      omikuji[random].addClass("animated bounceInUp");
    }, 4000);
    //戻るボタン
    setTimeout(function() {
      $("#btn-back").show();
      $("#btn-back").addClass("animated slideInUp faster");
    }, 6000);
  });
  $("#btn-back").on("click", function() {
    location.reload();
  });
});