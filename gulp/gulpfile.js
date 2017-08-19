const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
gulp.task('one', () => console.log("hello"));

gulp.task('default',()=>{
    // gulp.src('src/src.js').pipe(gulp.dest('dist'));
    gulp.watch('src/**/*.js',(event)=>{
        console.log(event);
        console.log(event.path, event.type);
        switch(event.type){
            case 'added':
               fs.readFile(event.path,function (err,data) {
                   fs.writeFile(path.join('dist', event.path.slice(path.resolve('src').length)),data);
               });
                break;
            case 'changed':
                break;
            case 'deleted':
                break;
            default:
                break;
        }
    })
});



