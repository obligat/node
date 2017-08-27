'use strict';

const fs = require('fs');
const rs = fs.createReadStream('read.txt');

let Decoder = require('string_decoder'); // 可解决乱码问题

function parseHeader(cb) {
    let headers = '';
    let decoder = new Decoder();  // Decoder is not a function
    rs.on('readable', onReadable);

    function onReadable() {
        let chunk;
        while(null!==(chunk = rs.read())){
            let str = decoder.write(chunk);
            if(str.match(/\r\n\r\n/)){
                let splits = str.split(/\r\n\r\n/);
                headers += splits.shift();

                rs.removeListener('readable', onReadable);

                let remain = splits.join('\r\n\r\n');
                let buffer = new Buffer(remain,'utf8');
                if(buffer.length){
                    rs.unshift(buffer);
                    cb(headers);
                }
            }else{
                headers +=str;
            }
        }
    }
}

parseHeader(function (header) {
    console.log(header);
    rs.on('data',function (data) {
        console.log(data.toString());
    })
});