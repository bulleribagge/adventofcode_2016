var fs = require('fs');

var fdata = "";

fs.readFile('input.txt', 'utf8', function (error, data) {
    var lines = data.split('\r\n');

    var counts = [];
    var i = 0;

    for(l of lines)
    {   
        for(var j = 0; j < l.length; j++)
        {
            if(!counts[j])
            {
                counts[j] = new Array();
            }
            if(!counts[j][l.charCodeAt(j)])
            {
                counts[j][l.charCodeAt(j)] = 1;
            }else
            {
                counts[j][l.charCodeAt(j)]++;
            }
        }
    }

    var solution = "";
    for(var i = 0; i < counts.length; i++)
    {
        console.log("char #" + i);
        var min = 10000000;
        var minChar = "";
        for(var j = 0; j < counts[i].length; j++)
        {
            if(counts[i][j])
            {
                if(counts[i][j] < min)
                {
                    min = counts[i][j];
                    minChar = String.fromCharCode(j);
                }
            }
        }

        console.log("worst char: " + minChar);
        solution += minChar;
    }

    console.log(solution);
});
