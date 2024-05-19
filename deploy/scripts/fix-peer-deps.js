// read all package.json files and fix peer dependencies
const path = require('path');
const glob = require('glob');
const fs = require('fs');

const root = path.resolve(__dirname, '../../');

// use glob to get all package.json files
const packages = glob.sync('packages/**/package.json', { cwd: root, ignore: ['**/node_modules/**'] });

packages.forEach((relativePath) => {
  const packageJsonPath = path.resolve(root, relativePath);
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  if (!packageJson.peerDependencies) {
    return;
  }

  const peerDependencies = packageJson.peerDependencies;

  // change the value of all keys starting with `@nocobase` to "workspace:*"
  Object.keys(peerDependencies).forEach((key) => {
    if (key.startsWith('@nocobase')) {
      peerDependencies[key] = 'workspace:*';
    }
  });
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
});
