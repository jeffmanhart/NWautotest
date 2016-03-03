module.exports = {
	tags: ['Dashboards', 'SMOKE', 'react'],
	"Create Custom Page" : function (browser) {
		data = browser.globals;
		//short, medium, long, xl
		DASHBOARD.SHORT_PAUSE = DASHBOARD.SHORT_PAUSE - data.undelay;
		DASHBOARD.MEDIUM_PAUSE = DASHBOARD.MEDIUM_PAUSE - data.undelay;
		DASHBOARD.LONG_PAUSE = DASHBOARD.LONG_PAUSE - data.undelay;
		DASHBOARD.XL_PAUSE = DASHBOARD.XL_PAUSE - data.undelay;

		var shotRoot = 'logs/s' + process.env.__NIGHTWATCH_ENV_KEY + 's';

		//Testing the creation of a Custom page for the react pages
		browser
    .maximizeWindow()
		.loginReact(data.myUsername, data.myPassword)
    .useXpath()
    .clickWait(DASHBOARD.HOMETAB, DASHBOARD.ADDCUSTOMPAGE,DASHBOARD.MEDIUM_PAUSE,"Home Tab", browser)
    .click(DASHBOARD.ADDCUSTOMPAGE)
    .pause(DASHBOARD.SHORT_PAUSE)
    .switchWindowFocus(2, 1, browser)
    .waitForElementVisible(DASHBOARD.POPUPHEADER, 5000, "[PopUp] Switched window to popup!")
    .assert.containsText(DASHBOARD.CANCELBUTTON,"Cancel", "[Dash] Switched window to pop-up create custom page")
    .setValue(DASHBOARD.NAMEENTRY, "Nightwatch Name")
    .click(DASHBOARD.SHARECHECKBOX)
    .pause(DASHBOARD.SHORT_PAUSE)
    .click(DASHBOARD.CANCELBUTTON)

    .switchWindowFocus(1, 0, browser)
		.clickWait(DASHBOARD.COGICON, DASHBOARD.COPYACTION, DASHBOARD.MEDIUM_PAUSE,"COGICON", browser);
		.clickWait(DASHBOARD.COPYACTION,DASHBOARD.HEADER,DASHBOARD.MEDIUM_PAUSE,"COPYACTION", browser);
    //
		// //click help icon and close help tab
    // browser
		// .click(DASHBOARD.HELPICON)
    // .pause(DASHBOARD.SHORT_PAUSE)
		// .switchTabFocus(2, 1, browser)
    // .assert.urlContains('help.rallydev.com/customize-your-dashboard')
    // .closeWindow()
		// .pause(DASHBOARD.SHORT_PAUSE)
		// .switchTabFocus(1, 0, browser)
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
  'HOMETAB' : '//*[@id="header"]/div[1]/ul/li[1]/a',
  'ADDCUSTOMPAGE' : '//*[@class ="x4-component button icon-add x4-component-default x4-border-box"]',

  //pop-up window locators
  'POPUPHEADER' : '/html/body/form/div[1]/h1',
  'NAMEENTRY' : '//*[@id="name"]',
  'CANCELBUTTON' : '//*[@id="cancel_btn"]',
  'SHARECHECKBOX' : '/html/body/form/div[2]/div/table/tbody/tr[2]/td/input'

};
