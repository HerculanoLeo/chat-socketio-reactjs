import * as fs from 'fs/promises';
import * as gulp from 'gulp';
import { copyDir } from './src/utils/copy-folder.util';

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
    await fs.copyFile(
      `./environments/${envArg.replace(ENV_ARG, '')}.project.env`,
      './.env',
    );
    done();
  } else {
    throw new Error(
      'Define which env in the environments folder should be used. Example: --env=local',
    );
  }
});

gulp.task('set', gulp.series('copy'));

gulp.task('deploy', async (done) => {
  try {
    await fs.access('./deploy');
    await fs.rm('./deploy', { force: true, recursive: true });
  } catch (e) {
    console.error(e);
  } finally {
    await fs.mkdir('./deploy');
  }

  await fs.mkdir('./deploy/backend');

  await copyDir('./backend/node_modules', './deploy/node_modules');

  await copyDir('./backend/build', './deploy/backend');

  await fs.copyFile('./backend/.env', './deploy/.env');

  await fs.mkdir('./deploy/webapp');

  await copyDir('./frontend/build', './deploy/webapp');
});
