(function() {
  var Tree, averageColors;

  console.log("Remember to compile!");

  Tree = (function() {

    function Tree(properties) {
      this.properties = properties;
      this.jqSelector = this.properties.jqSelector;
      this.canvas = this.jqSelector.get(0);
      this.ctx = this.canvas.getContext("2d");
      this.trunk = new Branch({
        position: [this.canvas.width / 2, this.canvas.height * .8],
        velocity: [0, -1],
        color: "#000000"
      });
      console.log(this.trunk);
    }

    Tree.prototype.step = function(count) {
      if (count == null) {
        count = 1;
      }
      this.trunk.step(count);
      return this.trunk.draw(this.ctx);
    };

    Tree.prototype.clearScreen = function() {
      this.ctx.save();
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      return this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    return Tree;

  })();

  window.Tree = Tree;

  averageColors = function(col1, col2, weight1, weight2) {
    var c1, c2, c3;
    if (weight1 == null) {
      weight1 = 1;
    }
    if (weight2 == null) {
      weight2 = 1;
    }
    col1 = parseInt(col1.replace("#", ""), 16);
    col2 = parseInt(col2.replace("#", ""), 16);
    c1 = {
      r: col1 >> 16 & 0xFF,
      g: col1 >> 8 & 0xFF,
      b: col1 & 0xFF
    };
    c2 = {
      r: col2 >> 16 & 0xFF,
      g: col2 >> 8 & 0xFF,
      b: col2 & 0xFF
    };
    c3 = new Object();
    c3.r = (c1.r * weight1 + c2.r * weight2) / (weight1 + weight2);
    c3.g = (c1.g * weight1 + c2.g * weight2) / (weight1 + weight2);
    c3.b = (c1.b * weight1 + c2.b * weight2) / (weight1 + weight2);
    return "#" + ((c3.r << 16) | (c3.g << 8) | c3.b).toString(16);
  };

  window.averageColors = averageColors;

}).call(this);
