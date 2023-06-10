const { getDependenciesToBundle } = require('@remix-run/dev');

/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: 'app',
  browserBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildDirectory: 'build',
  devServerPort: 8002,
  serverDependenciesToBundle: [
    ...getDependenciesToBundle(
      "axios",
    )
  ],
};
