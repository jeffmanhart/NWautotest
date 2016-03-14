exports.command = function(username, password, callback) {
  var client = this;

  var shotRoot = 'logs/s' + process.env.__NIGHTWATCH_ENV_KEY + 's';
  client
    .urlHash("/slm/login.op")
    .pause(500)

    .saveScreenshot(shotRoot + 'loginpage.png')
    .waitForElementVisible('h1.login-header', 5000, '[Login] Find h1.login-header ( %d ms)')
    .assert.containsText('h1.login-header', 'Sign in', '[Login] "Sign in to Rally" text is visible.')
    .setValue("#j_username", username)
    .setValue("#j_password", password)
    .click("#login-button")
    .waitForElementVisible("div[class='header-logo']", 5000, '[Login] Find div - header logo element ( %d ms)')
    .waitForElementVisible("span[data-reactid='.2.0.0.0.$header-item-0:0.0.0']",5000, '[Login] Wait for Dashboard page')
    .assert.containsText("span[data-reactid='.2.0.0.0.$header-item-0:0.0.0']", 'My Dashboard', '[Login] Dashboard page appears')
  return this;
};
//*[@id="content"]/div/div[1]/div[1]/div/div/h1/span
