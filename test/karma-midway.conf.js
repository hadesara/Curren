var sharedConfig = require('./karma-shared.conf');

module.exports = function(config) {
  var conf = sharedConfig();

  conf.files = conf.files.concat([
    //extra testing code
    'node_modules/ng-midway-tester/src/ngMidwayTester.js',

    //mocha stuff
    'test/mocha.conf.js',

    //test files

  ]);

  conf.proxies = {
    '/': 'http://localhost:9999/'
  };

  config.set(conf);
 };
