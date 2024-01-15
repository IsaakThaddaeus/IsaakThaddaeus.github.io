
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

grid[1][1] = new Pixel(1, 1, "#6495ed", true);

// Pixel
function Pixel(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.active = false;
}


// Drawing

    function drawPixel(x, y, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }
  
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

    function drawPixelsFromGrid(){
        for (var x = 0; x < canvas.width; x++) {
            for (var y = 0; y < canvas.height; y++) {
                if(grid[x][y] != null){
                    drawPixel(grid[x][y].x, grid[x][y].y, grid[x][y].color);
                }
            }
        }
    }


// falling

    function space(event){
        if (event.key === " ") {

            fall = true;
            drawPixelsFromGrid();
        }
    }

    function meineMethode(){
        if(fall){
            console.log("abc");
            moveDown2D(grid, 1, 1);
            drawPixelsFromGrid();
        }
    }

    function moveDown2D(array, rowIndex, colIndex) {
      
        if (rowIndex < canvas.width - 1) {  // Stelle sicher, dass es nicht die letzte Zeile ist
          var temp = array[rowIndex][colIndex];
          array[rowIndex][colIndex] = array[rowIndex + 1][colIndex];
          array[rowIndex + 1][colIndex] = temp;
          temp.x += 1;
        }
      }

// events
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);

    document.addEventListener('keydown', space);

    var intervalID = setInterval(meineMethode, 1000); // 1000 Millisekunden = 1 Sekunde


