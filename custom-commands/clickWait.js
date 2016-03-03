

exports.command = function clickWait(locator, verification, waitTime, message, browser){
browser.click(locator).waitForElementVisible(verification, waitTime, '[Dash] Clicked ' + message + ' successful');
};
