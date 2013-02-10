(function() {
  var Branch;

  Branch = (function() {

    Branch.ids = 0;

    function Branch(props) {
      var _base, _base1, _base2;
      this.props = props;
      this.vertices = [];
      this.branches = [];
      this.savePosition();
      this.id = Branch.ids++;
      (_base = this.props).initial_health || (_base.initial_health = 100);
      (_base1 = this.props).branch_thickness || (_base1.branch_thickness = 7);
      this.health = this.props.initial_health;
      (_base2 = this.props).post_step || (_base2.post_step = function(branch) {
        var left, left_child_props, new_props, right, right_child_props;
        if (branch.props.initial_health > 10 && branch.branches.length < 1 && branch.health < branch.props.initial_health / 2) {
          right_child_props = jQuery.extend(true, {}, branch.props);
          left_child_props = jQuery.extend(true, {}, branch.props);
          new_props = jQuery.extend(true, {}, branch.props);
          new_props.initial_health *= .8;
          new_props.branch_thickness *= .8;
          left = new Branch(jQuery.extend(true, {}, new_props));
          right = new Branch(jQuery.extend(true, {}, new_props));
          branch.spawn(left);
          branch.spawn(right);
          left.savePosition();
          right.savePosition();
          left.rotate(-Math.PI / 12);
          return right.rotate(Math.PI / 12);
        }
      });
    }

    Branch.prototype.spawn = function(branch) {
      return this.branches.push(branch);
    };

    Branch.prototype.rotate = function(amount) {
      var ang, mag;
      ang = this.get_angle();
      mag = this.get_speed();
      this.props.velocity[0] = Math.cos(ang + amount) * mag;
      return this.props.velocity[1] = Math.sin(ang + amount) * mag;
    };

    Branch.prototype.get_angle = function() {
      return Math.atan2(this.props.velocity[1], this.props.velocity[0]);
    };

    Branch.prototype.get_speed = function() {
      return Math.sqrt((this.props.velocity[0] * this.props.velocity[0]) + (this.props.velocity[1] * this.props.velocity[1]));
    };

    Branch.prototype.step = function(count) {
      var i, lng;
      if (count == null) {
        count = 1;
      }
      this.rotate((Math.random() - .5) / 12);
      i = 0;
      lng = this.branches.length;
      while (i < lng) {
        this.branches[i].step();
        i++;
      }
      if (this.health <= 0) {
        return;
      }
      i = 0;
      lng = this.props.position.length;
      while (i < lng) {
        this.props.position[i] += this.props.velocity[i];
        i++;
      }
      this.savePosition();
      this.health--;
      this.props.post_step(this);
      if (this.health <= 0) {
        return this.on_branch_dead();
      }
    };

    Branch.prototype.on_branch_dead = function() {};

    Branch.prototype.draw = function(ctx, drawLast) {
      var i, lng, prevVertex, tempS, vertex, _results;
      if (drawLast == null) {
        drawLast = 1;
      }
      i = 0;
      lng = this.branches.length;
      while (i < lng) {
        this.branches[i].draw(ctx, drawLast);
        i++;
      }
      if (this.health <= 0) {
        return;
      }
      i = this.vertices.length - drawLast;
      tempS = this.vertices.length;
      _results = [];
      while (i < tempS) {
        vertex = this.vertices[i];
        prevVertex = this.vertices[i - 1];
        ctx.lineWidth = this.props.branch_thickness;
        ctx.beginPath();
        ctx.moveTo(prevVertex[0], prevVertex[1]);
        ctx.lineTo(vertex[0], vertex[1]);
        ctx.stroke();
        _results.push(i++);
      }
      return _results;
    };

    Branch.prototype.savePosition = function() {
      return this.vertices.push(this.props.position.concat());
    };

    return Branch;

  })();

  window.Branch = Branch;

}).call(this);
