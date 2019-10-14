function map(val, currentLB, currentUB, targetLB, targetUB){
  var bounds = currentUB-currentLB;
  var percent = (bounds/100)*val;
  var newBounds = targetUB - targetLB;
  var newPos = (newBounds/100)*percent;
  return newPos;
}