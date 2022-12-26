import * as fs from 'fs/promises';
import * as gulp from 'gulp';

const ENV_ARG = '--env=';

gulp.task('copy', async (done) => {
  const envArg = process.argv.find((arg) => arg.startsWith(ENV_ARG));
  if (envArg) {
    await fs.copyFile(
      `./environments/${envArg.replace(ENV_ARG, '')}.backend.env`,
      './backend/.env',
    );
    await fs.copyFile(
      `./environments/${envArg.replace(ENV_ARG, '')}.frontend.env`,
      './frontend/.env',
    );
    done();
  } else {
    throw new Error(
      'Define which env in the environments folder should be used. Example: --env=local',
    );
  }
});

gulp.task('set', gulp.series('copy'));
