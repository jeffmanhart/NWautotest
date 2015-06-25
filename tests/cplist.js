var PROGRAM_STATUS = {
	'ENGINEERINGROOT': "#/23112780161ud/dashboard",
	'SHORT_PAUSE': 2500,
	'MEDIUM_PAUSE': 7500,
	'LONG_PAUSE': 18000,
	'XL_PAUSE': 120000,
	'HEADER' : 'span[data-reactid=".1.0.0.0.0"]',


  //Navigate to Capacity Planning List page through tabs
  'CPHASH' : "#/23112780161ud/capacityplanning",
  'CAPACITYPLANOPTION' : "//*[@id='x4-gen3114']",
  'PORTFOLIOTAB' : "/html/body/div[2]/div/div[1]/div/div[1]/ul/li[5]/a",
  //Locator Verifications
  'cpHeader' : "//*[@id='content']/div/div[1]/div[1]/div/div/h1/span[1]",

  'createNewFlair' : "//*[@id='x4-gen5171']",

  //Capacity Plan List Page Locators
  'newPlanName' : "//*[@id='content']/div/div[2]/div/div/input",
  'addNewButtonDisabled' : "//*[@id='content']/div/div[2]/button/span[@disabled='true']",
  'addNewButton' : "//*[@id='content']/div/div[2]/button/span",
  'addNewButtonCss' : '#content > div > div.smb-AddNew > button',
  'gearIcon' : "//*[@id='content']/div/div[3]/div/table/tbody/tr/td[1]/div/span",
  'copyAction' : "//*[@id='2-select-item-0']/span[1]",
  'deleteAction' : "//*[@id='2-select-item-1']/span[1]",
  'planID' : "//*[@id='content']/div/div[3]/div/table/tbody/tr/td[2]/a",
  'helpIcon' : "//*[@id='content']/div/div[1]/div[2]/div/div[2]/button/span/span",
  'deleteModalConfirm' : '//*[@id="confirm-modal"]/div/div/div[3]/div/button[1]',
  'deleteModalCancel' : '//*[@id="confirm-modal"]/div/div/div[3]/div/button[2]',


};

function clickWait(locator, verification, waitTime, browser){
browser.click(locator).waitForElementVisible(verification, waitTime, '[Cpl] Clicked ' + verification + ' successful');
}



module.exports = {
	tags: ['CapacityPlanningList', 'SMOKE'],
	"OpenCapacityPlanningList" : function (browser) {
		//client = browser;
		data = browser.globals;
		//short, medium, long, xl
		PROGRAM_STATUS.SHORT_PAUSE = PROGRAM_STATUS.SHORT_PAUSE - data.undelay;
		PROGRAM_STATUS.MEDIUM_PAUSE = PROGRAM_STATUS.MEDIUM_PAUSE - data.undelay;
		PROGRAM_STATUS.LONG_PAUSE = PROGRAM_STATUS.LONG_PAUSE - data.undelay;
		PROGRAM_STATUS.XL_PAUSE = PROGRAM_STATUS.XL_PAUSE - data.undelay;

		var shotRoot = 'logs/s' + process.env.__NIGHTWATCH_ENV_KEY + 's';

		//console.log(this.globals);

		browser
    .maximizeWindow()
		.login(data.myUsername, data.myPassword)
    .useXpath()
    //Navigate to the Capacity Planning Page and check that it is on correct page
    .urlHash(PROGRAM_STATUS.CPHASH)
    // clickWait(PROGRAM_STATUS.PORTFOLIOTAB,PROGRAM_STATUS.CAPACITYPLANOPTION, PROGRAM_STATUS.MEDIUM_PAUSE, browser);
    // browser.click(PROGRAM_STATUS.PORTFOLIOTAB)
    // .click(PROGRAM_STATUS.CAPACITYPLANOPTION)

		.waitForElementVisible(PROGRAM_STATUS.cpHeader, PROGRAM_STATUS.MEDIUM_PAUSE, '[Cpl] Navigate to CapacityPlanningList successful')
    .assert.containsText(PROGRAM_STATUS.cpHeader, 'Capacity Planning', '[Cpl] Title is exactly Capacity Planning')

    //check add button is disabled with no text in the text box.  Then it becomes active when text is present then creates new plan with button and using the enter key press
    //Had to change to CSS to use attributeEquals assert
    .useCss()
    .assert.attributeEquals(PROGRAM_STATUS.addNewButtonCss, 'disabled', 'true',"Add New button is not available with no text present - Success")
    .useXpath()
    .setValue(PROGRAM_STATUS.newPlanName, 'Test Plan 1')
    .useCss()
    .assert.attributeEquals(PROGRAM_STATUS.addNewButtonCss, 'class', 'smb-Button smb-Button--primary smb-Button--xs u-inlineItem',"Add New button is available with text present - Success")
    .useXpath()
    .click(PROGRAM_STATUS.addNewButton)
    .setValue(PROGRAM_STATUS.newPlanName, ['nightwatch' , browser.Keys.ENTER]);
    //.assert.containsText(PROGRAM_STATUS.newPlanName, 'has been added.', '[Cpl] Plan has been created')

    //Click Gear icon on first plan in list and select copy
    browser
    .click(PROGRAM_STATUS.gearIcon)
    .click(PROGRAM_STATUS.copyAction)
    //need flair verification
    //Click Gear icon on first plan in list and select delete
    .click(PROGRAM_STATUS.gearIcon)
    .click(PROGRAM_STATUS.deleteAction)
    .waitForElementVisible(PROGRAM_STATUS.deleteModalConfirm, PROGRAM_STATUS.MEDIUM_PAUSE, '[Cpl] Received Delete Action modal successful')
    .click(PROGRAM_STATUS.deleteModalCancel)
    .waitForElementNotVisible(PROGRAM_STATUS.deleteModalConfirm, PROGRAM_STATUS.MEDIUM_PAUSE, '[Cpl] Delete Action modal Cancel successful')

    .click(PROGRAM_STATUS.gearIcon)
    .click(PROGRAM_STATUS.deleteAction)
    .waitForElementVisible(PROGRAM_STATUS.deleteModalConfirm, PROGRAM_STATUS.MEDIUM_PAUSE, '[Cpl] Received Delete Action modal successful')
    .click(PROGRAM_STATUS.deleteModalConfirm)
    .waitForElementNotVisible(PROGRAM_STATUS.deleteModalConfirm, PROGRAM_STATUS.MEDIUM_PAUSE, '[Cpl] Delete Action modal Confirm successful')

    .pause(PROGRAM_STATUS.MEDIUM_PAUSE)
	  .end();
	}
};
