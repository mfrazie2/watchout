// Declare global variables
var highScore,
    currentScore,
    numberOfCollisions;

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
var enemies = d3.range(12).map(function(){
  return {
    x: Math.random() * 500,
    y: Math.random() * 500
  }
});

for (var i =0 ; i< enemies.length; i ++){
// iterate through enemies array to append to game board
  board.append('image')
  // grabs photo from folder
    .attr('xlink:href','asteroid.png')
    // assigns (x,y) positions based on properties of array[i]
     .attr('x', enemies[i].x)
     .attr('y', enemies[i].y)
    // assigns size of asteroid
    .attr('height', 100)
    .attr('width', 100)
    .classed('enemy',true);
  }



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
  .attr('cx', 50)
  .attr('cy', 50)
  .attr('r', 50)
  .call(drag);

board.selectAll('circle')
  .append('image')
  .attr('xlink:href', 'logo-hr-small.png')
  .attr('height', 25)
  .attr('width', 25);



// move enemies around board to random (x,y)  
var enemyMove = function() {
  d3.selectAll('.enemy')
  .transition()
  .duration(1000)
  .attr('x', function() {return Math.random() * 500;})
  .attr('y', function() {return Math.random() * 500;})
};

var detectCollisions = function(enemy) {
  d3.select('.collisions span')
    .text(numberOfCollisions);
  // calculate distance between hero and enemy
  // if distance < XX
    // collision!
    // collision count increment
};

//detectCollisions();


// sets enemies to move every 1000 ms
//setInterval(enemyMove, 1000); 















