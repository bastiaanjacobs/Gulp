'use strict';

//npm packages
var gulp                    = require('gulp');
var sass                    = require('gulp-sass');
var sourcemaps              = require('gulp-sourcemaps');
var cssmin                  = require('gulp-cssmin');
var rename                  = require('gulp-rename');
var clean                   = require('gulp-clean');
var runSequence             = require('run-sequence');
var fileinclude             = require('gulp-file-include');
var browserSync             = require('browser-sync').create();

//customer settings
var customer_dir            = '_customer';
var macaw_dir               = '_mcwresources';

//config paths
var src_jquery              = './node_modules/jquery/dist';
var src_momentjs            = './node_modules/moment/min';

//build
gulp.task('build', function(done) {
    //runSequence('clean', 'scss', 'components', 'images', 'scripts', 'fonts', 'displaytemplates', 'pagelayouts', function() {
    runSequence('clean', 'scss', 'components', 'images', 'scripts', 'fonts', 'pagelayouts', function() {
      done();
    });
  });

// process scss files
gulp.task('scss', function () {
    return gulp.src('src/scss/*scss')
    .pipe(sourcemaps.init())

    .pipe(sass())
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./_sourcemaps'))

    // push files to destination folder
    .pipe(gulp.dest('dist/' + macaw_dir + '/Style Library/css'));    
});

// process html files
gulp.task('components', function () {
    return gulp.src('src/components/*html')
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    // push files to destination folder
    .pipe(gulp.dest('dist/' + macaw_dir + '/Style Library/components'))
});

// process image files
gulp.task('images', function () {
    return gulp.src('src/img/**/*.{gif,jpg,png,svg}')

    // push files to destination folder
    .pipe(gulp.dest('dist/' + macaw_dir + '/Style Library/img'))
});

// process script files
gulp.task('scripts', function () {
    return gulp.src('src/js/**/*.js')

    // push files to destination folder
    .pipe(gulp.dest('dist/' + macaw_dir + '/Style Library/js'))

    // push vendor files to destination folder
    var jquery = gulp.src(src_jquery + '/jquery.min.js')
    .pipe(gulp.dest('dist/' + macaw_dir + '/Style Library/js/vendor'))
    var momentjs = gulp.src(src_momentjs + '/moment.min.js')
    .pipe(gulp.dest('dist/' + macaw_dir + '/Style Library/js/vendor'))
});

// process font files
gulp.task('fonts', function () {
    return gulp.src('src/font/**/*.{eot,svg,ttf,woff,woff2,otf}')

    // push files to destination folder
    .pipe(gulp.dest('dist/' + macaw_dir + '/Style Library/font'))
});

// process pagelayout files
gulp.task('pagelayouts', function() {
    var pagelayouts = gulp.src("src/Page Layouts/*.aspx")
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest('dist/_catalogs/masterpage/' + macaw_dir));

    return pagelayouts;
});

// create a task that ensures the tasks are complete before
// reloading browsers
gulp.task('watch', ['scss', 'components'], function(done) {
    browserSync.reload();
    done();
});

// use default task to launch Browsersync and watch scss and html files
gulp.task('default', ['scss','components'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "dist/" + macaw_dir + '/Style Library',
            index: '/components/mcw.index.html'
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete
    gulp.watch("src/scss/**/*.scss", ['watch']);
    gulp.watch("src/components/**/*.html", ['watch']);
});

// clean dist folder
gulp.task('clean', function() {
    return gulp.src('dist/*', { read: false })
    .pipe(clean());
});

// serve files to SharePoint
gulp.task('serve', function() {
    var syncsettings = settings.get();

    gulp.src('dist/**/**.*', { base: 'dist' })
    .pipe(spsync(syncsettings));
});

///// settings /////
var settings = (function() {
var config = require('./_config.json');
    return {
        get: function() {
            return {
                username: config.username,
                password: config.password,
                site: config.site,
                libraryPath: config.libraryPath,
                publish: config.publish,
            }
        }
    }
})();
module.exports = settings;