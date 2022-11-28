const {task, src, dest, series, watch} = require('gulp');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));

task('js:build', () => {
    return src('src/js/*.js').pipe(babel({
        presets: ['@babel/env']
    })).pipe(dest('dist/js'));
});

task('minify-css', () => {
    return src('dist/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest('dist/css'));
});

task('scss:build', () => {
    return src('src/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist/css'));
})

task('default', series('js:build', 'scss:build', 'minify-css'));

task('watch', () => {
    watch('src/js/*.js', series('js:build'));
    watch('src/css/*.scss', series('scss:build'));
})