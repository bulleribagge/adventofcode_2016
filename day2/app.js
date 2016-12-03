var fs = require('fs');

var fdata = "";

fs.readFile('input.txt', 'utf8', function (error, data) {
    fdata = data;
    directions = fdata.split('\r\n');

    //initial position
    var x = 0;
    var y = 2;
    var points = [];

    for (var d of directions) {
        if (d) {
            for (var i = 0; i < d.length; i++) {
                if (d[i] == "L") {
                    if(y == 1 || y == 3)
                    {
                        if(x > 1)
                        {
                            x--;
                        }
                    }else if(y == 2)
                    {
                        if (x > 0) 
                        {
                            x--;
                        }
                    }
                } else if (d[i] == "R") {
                    if(y == 1 || y == 3)
                    {
                        if(x < 3)
                        {
                            x++;
                        }
                    }else if(y == 2)
                    {
                        if (x < 4) {
                            x++;
                        }
                    }
                } else if (d[i] == "U") {
                    if(x == 1 || x == 3)
                    {
                        if(y > 1)
                        {
                            y--;
                        }
                    }else if(x == 2)
                    {
                        if(y > 0)
                        {
                            y--;
                        }
                    }
                } else {
                    if(x == 1 || x == 3)
                    {
                        if(y < 3)
                        {
                            y++;
                        }
                    }else if(x == 2)
                    {
                        if(y < 4)
                        {
                            y++;
                        }
                    }
                }
            }
            console.log("-----------");
            console.log("x: " + x + " y: " + y);
            points.push({ x: x, y: y });
        }
    }
});
