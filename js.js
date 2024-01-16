//---SceneSetup----------------------------------
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var element = document.getElementById("myCanvas");
var cssWidth = parseFloat(window.getComputedStyle(element).width);
var cssHeight = parseFloat(window.getComputedStyle(element).height);

//---Buttons-------------------------------------
var sandButton = document.getElementById('sand-button');
var waterButton = document.getElementById('water-button');
var stoneButton = document.getElementById('stone-button');

//---Properties----------------------------------

let painting = false;
let fall = false;

var grid = initGrid();
var gridNext = copyArray(grid);

var mousePos;
var type = 1;

start();


// Drawing
    function drawPixel(x, y, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }
  
    function drawPixelsFromGrid(){
        for (var x = 0; x < canvas.width; x++) {
            for (var y = 0; y < canvas.height; y++) {
                if(grid[x][y] != null){
                    drawPixel(x, y, grid[x][y].color);
                }
            }
        }
    }

    function clear(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


// Drawing-Input
    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: Math.floor((((event.clientX - rect.left) / cssWidth) * canvas.width)),
          y: Math.floor((((event.clientY - rect.top) / cssHeight) * canvas.height))
        };
    }

    function startDraw(e) {
        painting = true;
    }

    function endDraw() {
        painting = false;
        ctx.beginPath();
    }

    function mouseMove(e) {
        mousePos = getMousePos(canvas, e);
    }

    function create(){
        if (!painting) return;
        grid[mousePos.x][mousePos.y] = new Pixel(type);    
    }

    function randomHex(){
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        return "#"+randomColor;
    }



// Grid and Datastructure
    function initGrid(){
        var grid = new Array(canvas.width);
        for (var i = 0; i < canvas.width; i++) {
            grid[i] = new Array(canvas.height);
        }
        return grid;
    }

    function Pixel(type) {
        this.type = type;
        switch (this.type) {
            case 1:
                this.color = "#ffd966";
                break;
            case 2:
                this.color = "#3498db";
                break;
            case 3:
                this.color = "#3b3b3b"
        }

        //0 = sand
        //1 = water
        //2 = stone
    }

    function copyArray(array){
        var newArray = [];

        for (var i = 0; i < array.length; i++){
            newArray[i] = array[i].slice();
        }

        return newArray;
    }


// Simulation
    function start(e){
        fall = true;
        drawPixelsFromGrid(); 
    }

    function update(){
        if(fall){
            gridNext = copyArray(grid);     
            simulate();
            grid = copyArray(gridNext);
            
            clear();
            drawPixelsFromGrid();
        }
    }

    function simulate(){
        for (var x = 0; x < canvas.width; x++) {
            for (var y = 0; y < canvas.height; y++) {
                
                if(grid[x][y] != null){

                    if(grid[x][y].type == 1){
                        if(isEmpty(x, y + 1) || isFluid(x, y + 1)){
                            moveDown2D(gridNext, x, y);
                        }
    
                        if(isEmpty(x - 1, y + 1) || isFluid(x - 1, y + 1)){
                            moveDownLeft2D(gridNext, x, y);
                        }
    
                        if(isEmpty(x + 1, y + 1) || isFluid(x + 1, y + 1)){
                            moveDownRight2D(gridNext, x, y);
                        }
                        
                    }

                    if(grid[x][y].type == 2){
                        if(isEmpty(x, y + 1)){
                            moveDown2D(gridNext, x, y);
                        }
    
                        if(isEmpty(x - 1, y + 1)){
                            moveDownLeft2D(gridNext, x, y);
                        }
    
                        if(isEmpty(x + 1, y + 1)){
                            moveDownRight2D(gridNext, x, y);
                        }

                        if(isEmpty(x + 1, y)){
                            moveRight2D(gridNext, x, y);
                        }

                        if(isEmpty(x - 1, y)){
                            moveLeft2D(gridNext, x, y);
                        }
                    }

                
                }

            }

        }
    }
    


    function moveDown2D(array, x, y) {
        var temp = array[x][y];
        array[x][y] = array[x][y + 1];
        array[x][y + 1] = temp;  
    }

    function moveDownLeft2D(array, x, y) {
        var temp = array[x][y];
        array[x][y] = array[x - 1][y + 1];
        array[x - 1][y + 1] = temp; 
    }

    function moveDownRight2D(array, x, y) {
        var temp = array[x][y];
        array[x][y] = array[x + 1][y + 1];
        array[x + 1][y + 1] = temp;    
    }

    function moveRight2D(array, x, y) {
        var temp = array[x][y];
        array[x][y] = array[x + 1][y];
        array[x + 1][y] = temp;    
    }

    function moveLeft2D(array, x, y) {
        var temp = array[x][y];
        array[x][y] = array[x - 1][y];
        array[x - 1][y] = temp;    
    }

    function isEmpty(x, y){
        if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
            return false;
        }

        return gridNext[x][y] == null ? true : false;
    }

    function isFluid(x, y){
        if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height || gridNext[x][y] == null ) {
            return false;
        }

        return gridNext[x][y].type == 2 ? true : false;
    } 


    function createSand() {type = 1; console.log("sand-button");}
    function createWater() {type = 2; console.log("water-button");}
    function createStone() {type = 3; console.log("stone-button");}



    //events
    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mouseup', endDraw);
    canvas.addEventListener('mousemove', mouseMove);


    sandButton.addEventListener('click', createSand);
    waterButton.addEventListener('click', createWater);
    stoneButton.addEventListener('click', createStone);
    
    //Simulation
    var intervalID = setInterval(update, 5);
    var IntervalCreate = setInterval(create, 5);

