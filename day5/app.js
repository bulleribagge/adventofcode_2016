var fs = require('fs');
var md5 = require('md5');

var fdata = "";

fs.readFile('input.txt', 'utf8', function (error, data) {
    fdata = data;
    var pw = "________";
    var j = 0;
    while(pw.lastIndexOf("_") != -1) 
    {
        var found = false;
        while(!found)
        {
            var hash = md5(fdata + j);
            if(hash.startsWith("00000"))
            {
                var index = parseInt(hash[5]);
                if(index !== NaN && index < 8 && pw[index] == "_")
                {
                    pw = pw.substr(0, index) + hash[6] + pw.substr(index + 1);
                    found = true;
                    
                    console.log("found a good hash " + hash + " for j: " + j + " and index: " + index);
                    console.log("pw is now " + pw);
                }
            }
            j++;
        }
    }

    console.log("final result: " + pw);
});
