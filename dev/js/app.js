var app = new Vue({
  el: '#urinal-checkmate',

  data: {
    page: { message: 'loading...' },
    restroom: {},
    database: 'data/data.json'
  },

  created: function() {
    this.update()
  },

  watch: {
    'page.message': function (nuval, olval) {
      console.log('new: %s, old: %s', nuval, olval)
    }
  },

  directives: {
    include: function() {
      var url = this.expression
      var _this = this
      var request = new XMLHttpRequest()
      request.open('GET', url, true)
      request.onreadystatechange = function() {
        if (this.readyState !== 4) return
        if (this.status !== 200) return
        _this.el.innerHTML = this.responseText
      }
      request.send();
    },

    draggable: {
      bind: function() {
        this.el.draggable = 'true',
        this.el.ondragstart = function(ev) {
          ev.dataTransfer.setData('text', ev.target.id)
          console.log('dragging...')
        }
      }
    },

    droppable: {
      bind: function() {
        var condition = this.expression
        this.el.ondrop = function(ev) {
          ev.preventDefault()
          var data = ev.dataTransfer.getData('text')
          ev.target.appendChild(document.getElementById(data))
          console.log(this.id)
        },

        this.el.ondragover = function(ev) {
          ev.preventDefault();
        }
      }
    }
  },

  methods: {

    update: function() {
      var _this = this;
      var request = new XMLHttpRequest()
      request.open('GET', this.database)
      request.onload = function () {
        var result = JSON.parse(request.responseText)
        _this.page = result.page
        _this.restroom = result.restroom
      }
      request.send();
    }

  }

});
