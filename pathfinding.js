// the game's canvas element
var canvas = null;
// the canvas 2d context
var ctx = null;
// an image containing all sprites
var spritesheet = null;
// true when the spritesheet has been downloaded
var spritesheetLoaded = false;

// the world grid: a 2d array of tiles
var world = [[]];

// size in the world in sprite tiles
var worldWidth = 16;
var worldHeight = 16;

// size of a tile in pixels
var tileWidth = 32;
var tileHeight = 32;

// start and end of path
var pathStart = [worldWidth,worldHeight];
var pathEnd = [0,0];
var currentPath = [];

// ensure that concole.log doesn't cause errors
if (typeof console == "undefined") var console = { log: function() {} };

// the html page is ready
function onload() 
{
  console.log('Page loaded.');
  canvas = document.getElementById('gameCanvas');
  canvas.width = worldWidth * tileWidth;
  canvas.height = worldHeight * tileHeight;
  canvas.addEventListener("click", canvasClick, false);
  ctx = canvas.getContext("2d");
  spritesheet = new Image();
  spritesheet.src = 'spritesheet.png';
  spritesheet.onload = loaded;
}

// the spritesheet is ready
function loaded() 
{
  console.log('Spritesheet loaded.');
  spritesheetLoaded = true;
  createWorld();
}

// fill the world with walls
function createWorld()
{
  console.log('Creating world...');
  
  // create emptiness
  for (var x=0; x < worldWidth; x++)
  {
    world[x] = [];
    
    for (var y=0; y < worldHeight; y++)
    {
      world[x][y] = 0;
    }
  }
  
  // scatter some walls
  for (var x=0; x < worldWidth; x++)
  {
    for (var y=0; y < worldHeight; y++)
    {
      if (Math.random() > 0.75)
        world[x][y] = 1;
    }
  }
  
  // calculate initial possible path
  // note: unlikely but possible to never find one...
  currentPath = [];
  while (currentPath.length == 0) 
  {
    pathStart = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];
    pathEnd = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];
    if (world[pathStart[0]][pathStart[1]] == 0)
      currentPath = findPath(world,pathStart,pathEnd,'Manhattan');
  }
  redraw();
  
}
