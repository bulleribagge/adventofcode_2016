var fs = require('fs');

var fdata = "";

fs.readFile('input.txt', 'utf8', function (error, data) {
    fdata = data;

    rooms = fdata.split('\r\n');

    var sectorSum = 0;
    for(var room of rooms)
    {
        if(room[0] == '*')
        {
            continue;
        }
        var sectorId = parseInt(room.match(/\d+/g)[0]);
        var checksum = room.match(/\[\w+\]/g)[0].replace(/\[/g, '').replace(/\]/g, '');
        var encName = room.substring(0, room.lastIndexOf('-'));

        var valid = validateChecksum(encName.replace(/-/g, ''), checksum);

        if(valid)
        {
            sectorSum += sectorId;
            var decryptedName = decrypt(encName, sectorId);
            //manually search through output to get the correct room :)
            console.log(decryptedName + " " + sectorId);
        }
    }
});

function decrypt(encName, sectorId)
{
    var shift = sectorId % 26;
    var decrypted = "";

    for(var c of encName)
    {
        if(c == "-")
        {
            decrypted += " ";
            continue;
        }

        var code = c.charCodeAt(0);

        if((code + shift) <= 'z'.charCodeAt(0))
        {
            decrypted += String.fromCharCode(code + shift);
        }else{
            var shiftedCode = ('a'.charCodeAt(0) - 1) + ((code + shift) - 'z'.charCodeAt(0));
            decrypted += String.fromCharCode(shiftedCode);
        }
    }

    return decrypted;
}

function validateChecksum(encName, checksum)
{
    var counts = {};
    for(var c of encName)
    {
        if(counts[c])
        {
            counts[c]++;
        }else{
            counts[c] = 1;
        }
    }

    var lastCount = 10000;
    var lastCharCode = 96;
    for(var c of checksum)
    {
        var inCounts = false;
        for(var c1 in counts)
        {
            if(c1 == c)
            {
                inCounts = true;
                if(counts[c1] < lastCount)
                {
                    lastCount = counts[c1];
                    lastCharCode = c1.charCodeAt(0);
                }else if(counts[c1] == lastCount)
                {
                    if(c1.charCodeAt(0) < lastCharCode)
                    {
                        return false;
                    }
                    lastCharCode = c1.charCodeAt(0);
                }else{
                    return false;
                }
            }
        }
        if(!inCounts)
        {
            return false;
        }
    }

    return true;
}