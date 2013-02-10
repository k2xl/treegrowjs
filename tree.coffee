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
      color:"#000000"
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

averageColors = (col1, col2, weight1 =1, weight2 =1) ->
  col1 = parseInt(col1.replace("#", ""), 16)
  col2 = parseInt(col2.replace("#", ""), 16)
  c1 =
    r: col1 >> 16 & 0xFF
    g: col1 >> 8 & 0xFF
    b: col1 & 0xFF

  c2 =
    r: col2 >> 16 & 0xFF
    g: col2 >> 8 & 0xFF
    b: col2 & 0xFF

  c3 = new Object()
  c3.r = (c1.r * weight1 + c2.r * weight2) / (weight1 + weight2)
  c3.g = (c1.g * weight1 + c2.g * weight2) / (weight1 + weight2)
  c3.b = (c1.b * weight1 + c2.b * weight2) / (weight1 + weight2)
  "#" + ((c3.r << 16) | (c3.g << 8) | c3.b).toString(16)
# Global function used to evolve branch colors
window.averageColors = averageColors
  
  