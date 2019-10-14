var can = document.getElementById("particleCanvas");
var ctx = can.getContext("2d");
//can.addEventListener("mousedown", addParticleSystem, false);

var w = can.width, h = can.height;
var numParticles = 100;
var gravity = new vec(0, 2);
var friction = 0.98;
var wind = new vec(0.15, 0);

var systems = [];

var att = new attractor(new vec(w/2, h/2));

function particle(loc, acc, mass_) {
  this.mass = mass_;
  this.location = new vec(loc.x, loc.y);
  this.velocity = new vec(0, 0);
  this.acceleration = new vec(acc.x, acc.y);
  this.lifeSpan = 255*2;
  this.dead = false;

  this.applyForce = function (force_) {
    var force = new vec(force_.x, force_.y);
    force = force.div(this.mass);
    this.acceleration = this.acceleration.add(force);
  };

  this.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0," + map(this.lifeSpan,0,255,0,1) + ")";
    ctx.arc(this.location.x, this.location.y, this.mass, 0, Math.PI * 2);
    ctx.fill();
  };
}

function particleSystem(origin_) {
  var origin = new vec(origin_.x, origin_.y);
  this.constantLimit = 100;
  this.limit = this.constantLimit;
  this.particles = [];
  this.full = false;
  this.finished = false;
  this.deathToll = 0;

  this.addBatchParticles = function () {
    for (var i = 0; i < this.limit; i++) {
      this.particles.unshift(new particle(origin, new vec((Math.random() * 4) - 2, (Math.random() * 4) - 2), 5));
    }
  };

  this.addParticles = function (loc_) {
    if (this.limit === 0) {
      this.full = true;
      return;
    } else {
      this.particles.unshift(new particle(origin, new vec((Math.random() * 10) - 5, (Math.random() * 10) - 5), Math.random()*10));
      this.limit--;
    }
  };

  this.updateParticles = function (p_) {
    var p = p_;

    //p.applyForce(gravity);
    p.applyForce(att.attract(p));

    p.velocity = p.velocity.add(p.acceleration);
    p.location = p.location.add(p.velocity);
    p.acceleration = p.acceleration.mult(0);

    p.lifeSpan-=0.5;

    if (p.lifeSpan <= 1) {
      p.dead = true;
    } else {
      p.dead = false;
    }

  };

  this.bounceOffEdges = function(){
    if (p.location.x < p.mass) {
      p.location.x = p.mass;
      p.velocity.x *= -1;
    } else if (p.location.x > w - p.mass) {
      p.location.x = w - p.mass;
      p.velocity.x *= -1;
    } else if (p.location.y < p.mass) {
      p.location.y = p.mass;
      p.velocity.y *= -1;
    } else if (p.location.y > h - p.mass) {
      p.location.y = h - p.mass;
      p.velocity.y *= -1;
      p.velocity = p.velocity.mult(friction);
    }
  };

  this.drawParticles = function (p_) {
    var p = p_;
    p.draw();
  };

  this.run = function () {
    for (var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];
      this.updateParticles(p);
      this.drawParticles(p);
      if (p.dead) {
        this.deathToll++;
        this.particles.splice(i, 1);
        if(this.deathToll == this.constantLimit){
          this.finished = true;
        }
      }
    }
  };
}

function attractor(loc_){
  var location = new vec(loc_.x, loc_.y);
  this.mass = 2;
  this.G = 5000;

  this.attract = function(p_){
    this.p = p_;
    this.dir = location.sub(this.p.location);
    this.d = this.dir.length();
    this.dir.normalise();
    this.force = this.G/(this.mass*this.d*this.d);
    this.dir.mult(this.force);
    return this.dir;
  };
}

function windResistance(){

}

function addParticleSystem(e) {
  var x = e.x;
  var y = e.y;

  x -= can.offsetLeft;
  y -= can.offsetTop;

  var origin = new vec(x, y);
  systems.unshift(new particleSystem(origin));
}

function updateParticleSystem() {
  for (var i = 0; i < systems.length; i++) {
    var ps = systems[i];
    if(ps.finished){
      systems.splice(i, 1);
    } else {
      ps.addParticles();
      ps.run();
    }
  }
}

function draw() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  updateParticleSystem();
  console.log(systems.length);
}

addParticleSystem(new vec(w/2, h/2));
setInterval(draw, 30);


