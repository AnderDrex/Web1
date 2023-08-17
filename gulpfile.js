//Identificar:src dest almacenar
const { src, dest, watch, parallel } =require("gulp");//Extrae la informacion de gulp, sus funciones 
//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber=require('gulp-plumber');
const autoprefixer=require('autoprefixer');
const cssnano=require('cssnano');
const postcss=require('gulp-postcss');
const sourcemaps=require('gulp-sourcemaps');
//Imagenes
const cache=require('gulp-cache')
const imagemin=require('gulp-imagemin');
const webp=require('gulp-webp');
const avif=require('gulp-avif');
//JS
const terser=require('gulp-terser-js');
//Funcion que compila y ubica la hoja de sass en hoja de css
function css(done){
    src('src/scss/**/*.scss')//Identificar el archico de SASS
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())//Compilarlo
    .pipe(postcss([autoprefixer(),cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css"))//Almacenarla en el disco duro
    done();//Callback que avisa a gulp cuando llegamos al final 
}
function versionwebp(done){
    const options={quality:50};
    src('src/img/**/*.{png,jpg}')
    .pipe(webp(options))
    .pipe(dest('build/img'))
    done();
}
function imagenes(done){
    const opciones={
        optimizationlevel:3
    }
    src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'))
    done();
}
function versionavif(done){
    const options={quality:50};
    src('src/img/**/*.{png,jpg}')
    .pipe(avif(options))
    .pipe(dest('build/img'))
    done();
}
function javascript(done){
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));
    done();
}
function dev(done){
    watch('src/scss/**/*.scss',css);
    watch('src/js/**/*.js',javascript);
    done();
}
exports.css =css;
exports.js=javascript;
exports.imagenes=imagenes;
exports.avif=avif;
exports.vversionavif=versionavif;
exports.dev =parallel(versionavif,versionwebp,dev,javascript,imagenes);
