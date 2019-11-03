/**
 * gulpfile.babel.js
 * 
 * @author yuki
 */

import gulp from 'gulp';
import babel from 'gulp-babel';

import remove from 'del';



(() => {
    const mainSourceDir = 'src/main/js';
    const testSourceDir = 'src/test/js';
    const mainTargetDir = 'app/script';
    const testTargetDir = 'cache/test';
    
    gulp.task('clean-main', remove.bind(null,
        [ mainTargetDir ]
    ));
    
    gulp.task('clean-test', remove.bind(null,
        [ testTargetDir ]
    ));
    
    gulp.task('clean', gulp.parallel('clean-main', 'clean-test'));
    
    gulp.task('compile', gulp.series('clean-main', () => {
        return gulp.src(
            `${mainSourceDir}/**/*.js`
        ).pipe(
            babel()
        ).pipe(
            gulp.dest(mainTargetDir)
        );
    }));
    
    gulp.task('ready-to-test', gulp.series('clean-test', () => {
        return gulp.src(
            [ `${mainSourceDir}/**/*.js`, `${testSourceDir}/**/*.js` ]
        ).pipe(
            gulp.dest(testTargetDir)
        );
    }));
})();
