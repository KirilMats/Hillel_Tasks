const {task, src, dest, series, watch} = require('gulp');
const babel = require('gulp-babel');

task('js:build', () => {
    return src('public/js/*.js').pipe(babel({
        presets: ['@babel/env']
    })).pipe(dest('public/dist/js'));
});

task('default', series('js:build'));

task('watch', () => {
    watch('public/js/*.js', series('js:build'));
})