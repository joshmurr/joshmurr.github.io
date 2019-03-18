---
layout: post
title: "More Vectors"
date: 2019-03-18
---

[![reynolds](http://www.red3d.com/cwr/steer/gdc99/figure8.gif)](http://www.red3d.com/cwr/steer/gdc99/)

I've made some progress on the ofxBoids library I'm working on. Simple graphics with Vectors still involved some head scratching, but it's getting easier. My first attempt at implementing Craig Reynolds 'wandering' algorithm in JavaScript was a mess. It kind of worked, but in a really weird way. I won't go into it too much. 

![js-jitter](../../../assets/images/vectors/jitter_target.gif)

Back in OpenFrameworks things went a bit more smoothly and it wasn't long before I was simply added a vector of a given magnitude and a random angle to the *desired* vector the boid was seeking.

![jitter-boid](../../../assets/images/vectors/jitter_target_better.gif)

It took longer to get the _debug_ symbols to appear where I wanted them too, as the differentiation between a vector as a point in space, and a vector which describes magnitude and direction still gets me. But again, this seemed like a worthwhile exercise.

![jitter-boid-debug](../../../assets/images/vectors/jitter_target_debug.gif)

<br>
Josh
