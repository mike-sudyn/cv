import gulp from 'gulp';
import gutil from 'gulp-util';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';

const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();
const gulpSequence = require('gulp-sequence').use(gulp);
const browserSync = require('browser-sync');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const del = require('del');
const reload = browserSync.reload;

/**
 * Styles
 */
gulp.task('styles', () => {
    return gulp.src('app/styles/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe($.cssnano({safe: true, autoprefixer: false}))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('dist/styles'));
});

/**
 * Prod Styles
 */
gulp.task('styles:prod', () => {
    return gulp.src('app/styles/*.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe($.cssnano({safe: true, autoprefixer: false}))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('dist/styles'));
});

/**
 * Scripts
 */
gulp.task('scripts', () => {
    return browserify({
            entries: './app/scripts/scripts.jsx',
            extensions: ['.jsx'],
            debug: true
        })
        .transform('babelify', {
            presets: ['es2015', 'react'],
            parserOpts: {
                plugins: ["jsx"]
            }
        })
        .bundle()
        .on('error', function(err){
            gutil.log(gutil.colors.red.bold('[browserify error]'));
            gutil.log(err.message);
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist/scripts'));
});

/**
 * Prod Scripts
 */
gulp.task('scripts:prod', () => {
    return browserify({
            entries: './app/scripts/scripts.jsx',
            extensions: ['.jsx'],
            debug: true
        })
        .transform('babelify', {
            presets: ['es2015', 'react'],
            parserOpts: {
                plugins: ["jsx"]
            }
        })
        .bundle()
        .on('error', function(err){
            gutil.log(gutil.colors.red.bold('[browserify error]'));
            gutil.log(err.message);
            this.emit('end');
        })
        //.pipe($.uglify())
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist/scripts'));
});

/**
 * JS lint
 */
gulp.task('lint', () => {
    return lint('app/scripts/**/*.js', {
        fix: true
    })
        .pipe(gulp.dest('app/scripts'));
});

/**
 * JS lint
 */
function lint(files, options) {
    return gulp.src(files)
        .pipe($.eslint(options))
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

/**
 * Run jshint on js files.
 */
gulp.task('jshint', function() {
    return gulp.src(['app/scripts/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

/**
 * Html
 */
gulp.task('html', () => {
    return gulp.src('app/html/*.html')
        .pipe(gulp.dest('dist'));
});

/**
 * Copy and minimize images
 */
gulp.task('images', () => {
    return gulp.src('app/images/**/*')
        // .pipe($.cache($.imagemin({
        //     progressive: true,
        //     interlaced: true,
        //     svgoPlugins: [{cleanupIDs: false}]
        // })))
        .pipe(gulp.dest('dist/images'));
});

/**
 * Delete dist folder
 */
gulp.task('clean', () => {
    return del(['dist']);
});

/**
 * Serve: build and enable watchers
 */
gulp.task('serve', ['build'], () => {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['dist']
        }
    });

    gulp.watch(['app/html/*'], ['html', reload]);
    gulp.watch('app/styles/**/*', ['styles', reload]);
    gulp.watch('app/scripts/**/*', ['scripts', reload]);
    gulp.watch('app/images/**/*', ['images', reload]);
});

gulp.task('size', () => {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('build', gulpSequence( 'clean', 'html', 'styles', 'scripts', 'images', 'size' ));

gulp.task('prod', gulpSequence( 'clean', 'html', 'styles:prod', 'scripts:prod', 'images', 'size' ));

gulp.task('default', ['build']);
