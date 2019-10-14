function vec(x_, y_){
  this.x = x_;
  this.y = y_;
  
  this.add = function(vec_){
    return new vec(this.x + vec_.x, this.y + vec_.y);
  };
  this.sub = function(vec_){
    return new vec(this.x - vec_.x, this.y - vec_.y);
  };
  this.mult = function(val){
    return new vec(this.x * val, this.y * val);
  };
  this.div = function(val){
    return new vec(this.x/val, this.y/val);
  };
  this.abs = function(){
    return new vec(Math.abs(this.x), Math.abs(this.y));
  };
  this.dot = function(vec_){
    return (this.x*vec_.x+this.y*vec_.y);
  };
  this.length = function(){
    return Math.sqrt(this.dot(this));
  };
  this.normalise = function(){
    var vlen = this.length();
    this.x = this.x/vlen;
    this.y = this.y/vlen;
  };
}