var http = require('http');

http.createServer(function (req, res) {
    console.log(req.headers.cookie.split(";").length);   // 5

    //Webstorm-fb3585b3=ce083a6d-7ca8-4a8b-86d7-fc26c9fd11a9; _ga=GA1.1.1421282465.1475401452; Webstorm-ef7ef6d2=8fcc698d-28e8-412f-8dbc-addc9e09d2fa; path=/

    var time = new Date(new Date().getTime() + 60 * 100).toGMTString();  //1min
  /*  res.writeHead(200, {
        'Set-Cookie': 'name= abc;path=/;Expires = ' + time
    });*//*
    res.setHeader('Set-Cookie', ['name= abc;path=/;Expires = ' + time]);
    res.setHeader('Set-Cookie', ['path=/;']);*/
    res.setHeader('Set-Cookie', ['name=abc;path =/; ','age=3;path=/ds','name= abc3;path =/; ','age=3;path=/ds']);
    res.end('hello');
}).listen(8080);