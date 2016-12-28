var fs = require('fs');

var fdata = "";

fs.readFile('input.txt', 'utf8', function (error, data) {
    var lines = data.split('\r\n');
    var SSLSupport = 0;
    var SupportsSSL = false;    

    for(l of lines)
    {
        SupportsSSL = false;
        var hypernetSequences = l.match(/\[\w+\]/g);

        var otherSequences = l.match(/\w+\[/g);
        otherSequences = otherSequences.concat(l.match(/\]\w+/g));

        var BABs = [];
        var ABAs = [];

        console.log(l);

        for(var i = 0; i < hypernetSequences.length; i++)
        {
            hypernetSequences[i] = hypernetSequences[i].replace(/\[/g, '').replace(/\]/g, '');

            var s = hypernetSequences[i];
            for(var j = 0; j <= s.length - 3; j++)
            {
                if(s[j] == s[j+2] && s[j] !== s[j+1])
                {
                    var val = s[j] + s[j+1] + s[j+2];
                    BABs.push(val);
                    console.log("BAB: " + val);
                }
            }
        }

        for(var i = 0; i < otherSequences.length; i++)
        {
            var v = otherSequences[i].replace(/\[/g, '').replace(/\]/g, '');
            otherSequences[i] = v;

            var s = otherSequences[i];
            for(var j = 0; j <= s.length - 3; j++)
            {
                if(s[j] == s[j+2] && s[j] !== s[j+1])
                {
                    var val = s[j] + s[j+1] + s[j+2];
                    ABAs.push(val);
                    console.log("ABA: " + val);
                }
            }
        }

        for(var a of ABAs)
        {
            for(var b of BABs)
            {
                if(match(a, b))
                {
                    SupportsSSL = true;
                    break;
                }
            }
        }

        console.log('');
        if(SupportsSSL)
        {
            SSLSupport++;
        }
    }

    console.log(SSLSupport);
});

function match(a, b)
{
    if(a[0] == b[1] && a[1] == b[0])
    {
        return true;
    }
}