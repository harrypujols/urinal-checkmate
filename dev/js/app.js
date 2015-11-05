var app = new Vue({
  el: '#urinal-checkmate',

  data: {
    page: { message: 'loading...' },
    colors: null
  },

  created: function() {
    this.update()
  },

  watch: {
    'page.message': function (val, oldval) {
      console.log('new: %s, old: %s', val, oldval)
    }
  },

  methods: {

    update: function() {
      var _this = this;
      var request = new XMLHttpRequest()
      request.open('GET', 'data/data.json')
      request.onload = function () {
        result = JSON.parse(request.responseText)
        _this.page = result.page
        _this.restroom = result.restroom
      }
      request.send();
    }

  }
});


function load(file, element) {
  var xhr= new XMLHttpRequest();
  xhr.open('GET', file, true);
  xhr.onreadystatechange= function() {
    if (this.readyState!==4) return;
    if (this.status!==200) return;
    document.getElementById(element).innerHTML= this.responseText;
  };
  xhr.send();
}

load('img/man.svg', 'svg');
