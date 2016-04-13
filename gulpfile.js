var gulp = require('gulp')
var path = require('path')
var jison = require('gulp-jison')
var through = require('through2')
var main = path.basename(require('./package.json').main, '.js')

gulp.task('build', function () {
  return gulp.src(main + '.jison')
    .pipe(jison({moduleType: 'commonjs'}))
    .pipe(
      through.obj(function (file) {
        file.contents = new Buffer(String(file.contents).split(
          'if (typeof require !== \'undefined\' && typeof exports !== ' +
          '\'undefined\')')[0] + 'module.exports=parser.parse.bind(parser);'
        );
        this.push(file);
      })
    ).pipe(gulp.dest('dist'))
})