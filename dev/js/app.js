var app = new Vue({
  el: '#urinal-checkmate',

  data: {
    page: { message: 'loading...' },
    restroom: {},
    stage: 0,
    database: 'data/data.json'
  },

  ready: function() {
    this.update()
  },

  watch: {
    'page.message': function (nuval, olval) {
      console.log('new: %s, old: %s', nuval, olval)

      if (nuval == 'checkmate') {
        // function for next round
      }
    }
  },

  computed: {
    checkmate: function() {
      var result = this.restroom[this.stage].checkmate - 1
      if (result < 0) {
        result = 0
      }
      return result
    },

    enemy: function() {
      var result = this.restroom[this.stage].enemy[0] - 1
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
      update: function(drop) {
        var _this = drop
        this.el.ondrop = function(ev) {
          ev.preventDefault()
          ev.stopPropagation()
          var data = ev.dataTransfer.getData('text')
          this.appendChild(document.getElementById(data))
          var selected = this.id
          _this(selected)
          return false
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
      }

      request.send();

      if (Modernizr.touch) {
        this.page.message = 'Play it on your desktop browser'
      }
    },

    drop: function(urinal) {
      if (urinal == 'correct') {
        this.page.message = 'checkmate'
      } else {
        this.page.message = 'wrong'
      }

      console.log(this.page.message)
    }
  }

});
