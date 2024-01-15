
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var element = document.getElementById("myCanvas");
var cssWidth = parseFloat(window.getComputedStyle(element).width);
var cssHeight = parseFloat(window.getComputedStyle(element).height);

let painting = false;
let fall = false;

console.log(cssWidth + " " + cssHeight + " : " + canvas.width + " " + canvas.height);


var grid = new Array(canvas.width);

for (var i = 0; i < canvas.width; i++) {
    grid[i] = new Array(canvas.height);
}

grid[1][1] = new Pixel("#6495ed", true);

// Pixel
function Pixel(color, active) {
    this.color = color;
    this.active = active;
}


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

      function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;

        var mousePos = getMousePos(canvas, event);
        console.log(mousePos);
        drawPixel(mousePos.x, mousePos.y, "#6495ed");
    }





// falling

    function start(event){
        if (event.key === " ") {

            fall = true;
            drawPixelsFromGrid();
        }
    }

    function update(){
        if(fall){
            clear();
            moveDown2D(grid, 1, 1);
            drawPixelsFromGrid();
        }
    }



    function moveDown2D(array, x, y) {   
        if(array[x][y] != null){
            if (y < canvas.height - 1) { 
                var temp = array[x][y];
                array[x][y] = array[x][y + 1];
                array[x][y + 1] = temp;

              }
        }
      }



// events
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);

    //Start-event
    document.addEventListener('keydown', start);

    //Simulation
    var intervalID = setInterval(update, 1000); // 1000 Millisekunden = 1 Sekunde


