
module.exports = {
	tags: ['Dashboards', 'SMOKE', 'react'],
	"DashboardPage" : function (browser) {
		//client = browser;
		data = browser.globals;
		//short, medium, long, xl
		DASHBOARD.SHORT_PAUSE = DASHBOARD.SHORT_PAUSE - data.undelay;
		DASHBOARD.MEDIUM_PAUSE = DASHBOARD.MEDIUM_PAUSE - data.undelay;
		DASHBOARD.LONG_PAUSE = DASHBOARD.LONG_PAUSE - data.undelay;
		DASHBOARD.XL_PAUSE = DASHBOARD.XL_PAUSE - data.undelay;

		var shotRoot = 'logs/s' + process.env.__NIGHTWATCH_ENV_KEY + 's';

		//test to login to new react based dashboard page and click all items available as page does not have full functionality yet
		browser
    .maximizeWindow()
		.loginReact(data.myUsername, data.myPassword)
    .useXpath()
		.clickWait(DASHBOARD.COGICON, DASHBOARD.COPYACTION, DASHBOARD.MEDIUM_PAUSE,"COGICON", browser);
		//.clickWait(DASHBOARD.COPYACTION,DASHBOARD.HEADER,DASHBOARD.MEDIUM_PAUSE,"COPYACTION", browser);

		//click help icon and close help tab
    browser
		.click(DASHBOARD.HELPICON)
    .pause(DASHBOARD.SHORT_PAUSE)
		.switchWindowFocus(2, 1, browser)
    .assert.urlContains('help.rallydev.com/customize-your-dashboard')
    .closeWindow()
		.pause(DASHBOARD.SHORT_PAUSE)
		.switchWindowFocus(1, 0, browser)
		.end();

	}
};


var DASHBOARD = {
	'ENGINEERINGROOT': "#/23112780161ud/dashboard",
	'SHORT_PAUSE': 2500,
	'MEDIUM_PAUSE': 7500,
	'LONG_PAUSE': 18000,
	'XL_PAUSE': 120000,
	'HEADER' : '//*[@data-reactid=".e.0.0.0.$header-item-0:0.0.0"]',

	//Dashboard locators
	'TEMPIMAGE' : '//*[@id="content"]/div/img',
	'COGICON' : '//*[@id="content"]/div/div/div[2]/div/div[1]/div/button/span/span',
	'EDITACTION' : '//*[@data-reactid=".1.0.1.0.$header-item-0:0.0.1.$1-select-item-0.1"]',
	'COPYACTION' : '//*[@data-reactid=".1.0.1.0.$header-item-0:0.0.1.$1-select-item-1.1"]',
	'HELPICON' : '//*[@id="content"]/div/div/div[2]/div/div[2]/button/span/span',

};
