var fs = require('fs');

var fdata = "";

fs.readFile('input.txt', 'utf8', function (error, data) {
    fdata = data;
    potentialTriangles = fdata.split('\r\n');
    possibleTriangles = [];
    //for(var pt of potentialTriangles)
    for (var j = 0; j < potentialTriangles.length; j = j + 3) {
        var sideRows = [
            potentialTriangles[j].match(/\b\d+\b/g),
            potentialTriangles[j + 1].match(/\b\d+\b/g),
            potentialTriangles[j + 2].match(/\b\d+\b/g)
        ];
        
        for (var k = 0; k < 3; k++) {

            sides = [
                sideRows[0][k],
                sideRows[1][k],
                sideRows[2][k]
            ];

            for (var i = 0; i <= 2; i++) {
                sides[i] = parseInt(sides[i]);
            }

            if (sides[0] < (sides[1] + sides[2])) {
                if (sides[1] < (sides[0] + sides[2])) {
                    if (sides[2] < (sides[0] + sides[1])) {
                        possibleTriangles.push(sides);
                    }
                }
            }
        }
    }

    console.log(possibleTriangles.length);
});
