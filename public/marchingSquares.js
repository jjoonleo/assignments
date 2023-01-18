let a = 90, b = 50, theta = Math.PI/15;
let divisor = 1;
function f(x,y){
    
    //return (x-250)**2/a**2+(y-250)**2/b**2;
    //return 4.9*x**2+y**2+-4*x*y;
    return (Math.cos(theta)**2/a**2+Math.sin(theta)**2/b**2)*x**2+2*Math.cos(theta)*Math.sin(theta)*(1/a**2-1/b**2)*x*y+(Math.sin(theta)**2/a**2+Math.cos(theta)**2/b**2)*y**2
}

function drawLine(ctx, map, x, y, threshold){
    let points = [];
    console.log(`${map[x][y]} ${map[x+1][y]}\n${map[x][y+1]} ${map[x+1][y+1]}`)
    if((map[x][y] > threshold) ^ (map[x+1][y] > threshold)){
        let xCor = x+(threshold-map[x][y])/(map[x+1][y]-map[x][y])
        points.push([xCor,y]);
    }
    if((map[x][y+1] > threshold) ^ (map[x+1][y+1] > threshold)){
        let xCor = x+(threshold-map[x][y+1])/(map[x+1][y+1]-map[x][y+1])
        points.push([xCor,y+1]);
    }
    if((map[x][y] > threshold) ^ (map[x][y+1] > threshold)){
        let yCor = y+(threshold-map[x][y])/(map[x][y+1]-map[x][y])
        points.push([x,yCor]);
    }
    if((map[x+1][y] > threshold) ^ (map[x+1][y+1] > threshold)){
        let yCor = y+(threshold-map[x+1][y])/(map[x+1][y+1]-map[x+1][y])
        points.push([x+1,yCor]);
    }
    if(points.length == 0) return;
    console.log(`x:${x} y:${y} length${points.length}`);
    console.log(points[0]);
    console.log(points[1]);
    ctx.beginPath();
    let tmp = 10;
    ctx.moveTo(points[0][0]*tmp,points[0][1]*tmp);
    ctx.lineTo(points[1][0]*tmp,points[1][1]*tmp);
    ctx.stroke();
}

function marchingSquare(){

    let map = new Array(50);
    for(let i = 0; i < map.length; i++){
        map[i] = new Array(50);
    }

    for(let i = 0; i < map.length; i++){
        for(let j = 0; j < map[0].length; j++){
            map[i][j] = f((i-25)*10,(j-25)*10);
        }
    }

    for(let i = 0; i < map.length-1; i++){
        for(let j = 0; j < map[0].length-1; j++){
            drawLine(ctx,map,i,j,1);
        }
    }

    console.log(map);
}

function draw() {
    
}
var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        
        ctx.beginPath();
        ctx.moveTo(0,0);
        // for(let x = 0; x <= 500; x+=10){
        //     ctx.moveTo(x,0);
        //     ctx.lineTo(x, 500);
        // }
        // for(let x = 0; x <= 500; x+=10){
        //     ctx.moveTo(0,x);
        //     ctx.lineTo(500, x);
        // }
        ctx.stroke();

    }

marchingSquare(ctx);
let rotateButton = document.querySelector("#rotate");
rotateButton.addEventListener('click',(e)=>{
    ctx.clearRect(0,0,canvas.clientWidth,canvas.height);
    theta += Math.PI/15;
    marchingSquare(ctx);
})
