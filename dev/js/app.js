console.log('app is running');

$('.man').load('/img/man.svg');

// function allowDrop(ev) {
//   ev.preventDefault();
// }
//
// function drag(ev) {
//   ev.dataTransfer.setData('text', ev.target.id);
// }
//
// function drop(ev) {
//   ev.preventDefault();
//   var data = ev.dataTransfer.getData('text');
//   ev.target.appendChild(document.getElementById(data));
// }


function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('text/html', ev.target.id);
}

function drop(ev, target) {
  ev.preventDefault();
  console.log(target.id, ev.target.id)

  var data = ev.dataTransfer.getData('text/html');
  alert(data)
}
