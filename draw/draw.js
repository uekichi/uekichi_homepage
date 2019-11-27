'use strict';

$(function(){
  var canvas = document.getElementById('mycanvas');
  if (!canvas || !canvas.getContext) return false;
  var ctx = canvas.getContext('2d');

  //始点と終点
  var startX;
  var startY;
  var x;
  var y;
  var borderWidth = 10;
  var isDrawing = false;

  $('#mycanvas').mousedown(function(e) {
    isDrawing = true
    startX = e.pageX - $(this).offset().left - borderWidth;
    startY = e.pageY - $(this).offset().top - borderWidth;
  })
  .mousemove(function(e) {
    if (!isDrawing) return;
    x = e.pageX - $(this).offset().left - borderWidth;
    y = e.pageY - $(this).offset().top - borderWidth;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(x, y);
    ctx.stroke();
    startX = x;
    startY = y;
  })
  .mouseup(function() {
    isDrawing = false;
  })
  .mouseleave(function() { //枠の外にはみ出した時に描画ストップ
    isDrawing = false;
  });

  $('#penColor').change(function() {
    ctx.strokeStyle = $(this).val();
  });

  $('#penWidth').change(function() {
    ctx.lineWidth = $(this).val();
  });

  $('#erase').click(function() {
    if (!confirm('消去してもいいですか？')) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  $('#save').click(function() {
    var img = $('<img>').attr({
      width: 100,
      height: 50,
      src: canvas.toDataURL()
    });
    var link = $('<a>').attr({
      href: canvas.toDataURL().replace('image/png', 'application/octet-stream'),
      download: new Date().getTime() + '.png'

    })
    $('#gallery').append(link.append(img.addClass('thumbnail')));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

});