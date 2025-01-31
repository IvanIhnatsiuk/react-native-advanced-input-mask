const { exec } = require('child_process');

exec(
  'npm pack --json',
  { cwd: 'packages/react-native-advanced-input-mask' },
  (error, stdout, stderr) => {
    console.log(JSON.parse(stdout)[0].size);
  }
);
