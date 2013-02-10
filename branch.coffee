class Branch
  # properties
  @ids = 0
  constructor:(@props)->
    @vertices = []
    @branches = []
    # console.log("initializing with ",@props)
    @savePosition()
    @id = Branch.ids++
    @props.initial_health ||= 100
    @props.branch_thickness || = 7
    @health = @props.initial_health
    @props.post_step ||=(branch)->
      if (branch.props.initial_health > 10 && branch.branches.length < 1 && branch.health < branch.props.initial_health/2)
        right_child_props= jQuery.extend(true,{},branch.props)
        left_child_props = jQuery.extend(true,{},branch.props)
        new_props = jQuery.extend(true,{},branch.props)
        new_props.initial_health*=.8;
        new_props.branch_thickness*=.8
        left = new Branch(jQuery.extend(true,{},new_props))
        right = new Branch(jQuery.extend(true,{},new_props))
        branch.spawn(left)
        branch.spawn(right)
        left.savePosition()
        right.savePosition()
        left.rotate(-Math.PI/8)
        right.rotate(Math.PI/8)
  spawn:(branch)->
    @branches.push(branch)
  rotate:(amount)->
    ang = @get_angle()
    mag = @get_speed()
    @props.velocity[0] = Math.cos(ang+amount)*mag
    @props.velocity[1] = Math.sin(ang+amount)*mag
    
  get_angle:->
    Math.atan2(@props.velocity[1],@props.velocity[0])
  get_speed:->
    Math.sqrt((@props.velocity[0]*@props.velocity[0])+(@props.velocity[1]*@props.velocity[1]))
  step:(count=1)->
    # console.log(@id,@get_speed())
    @rotate( (Math.random()-.5)/10)
    i = 0
    lng = @branches.length
    while (i < lng)
      @branches[i].step()
      i++
    return if @health <= 0
    i = 0
    lng = @props.position.length
    while (i < lng)
      @props.position[i]+=@props.velocity[i]
      i++
    @savePosition()
    @health--
    @props.post_step(this)
    if (@health <= 0)
      @on_branch_dead()
    
  on_branch_dead:->
    # TODO: dispatch to Tree that branch is dead
  draw:(ctx,drawLast=1)->
    i = 0
    lng = @branches.length
    while (i < lng)
      @branches[i].draw(ctx,drawLast)
      i++
    return if @health <= 0
    i = (@vertices.length-drawLast)
    tempS = @vertices.length
    while (i < tempS)
      vertex = @vertices[i]
      prevVertex = @vertices[i-1]
      ctx.lineWidth = @props.branch_thickness
      ctx.beginPath();
      ctx.moveTo(prevVertex[0],prevVertex[1]);
      ctx.lineTo(vertex[0],vertex[1]);
      ctx.stroke();
      i++
    
  savePosition:->
    @vertices.push(@props.position.concat())
window.Branch = Branch