//variables/constantes
const production = false
const cssPlugins = [
    autoprefixer({browsers: ["> 1%",
        "ie >= 8",
        "edge >= 15",
        "ie_mob >= 10",
        "ff >= 45",
        "chrome >= 45",
        "opera >= 23",
        "ios >= 7",
        "android >= 4",
        "bb >= 10"]}),
    cssnano()
]
//html
import htmlmin from "gulp-htmlmin"

//css
import postcss from "gulp-postcss"
import cssnano from "cssnano"
import autoprefixer from "autoprefixer"

//js
import gulp from "gulp"
import babel from "gulp-babel"
import terser from "gulp-terser"

//pug
import pug from "gulp-pug"

//sass
import sass from "gulp-sass"

//optimizacion imagenes
import imgmin from "gulp-imagemin"

//common
import concat from "gulp-concat"
import imagemin from "gulp-imagemin"

//BROWSERSYNC
import {init as server, stream, reload} from "browser-sync"

//plumber
import plumber from 'gulp-plumber'



//tareas 

gulp.task("html-min",()=>{
    return gulp
    .src("./src/*.html")
    .pipe(htmlmin({
        collapseWhitespace:true,
        removeComments:true
    }))
    .pipe(gulp.dest('.docs/public'))
})

gulp.task("views",()=>{
    return gulp
    .src("./src/views/pages/*.pug")
    .pipe(plumber())
    .pipe(pug({
        pretty: production?false:true
    }))
    .pipe(gulp.dest('./docs/public'))
})

gulp.task("sass",()=>{
    return gulp
    .src("./src/scss/styles.scss")
    .pipe(plumber())
    .pipe(sass({
        outputStyle : "compressed"
    }))
    .pipe(gulp.dest('./docs/public/css'))
    .pipe(stream())
})

gulp.task("styles",()=>{
    return gulp
    .src("./src/css/*.css")
    .pipe(plumber())
    .pipe(concat("styles-min.css"))
    .pipe(postcss(cssPlugins))
    .pipe(gulp.dest('./docs/public/css'))
    .pipe(stream())
})

gulp.task("babel",()=>{
    return gulp
    .src("./src/js/*.js")
    .pipe(plumber())
    .pipe(concat("scripts-min.js"))
    .pipe(babel({
        presets:["@babel/env"]
    }))
    .pipe(terser())
    .pipe(gulp.dest('./docs/public/js'))
})

// gulp.task("imgmin",()=>{
//     return gulp.src('./src/images/*')
//     .pipe(plumber())
//     .pipe(imagemin([
//         imagemin.gifsicle({ interlaced: true }),
//         imagemin.mozjpeg({ quality: 30, progressive: true }),
//         imagemin.optipng({ optimizationLevel: 1 })

//     ]))
//     .pipe(gulp.dest('./public/images'));
// })

gulp.task("default",()=>{
    server({
        server:'./docs/public'
    })
    // gulp.watch("./src/*.html",gulp.series("html-min"))
    // gulp.watch("./src/css/*.css",gulp.series("styles"))
    gulp.watch("./src/views/pages/*.pug",gulp.series("views")).on('change',reload)
    gulp.watch("./src/scss/**/*.scss",gulp.series("sass"))
    gulp.watch("./src/js/*.js",gulp.series("babel")).on('change',reload)
})