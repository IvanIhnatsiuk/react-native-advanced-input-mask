const { exec } = require('child_process');

exec('npm pack --json', { cwd: 'package' }, (error, stdout, stderr) => {
  console.log(JSON.parse(stdout)[0].size);
});
