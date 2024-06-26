/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

const { run } = require('../util');
const fg = require('fast-glob');

const coreClientPackages = ['packages/core/client', 'packages/core/sdk'];
const isCore = (dir) => dir.startsWith('packages/core');

const getPackagesDir = (isClient) => {
  if (process.argv.length > 3 && !process.argv[3].startsWith('-')) {
    return [process.argv[3]];
  }

  const allPackageJson = fg.sync(['packages/*/*/package.json', 'packages/*/*/*/package.json'], {
    cwd: process.cwd(),
    onlyFiles: true,
  });
  const res = allPackageJson.map((pkg) => pkg.replace('/package.json', ''));
  return isClient
    ? res.filter((dir) => (isCore(dir) ? coreClientPackages.includes(dir) : true))
    : res.filter((dir) => (isCore(dir) ? !coreClientPackages.includes(dir) : true));
};

module.exports = (cli) => {
  cli.command('test-coverage:server').action(async (options) => {
    const packageRoots = getPackagesDir(false);
    for (const dir of packageRoots) {
      try {
        await run(cli.opts().packageManager, ['test:server', dir, '--coverage']);
      } catch (e) {
        continue;
      }
    }
  });

  cli.command('test-coverage:client').action(async (options) => {
    const packageRoots = getPackagesDir(true);
    for (const dir of packageRoots) {
      try {
        await run(cli.opts().packageManager, ['test:client', dir, '--coverage']);
      } catch (e) {
        continue;
      }
    }
  });
};
