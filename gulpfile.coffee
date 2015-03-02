gulp = require "gulp"
coffee = require "gulp-coffee"

gulp.task "coffee", ->
  gulp.src ["src/tabs.coffee"]
    .pipe do coffee
    .pipe gulp.dest "./dist/"

gulp.task "watch", ->
  gulp.watch "src/tabs.coffee", ["coffee"]

gulp.task "default", ["coffee", "watch"]