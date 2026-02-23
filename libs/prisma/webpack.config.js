const { join } = require('path');
const { merge } = require('webpack-merge');
const common = require('../../webpack.lib.config');

module.exports = merge(common, {
  output: {
    path: join(__dirname, '../../dist/libs/prisma'),
  },
});
