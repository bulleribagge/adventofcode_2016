var fs = require('fs');

var fdata = "";

fs.readFile('input.txt', 'utf8', function (error, data) {
    var lines = data.split('\r\n');
    var TLSsupport = 0;    

    for(l of lines)
    {
        var goodAbbas = false;
        var badAbbas = false;
        var hypernetSequences = l.match(/\[\w+\]/g);

        var otherSequences = l.match(/\w+\[/g);
        otherSequences = otherSequences.concat(l.match(/\]\w+/g));

        for(var i = 0; i < hypernetSequences.length; i++)
        {
            hypernetSequences[i] = hypernetSequences[i].replace(/\[/g, '').replace(/\]/g, '');

            if(isAbba(hypernetSequences[i]))
            {
                badAbbas = true;
                break;
            }
        }

        for(var i = 0; i < otherSequences.length; i++)
        {
            var v = otherSequences[i].replace(/\[/g, '').replace(/\]/g, '');
            otherSequences[i] = v;

            if(isAbba(otherSequences[i]))
            {
                goodAbbas = true;
                break;
            }
        }

        if(goodAbbas && !badAbbas)
        {
            console.log('TLS Support');
            console.log(l);
            TLSsupport++;
        }else if(goodAbbas)
        {
            console.log('No TLS Support - good and bad abbas');
            console.log(l);
        }else{
            console.log('No TLS Support - no abbas');
            console.log(l);
        }

        console.log('');
    }

    console.log(TLSsupport);
});

function isAbba(s)
{
    for(var i = 0; i <= s.length - 4; i++)
    {
        if(s[i] == s[i+3] && s[i+1] == s[i+2] && s[i] !== s[i+1])
        {
            //console.log(s[i] + s[i+1] + s[i+2] + s[i+3] + " is abba");
            return true;
        }
    }
}