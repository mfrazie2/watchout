// Declare global variables
var highScore = 0,
    currentScore = 0,
    collisionCount = 0;

var windowHeight = window.innerHeight,
    windowWidth = window.innerWidth;

// create a gameboard
var board = d3.select('.game-board')
  //append a svg
  .append('svg')
  // set a width value
  .attr('width', windowWidth)
  //set a height value
  .attr('height', windowHeight)
  // set css style background-color
  .style({'background-image': 'url(./background.png)' });

// creates array of 12 enemies with random (x,y) properties  
var createEnemies = function(n) {
  return d3.range(0, n).map(function(i){
    return {
      id: i,
      x: Math.random() * windowWidth,
      y: Math.random() * windowHeight
    }
  });
};

// svg enemies
d3.select('.game-board')
  .append('svg')
  .attr({ id: 'mySVG', width: 100, height: 100 })
  .append('defs')
  .attr({ id: 'myDefs'})
  .append('pattern')
  .attr({ id: 'image', x: 0, y: 0, height: 50, width: 50 })
  .append('image')
  .attr({ x: 0, y: 0, width: 49, height: 49, 'xlink:href': './asteroid.png' });
  
// svg for hero
d3.select('.game-board')
  .append('svg')
  .attr({id : 'heroSvg', width: 100, height: 100})
  .append('defs')
  .attr({id : 'heroDefs'})
  .append('pattern')
  .attr({id :'heroImage', x:0, y:0, height: 50, width: 50})
  .append('image')
  .attr({x:0 ,y:0, height: 49, width: 49, 'xlink:href': './logo-hr-small.png' });
    
// add enemies to the game board
var enemies = board.selectAll('circle')
  .data(createEnemies(12))
  .enter()
  .append('circle')
  .attr('class', 'enemy')
  .attr('cx', function(d){return d.x})
  .attr('cy', function(d){return d.y})
  .attr('r', 20)
  .style('fill', 'url(#image)');

// drag the hero!
var drag = d3.behavior
  .drag().on('dragstart', function() {circle.style('fill', 'url(#heroImage')})
  .on('drag', function() {hero.attr('cx', d3.event.x).attr('cy', d3.event.y);})
  .on('dragend', function() {circle.style('fill', 'url(#heroImage')});

// add hero to game board  
 var hero = board.append('circle')
  .attr('class', 'hero')
  .attr('cx', 250)
  .attr('cy', 250)
  .attr('r', 25)
  .style('fill', 'url(#heroImage)')
  .call(drag);

// move enemies around board to random (x,y)  
var enemyMove = function() {
  //board.selectAll('.enemy')
   enemies.data(createEnemies(12))
  .transition()
  .duration(500)
  .tween('collisionDetector', detectCollisions)
  .attr('cx', function(d) {return d.x;})
  .attr('cy', function(d) {return d.y;});
};

// detect collisions between enemies and hero during transition
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
    // if distance is less than 1.5 x hero radius
      if(distance < 1.5* heroR) {
        hasCollided = true;
        updateCollisionCount();
        updateHighScore();
        currentScore = 0;
      }
    }
  };
};

// function to update the collision count and append it on the scoreboard 
var updateCollisionCount =function(){
  collisionCount++;
  d3.select('.collisions span')
    .text(collisionCount);
}

// function to update the current score and append it on the scoreboard
var updateScore = function() {
  currentScore++;
  d3.select('.current span')
    .text(currentScore);
};

// function to update the high score, if needed, and append it on the scoreboard
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
