'use strict';
const fs = require('fs');
const rs = fs.createReadStream('read.txt');   // 64k

const ws = fs.createWriteStream('write2.txt',{
    highWaterMark:1
});  // 16k

/*rs.on('data',function (data) {
    let flag = ws.write(data);
    console.log('data flag '+flag);
});

ws.on('drain',function () {
    console.log('drain');
});*/
writeMillion(ws,'data','utf8');

function writeMillion(writer, data, encoding, cb) {
    let i = 10000;
    write();
    function write() {
        let bool = true;
        do{
            i -=1;
            if(i===0){
                writer.write(data,encoding,cb);
            }else{
                bool = writer.write(data, encoding);
                console.log('ok');
            }
        }while(i>0 && bool);
        if(i>0){
            writer.once('drain',write);
        }
    }
}
