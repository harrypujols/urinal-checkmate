console.log('app is running');
$('#message').text('urinal chess');
$('.man').load('/img/man.svg');

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev, target) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData('text');
  ev.target.appendChild(document.getElementById(data));

  $('#message').removeClass('wrong');
  if (target.id == 'correct') {
    $('#message').text('checkmate');
  } else {
    $('#message').text('wrong').addClass('wrong');
  }
}

$('#drag')
.mousedown(function() {
  $(this).addClass('dragging');
})
.mouseup(function() {
  $(this).removeClass('dragging');
});
