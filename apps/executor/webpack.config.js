const { join } = require('path');
const { merge } = require('webpack-merge');
const common = require('../../webpack.apps.config');

module.exports = merge(common, {
  output: {
    path: join(__dirname, '../../dist/apps/executor'),
  },
});
