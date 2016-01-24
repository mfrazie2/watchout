// Declare global variables
var highScore = 0,
    currentScore = 0,
    collisionCount = 0;

// create a gameboard
var board = d3.select('.game-board')
  //append a svg
  .append('svg')
  // set a width value
  .attr('width', 500)
  //set a height value
  .attr('height', 500)
  // set css style background-color
  .style({'background-color': 'blue'});

// append enemy to gameboard  
/*var enemy = board.append('image')
// gets the asteroid image
  .attr('xlink:href','asteroid.png')
  // initial position
  .attr('x',100)
  .attr('y',100)
  // size of enemy
  .attr('height', 100)
  .attr('width', 100);
  */

// creates array of 12 enemies with random (x,y) properties  
var createEnemies = function(n) {
  return d3.range(0, n).map(function(i){
    return {
      id: i,
      x: Math.random() * 500,
      y: Math.random() * 500
    }
  });
};

/// svg enemies
d3.select('.game-board')
  .append('svg')
  .attr({ id: 'mySVG',
          width: 100,
          height: 100 })
  .append('defs')
  .attr({ id: 'myDefs'})
  .append('pattern')
  .attr({ id: 'image',
          x: 0,
          y: 0,
          height: 50,
          width: 50 })
  .append('image')
  .attr({ x: 0, 
          y: 0,
          width: 49,
          height: 49,
          'xlink:href': './asteroid.png' });
  
  //svg for hero
  
  d3.select('.game-board')
    .append('svg')
    .attr({id : 'heroSvg', width: 100, height: 100})
    .append('defs')
    .attr({id : 'heroDefs'})
    .append('pattern')
    .attr({id :'heroImage', x:0, y:0, height: 50, width: 50})
    .append('image')
    .attr({x:0 ,y:0, height: 49, width: 49, 'xlink:href': './logo-hr-small.png' });
    

var enemies = board.selectAll('circle')
  .data(createEnemies(12))
  .enter()
  .append('circle')
  .attr('class', 'enemy')
  .attr('cx', function(d){return d.x})
  .attr('cy', function(d){return d.y})
  .attr('r', 20)
  .style('fill', 'url(#image)');
// for (var i =0 ; i< enemies.length; i ++){
// // iterate through enemies array to append to game board
//   board.append('image')
//   // grabs photo from folder
//     .attr('xlink:href','asteroid.png')
//     // assigns (x,y) positions based on properties of array[i]
//      .attr('x', enemies[i].x)
//      .attr('y', enemies[i].y)
//     // assigns size of asteroid
//     .attr('height', 100)
//     .attr('width', 100)
//     .classed('enemy',true);
//   }



// drag the hero!
var drag = d3.behavior.drag().on('drag', function() {
  hero.attr('cx', d3.event.x)
      .attr('cy', d3.event.y);
});


// var defs = board.append('svg:defs')
//   .append('svg:pattern')
//   .classed('hero', true)
//   .attr('patternUnits', 'userSpaceOnUse')
//   .attr('height', 100)
//   .attr('width', 100)
//   .append('svg:image')
//   .attr('xlink:href', 'logo-hr-small.png') 
//   .attr('x',75)
//   .attr('y',250)
//   .attr('height', 100)
//   .attr('width', 100)
  
 var hero = board.append('circle')
  .attr('class', 'hero')
  .attr('cx', 250)
  .attr('cy', 250)
  .attr('r', 25)
  .style('fill', 'url(#heroImage)')
  .call(drag)
// var hero = board.append('circle')
//   .attr('cx', 50)
//   .attr('cy', 50)
//   .attr('r', 50)
//   .call(drag);

// board.selectAll('circle')
//   .append('image')
//   .attr('xlink:href', 'logo-hr-small.png')
//   .attr('height', 25)
//   .attr('width', 25);



// move enemies around board to random (x,y)  
var enemyMove = function() {
  board.selectAll('.enemy')
  .transition()
  .duration(1000)
  .tween('collisionDetector', detectCollisions)
  .attr('cx', function() {return Math.random() * 500;})
  .attr('cy', function() {return Math.random() * 500;})
  
};

var detectCollisions = function() {
  var hasCollided = false;
  var that = d3.select(this);
  return function(){
    //console.log("Working");
    if (!hasCollided){
      var currentX = Math.floor(that.attr('cx'));
      var currentY = Math.floor(that.attr('cy'));
      var currentR = that.attr('r');
      var heroY = hero.attr('cy');
      var heroX = hero.attr('cx');
      var heroR = hero.attr('r');
  
    // use pythag to get distance between hero and enemy
      var distance = Math.sqrt(Math.pow(heroX - currentX, 2) + Math.pow(heroY - currentY, 2));
    //console.log(distance);
    // if distance is less than the hero radius
        if(distance < 1.5* heroR) {
          console.log("Collision!")
          hasCollided = true;
          updateCollisionCount();
          updateHighScore();
          currentScore = 0;
          
      //collisions
        }
   }
  };
  // d3.select('.collisions span')
  //   .text(numberOfCollisions);
  // // calculate distance between hero and enemy
  // if distance < XX
    // collision!
    // collision count increment
};

 var updateCollisionCount =function(){
   collisionCount++;
   d3.select('.collisions span')
    .text(collisionCount);
 }

var updateScore = function() {
  currentScore++;
  d3.select('.current span')
    .text(currentScore);
};

var updateHighScore = function() {
  if(currentScore > highScore) {
    highScore = currentScore;
  }
  d3.select('.high span')
      .text(highScore);
};

// update the current score every 250 ms
setInterval(updateScore, 250);
// sets enemies to move every 1000 ms
 setInterval(enemyMove, 1000); 















