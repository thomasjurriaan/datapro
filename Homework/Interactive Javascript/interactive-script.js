// Split data on newline, list contains element in the form (date, temperature)
var rawdata = document.getElementById('rawdata').value;
// Instantiate two lists for temperature and dates
var maxtemp = [];
var date = [];
array = JSON.parse(rawdata);
console.log(array);
console.log(array[0]["Date"], array[0]["Temperature"]);
for(i = 0; i < array.length; i++)
{
    //console.log(rawdata[0]["Date"]);
    date.push(Math.round((Date.parse(array[i]["Date"]) - 946681200000) / 86400000));
    maxtemp.push(parseInt(array[i]["Temperature"]));
}
console.log(date);
// linear transformation formula: transform data value to screen coordinate
function createTransform(domain, range)
{
    var alpha = (range[1] - range[0]) / (domain[1] - domain[0]);
    var beta = range[0] - (alpha * domain[0]);
    return function(x)
        {
        return alpha * x + beta;
        };
}

// Get context of canvas and set some features
var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');
ctx.lineWidth=2;
ctx.strokeStyle="#FF00F0";
var padding = (canvas.height / 20)

// Declare bounds relative to bounds of canvas
// LowerYbound is called lower because of its value. 
// When you change it, it affects the space between the grapgh line and the upper bound of the grid.
var LowerXbound = ((1/10) * canvas.width)
var UpperXbound = ((23/24) * canvas.width)
var LowerYbound = ((1/9) * canvas.height)
var UpperYbound = ((3/4) * canvas.height)

// Set begin point of the dataline in the graph
ctx.moveTo(LowerXbound, UpperYbound - maxtemp[0])

datalist = [];
// Loop over the lists and draw lines between data points.
for(var i = 1; i < maxtemp.length; i++)
{    
    // Calculating coordinates
    var transformX = createTransform([0, date.length], [LowerXbound, UpperXbound]);
    var transformY = createTransform([Math.min.apply(null, maxtemp), Math.max.apply(null, maxtemp)], [LowerYbound, UpperYbound]);
    var X_coordinate = transformX(i);
    var Y_coordinate = UpperYbound + LowerYbound - transformY(maxtemp[i]);
    datapoint = [X_coordinate, Y_coordinate, date[i], maxtemp[i]];
    datalist += datapoint;
    // Draw lines
    ctx.lineTo(X_coordinate, Y_coordinate);
    ctx.stroke();
    ctx.moveTo(X_coordinate, Y_coordinate);
}
console.log(datalist);

// New settings for other lines
ctx.beginPath();
ctx.lineWidth = 3.5;
ctx.strokeStyle = "#000000";

// Draw vertical line from bottom to top
ctx.moveTo(LowerXbound, canvas.height - (UpperYbound + LowerYbound + padding));
ctx.lineTo(LowerXbound, canvas.height - (LowerYbound * 2));
ctx.stroke();

// Draw horizontal line from left to right
ctx.moveTo(LowerXbound, canvas.height - (LowerYbound * 2));
ctx.lineTo(UpperXbound, canvas.height - (LowerYbound * 2));
ctx.stroke();
ctx.closePath();
ctx.beginPath();

// New settings for coming lines and text
ctx.lineWidth = 0.1;
ctx.font="16px Arial";
ctx.textAlign = 'center';

// Text and indicator lines on vertical axis
for(i = 0; i < Math.max.apply(null, maxtemp) + 50; i += 50)
{
    ctx.fillRect((LowerXbound - (1 / 300) * canvas.width), (UpperYbound + LowerYbound - transformY(i)), 5, 2);
    ctx.moveTo(LowerXbound, (UpperYbound + LowerYbound - transformY(i)));
    ctx.lineTo(UpperXbound, (UpperYbound + LowerYbound - transformY(i))); 
    ctx.stroke();
    ctx.fillText((0.1 * i), LowerXbound - (1/35) * canvas.width, (UpperYbound + LowerYbound - transformY(i) + 5));     
}

// Text and indicator blocks on the hoizontal axis
// Two types of month for different sizes of the canvas
var months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
var months2 = [1,2,3,4,5,6,7,8,9,10,11,12];
var Month_length = [31,29,31,30,31,30,31,31,30,31,30,31];
var month = 0;
var days = 0;
for(var i = 0; i < date.length; i += Month_length[month])
{

    ctx.fillRect(transformX(i + Month_length[month]) , canvas.height - (LowerYbound * 2), 2, 5)
    if(canvas.width >= 1000)
    {
    ctx.fillText(months[month], transformX(i) + padding * 2.3, canvas.height - (LowerYbound * 2) + 1/25* canvas.height); 
    }
    else
    {
        ctx.fillText(months2[month], transformX(i), canvas.height - (LowerYbound * 2) + 1/25* canvas.height); 
    }
    month++;
}
ctx.closePath();

//Interactivity
var crosscanvas = document.getElementById('crosscanvas');
var crossctx = crosscanvas.getContext('2d');
function getMousePos(crosscanvas, evt) {
    var rect = crosscanvas.getBoundingClientRect();
    return {
        x: Math.round((evt.clientX-rect.left)/(rect.right-rect.left)*crosscanvas.width),
        y: Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*crosscanvas.height)
    };
}

// draw and reset crosshair
crosscanvas.addEventListener('mousemove', function(evt) {
    crosscanvas.width = crosscanvas.width;
    var mousePos = getMousePos(crosscanvas, evt);
    console.log(mousePos.x, mousePos.y);
    crossctx.moveTo(LowerXbound, mousePos.y);
    crossctx.lineTo(UpperXbound, mousePos.y);
    crossctx.moveTo(mousePos.x, LowerYbound - padding/2)
    crossctx.lineTo(mousePos.x, UpperYbound + padding/2);
    crossctx.stroke();
}, false);

// draw tooltip
var tempTag = "";
var dateTag = "";
crosscanvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(crosscanvas, evt);
    var point = 0;
    for(var i = 0; i < datalist.length; i++)
    {
        if(mousePos.x >= datalist[i][1] && mousePos.x <= datalist[i+1][1])
        {
            var dateTag = datalist[i][3].toString();
            var tempTag = datalist[i][4].toString();
            point = i;
        };
    };
    crossctx.fillText(dateTag, datalist[point][1] - 100, datalist[point][2]);

    //var dateLabel = document.getElementById("dateLabel");
    //var tempLabel = document.getElementById("tempLabel");
    //dateLabel.x = datalist[point][1] - 100;
    //dateLabel.y = datalist[point][2];
    //dateLabel.width = 100;
    //dateLabel.height = 20;
    //fillStyle = 
}, false);
