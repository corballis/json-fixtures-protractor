var request = require('request');

module.exports = {
  initFixtures: function (repositoryStates) {
    var jar = request.jar();
    var req = request.defaults({
      jar: jar
    });

    function post(url, params) {
      var defer = protractor.promise.defer();
      req({
        method: 'POST',
        url: browser.baseUrl + url,
        json: params
      }, function (error, message) {
        if (error || message.statusCode >= 400) {
          defer.reject({
            error: error,
            message: message
          });
        } else {
          defer.fulfill(message);
        }
      });
      return defer.promise;
    }

    function setUp() {
      return post('/api/test', {
        repositoryStates: repositoryStates
      });
    }

    var flow = protractor.promise.controlFlow();
    flow.execute(setUp);
  }
};