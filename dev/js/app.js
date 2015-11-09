var app = new Vue({
  el: '#urinal-checkmate',

  data: {
    page: { message: 'loading...' },
    restroom: {},
    stage: 0,
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

  computed: {
    checkmate: function() {
      var result = this.restroom[this.stage].checkmate - 1
      if (result < 0) {
        result = 0
      }
      return result
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
          this.classList.add('dragging')
          console.log('dragging...')
        }

        this.el.ondragend = function() {
          this.classList.remove('dragging')
        }
      }
    },

    droppable: {
      update: function(dropped) {
        var _this = dropped
        this.el.ondrop = function(ev) {
          ev.preventDefault()
          var data = ev.dataTransfer.getData('text')
          ev.target.appendChild(document.getElementById(data))
          var selected = this.id
          _this(selected)
        }

        this.el.ondragover = function(ev) {
          ev.preventDefault();
        }
      }
    }
  },

  methods: {
    update: function() {
      var _this = this
      var request = new XMLHttpRequest()
      request.open('GET', this.database)
      request.onload = function () {
        var result = JSON.parse(request.responseText)
        _this.page = result.page
        _this.restroom = result.restroom

        if (Modernizr.touch) {
          _this.page.message = 'Play it on your desktop browser'
        }

      }
      request.send();
    },

    drop: function(selected) {
      if (selected == 'correct') {
        this.page.message = 'checkmate'
      } else {
        this.page.message = 'wrong'
      }

      console.log(this.page.message)
    }
  }

});
