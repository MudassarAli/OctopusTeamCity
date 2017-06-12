var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    order = require('gulp-order'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify');

//This task complie all scss files in css/scss/ directory and saves the output to css/css/ directory. 
gulp.task('sass', function () {
    return gulp.src('css/scss/*.scss')
      .pipe(sass())
      .pipe(autoprefixer('last 2 version'))
      .pipe(gulp.dest('css/css/'))
      .pipe(notify({ message: 'Saas task complete' }));
});

//This task takes all css files from css/css directory, concatenat it and save it to css/Bundle directory. 
//Then it take concatenated file, minimize it and save it to css/minimized directory. 
gulp.task('css', function () {
    return gulp.src('css/css/*.css')
        .pipe(concat('UDIR-Bundle.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(gulp.dest('css/Bundle/'))
        .pipe(notify({ message: 'Bundling css task complete' }));
});

//This task concatenates all JavaScript files in js/js/ directory and saves the ouput to js/js/ directory. 
//It also takes concateneted file, minifies it, renames it and saves it to the js/Minified directory.
gulp.task('scripts', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.js', 'js/config/*.js', 'node_modules/sp-pnp-js/dist/pnp.js', 'js/js/*.js'])
            .pipe(order(['jquery.js', '*.js', 'pnp.js', , '*.js']))
            .pipe(concat('UDIR-Bundle.js'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify({ compress: { hoist_funs: false, hoist_vars: false } }))
            .pipe(gulp.dest('js/Bundle/'))
            .pipe(notify({ message: 'Bundling scripts task completed' }));
});



// This is the task which runs by default. (Should be started from terminal)
//gulp.task('default', ['sass', 'css', 'scripts', 'watch']);
gulp.task('default', ['sass', 'css', 'scripts']);

