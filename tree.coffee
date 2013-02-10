console.log("Remember to compile!")
class Tree
  constructor: (@properties)->
    @jqSelector = @properties.jqSelector
    @canvas = @jqSelector.get(0)
    @ctx = @canvas.getContext("2d")
    # branch objects
    @trunk = new Branch(
      position:[@canvas.width/2,@canvas.height*.8]
      velocity:[0,-1]
    )
    console.log(@trunk)
  step:(count=1)->
    #@clearScreen()
    
    @trunk.step(count)
    @trunk.draw(@ctx);
  clearScreen:->
    # clearing screen method from StackOverFlow Post http://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
    # Store the current transformation matrix
    @ctx.save()
    # Use the identity matrix while clearing the canvas
    @ctx.setTransform(1, 0, 0, 1, 0, 0)
    @ctx.clearRect(0, 0, @canvas.width, @canvas.height)
window.Tree = Tree;
  
  