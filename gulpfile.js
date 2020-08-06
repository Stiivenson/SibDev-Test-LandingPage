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


var path = {
    build: {
        css: './website/',
        js: './website/'
    },
    src: {
        css: "./website/style/scss/template.+(scss|sass)",
        js: "./website/js/*.js"
    },
    watch: {
        css: "./website/style/scss/**/*.scss",
        js: "./website/js/*.js"
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

function watchCss() {
    gulp.watch(path.watch.css, gulp.series('css'));
    gulp.watch(path.watch.js, gulp.series('js'));
}

exports.css = css;
exports.js = js;
exports.watch_css = watchCss;