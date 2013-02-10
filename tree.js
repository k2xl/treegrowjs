(function() {
  var Tree;

  console.log("Remember to compile!");

  Tree = (function() {

    function Tree(properties) {
      this.properties = properties;
      this.jqSelector = this.properties.jqSelector;
      this.canvas = this.jqSelector.get(0);
      this.ctx = this.canvas.getContext("2d");
      this.trunk = new Branch({
        position: [this.canvas.width / 2, this.canvas.height * .8],
        velocity: [0, -1]
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

}).call(this);
