app = new Vue(
  el: '#urinal-checkmate'
  data:
    database: 'data/data.json'
    page: message: 'loading...'
    restroom: {}
    stage: 0
    score: 0
    attempt: 0
    urinals: null
    reload: false
    endgame: false
  ready: ->
    if Modernizr.touch
      @page.message = 'Play it on your desktop browser'
    else
      @import()
    return
  watch:
    'page.message': (nuval, olval) ->
      if nuval == 'checkmate'
        if @attempt <= 1
          @score++
        @reload = true
      return
    'restroom': ->
      if typeof null == 'object'
        @urinals = @restroom[@stage].urinals
        return @urinals
      return
    'stage': ->
      if typeof null == 'object'
        @urinals = @restroom[@stage].urinals
        return @urinals
      return
  computed:
    checkmate: ->
      result = @restroom[@stage].checkmate - 1
      if result < 0
        result = 0
      result
    enemy: ->
      enemies = @restroom[@stage].enemies
      enemy = []
      i = 0
      while i < enemies.length
        enemy.push enemies[i] - 1
        i++
      enemy
  directives:
    include: ->
      url = @expression
      that = this
      request = new XMLHttpRequest
      request.open 'GET', url, true

      request.onreadystatechange = ->
        if @readyState != 4
          return
        if @status != 200
          return
        that.el.innerHTML = @responseText
        return

      request.send()
      return
    draggable: bind: ->
      @el.draggable = 'true'

      @el.ondragstart = (ev) ->
        ev.dataTransfer.setData 'text', ev.target.id
        @classList.add 'dragging'
        console.log 'dragging...'
        return

@el.ondragend = ->
        @classList.remove 'dragging'
        return

      return
    droppable: update: (drop) ->
      selected = drop

      @el.ondrop = (ev) ->
        ev.preventDefault()
        ev.stopPropagation()
        data = ev.dataTransfer.getData('text')
        selected @id
        @appendChild document.getElementById(data)
        false

      @el.ondragover = (ev) ->
        ev.preventDefault()
        return

      return
  methods:
    import: ->
      that = this
      request = new XMLHttpRequest
      request.open 'GET', @database

      request.onload = ->
        result = JSON.parse(request.responseText)
        that.page = result.page
        that.restroom = result.restroom
        return

      request.send()
      return
    drop: (urinal) ->
      if urinal == 'correct'
        @page.message = 'checkmate'
      else
        @page.message = 'wrong'
      @attempt++
      return
    comeback: ->
      entrance = document.getElementById('start-position')
      man = document.getElementById('man')
      entrance.appendChild man
      return
    continue: ->
      last = @restroom.length - 1
      if @stage >= last
        @stage = last
        @endgame = true
        @page.message = 'Game Over'
      else
        @stage++
        @reload = false
        @attempt = 0
        @import()
        @comeback()
      return
    restart: ->
      location.reload()
      return
)
