
exports.command = function(username, password, callback) {
  var client = this;
//  console.log(client);
  var shotRoot = 'logs/s' + process.env.__NIGHTWATCH_ENV_KEY + 's';
  client
    .urlHash("/slm/login.op")
    .pause(500)

    .saveScreenshot(shotRoot + 'loginpage.png')
    .waitForElementVisible('h1.login-header', 5000, '[Login] Find h1.login-header ( %d ms)')
    .assert.containsText('h1.login-header', 'Sign in to Rally', '[Login] "Sign in to Rally" text is visible.')
    .setValue("#j_username", username)
    .setValue("#j_password", password)
    .click("#login-button")
    .waitForElementVisible("span[class='title']", 5000, '[Login] Find span.title element ( %d ms)')
    .assert.containsText('span.title', 'My Dashboard', '[Login] Dashboard page appears')
  return this;
};
