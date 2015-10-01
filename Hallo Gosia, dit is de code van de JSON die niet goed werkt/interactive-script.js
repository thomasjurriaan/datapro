    // Split data on newline, list contains element in the form (date, temperature)
    var rawdata = document.getElementById('rawdata').value;
    // Instantiate two lists for temperature and dates
    var maxtemp = [];
    var date = [];
    console.log(rawdata.length);
    for(i = 0; i < rawdata.length; i++)
    {
        console.log(rawdata[0]["Date"]);
        date.push(Date.parse(rawdata[0]["Date"]));
        maxtemp.push(parseInt(rawdata[0]["Temperature"]));
    }
    //console.log(date);
    //console.log(maxtemp);
    // linear transformation formula: transform data value to screen coordinate
    function createTransform(domain, range)
    {
        var alpha = (range[1] - range[0]) / (domain[1] - domain[0]);
        var beta = range[1] - (alpha * domain[1]);
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
    var UpperYbound = ((9/12) * canvas.height)

    // Set begin point of the dataline in the graph
    ctx.moveTo(LowerXbound, UpperYbound - maxtemp[0])
    // Loop over the lists and draw lines between data points.
    for(var i = 1; i < maxtemp.length; i++)
    {    
        // Calculating coordinates
        var transformX = createTransform([0, date.length], [LowerXbound, UpperXbound]);
        var transformY = createTransform([Math.min.apply(null, maxtemp), Math.max.apply(null, maxtemp)], [LowerYbound, UpperYbound]);
        var X_coordinate = transformX(i);
        var Y_coordinate = UpperYbound + LowerYbound - transformY(maxtemp[i]);
        // Draw lines
        ctx.lineTo(X_coordinate, Y_coordinate);
        ctx.stroke();
        ctx.moveTo(X_coordinate, Y_coordinate);
    }

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
    ctx.font="18px Arial";

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
    var Month_length = 30.5
    for(i = 0; i < date.length; i += Month_length)
    {
        ctx.fillRect(transformX(i + Month_length) , canvas.height - (LowerYbound * 2), 2, 5)
        if(canvas.width >= 1000)
        {
        ctx.fillText(months[i/Month_length], transformX(i) + (1/40) * (UpperXbound - LowerXbound), canvas.height - (LowerYbound * 2) + 1/25* canvas.height); 
        }
        else
        {
            ctx.fillText(months2[i/Month_length], transformX(i) + (1/50) * (UpperXbound - LowerXbound), canvas.height - (LowerYbound * 2) + 1/25* canvas.height); 
        }
    }
    ctx.closePath();