var fs = require('fs');

var fdata = "";

var NORTH = 1;
var EAST = 2;
var SOUTH = 3;
var WEST = 4;

fs.readFile('input.txt', 'utf8', function (error, data) {
	fdata = data;
	directions = fdata.split(',');

	//initial position
	var x = 0;
	var y = 0;
	var facing = NORTH;
	var visited = [];

	/*
	x -------------->
	y
	|
	|
	|
	|
	V
	*/

	for (var direction of directions) {
		var d = direction.trim();

		var turn = d.substring(0, 1);

		if (turn == "R") {
			facing = turnRight(facing);
		} else if (turn == "L") {
			facing = turnLeft(facing);
		}

		var distance = parseInt(d.substring(1, d.length + 1));
		for (var i = 1; i <= distance; i++) {
			if (facing == NORTH) {
				y += 1;
			} else if (facing == EAST) {
				x += 1;
			} else if (facing == SOUTH) {
				y -= 1;
			} else {
				x -= 1;
			}

			var val = x + "," + y;

			if (visited.find(function (element) { return element == val }) == undefined) {
				visited.push(val);
			} else {
				console.log(val);
				console.log(Math.abs(x) + Math.abs(y));
				break;
			}
		}
	}

	console.log("x: " + x + " y: " + y);

	var realDistance = Math.abs(x) + Math.abs(y);

	console.log("realDistance: " + realDistance);
});

function turnRight(x) {
	if (x == 4) {
		return 1;
	} else {
		return ++x;
	}
}

function turnLeft(x) {
	if (x == 1) {
		return 4;
	} else {
		return --x;
	}
}