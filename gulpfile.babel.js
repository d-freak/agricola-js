/**
 * gulpfile.babel.js
 * 
 * @author masaue
 */

import del from 'del';
import gulp from 'gulp';



(() => {
    const mainSourceDir = 'src/main/js';
    const testSourceDir = 'src/test/js';
    const testTargetDir = 'cache/test';
    
    gulp.task('clean', del.bind(null,
        [ testTargetDir ]
    ));
    
    gulp.task('ready-to-test', gulp.series('clean', () => {
        return gulp.src(
            [ `${mainSourceDir}/**/*.js`, `${testSourceDir}/**/*.js` ]
        ).pipe(
            gulp.dest(testTargetDir)
        );
    }));
})();
