const gulp = require("gulp");

const {
    src,
    dest
} = require("gulp");

const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const removeComments = require("gulp-strip-css-comments");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");

const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const babel = require("gulp-babel");

const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');

var path = {
    build: {
        css: './website/html+css+js/',
        js: './website/html+css+js/js/',
        ready_img: "./website/img-optimization/ready"
    },
    src: {
        css: "./website/html+css+js/css/template.+(scss|sass)",
        js: "./website/html+css+js/js/src/*.js",
        raw_img: "./website/img-optimization/raw/*"
    },
    watch: {
        css: "./website/html+css+js/css/**/*.scss",
        js: "./website/html+css+js/js/src/*.js",
        raw_img: "./website/img-optimization/raw/*"
    }
}

function css() {
    return src(path.src.css)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
}

function js() {
    return src(path.src.js)
        .pipe(concat('template.min.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(dest(path.build.js))
}

function mozjpeg() {
    return src(path.src.raw_img)
        .pipe(imagemin([
            imageminJpegRecompress({
                progressive: true,
                max: 80,
                min: 70
            }),
            imageminPngquant({
                quality: [0.8, 1]
            })
        ]))
        .pipe(dest(path.build.ready_img))
}

function watchCss() {
    gulp.watch(path.watch.css, gulp.series('css'));
    gulp.watch(path.watch.js, gulp.series('js'));
    gulp.watch(path.watch.raw_img, gulp.series('mozjpeg'));
}

exports.css = css;
exports.js = js;
exports.mozjpeg = mozjpeg;
exports.watch_css = watchCss;