var CAPACITY_LIST = {
	'ENGINEERINGROOT': "#/23112780161ud/dashboard",
	'SHORT_PAUSE': 2500,
	'MEDIUM_PAUSE': 7500,
	'LONG_PAUSE': 18000,
	'XL_PAUSE': 120000,
	'HEADER' : 'span[data-reactid=".1.0.0.0.0"]',


  //Navigate to Capacity Planning List page through tabs
  'CPHASH' : "#/23112780161ud/capacityplanning",
  'CAPACITYPLANOPTION' : "//tr/td/ul/li[3]/a",

  'PORTFOLIOTAB' : "/html/body/div[2]/div/div[1]/div/div[1]/ul/li[5]/a",
  //Locator Verifications
  'cpHeader' : "//*[@id='content']/div/div[1]/div[1]/div/div/h1/span[1]",

  'createNewFlair' : "//*[@class='formatted-id-template']",
  'flairBody' : "//*[@class='rui-notification-body']/div[2]",


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
  'planTable' : '//*[@id="content"]/div/div[3]/div/table/tbody',


};

var PLAN_TABLE = {
  'PlanID' : "",
  'PlanName' : "",
  'Status' : "",
  'StartRelease' : "",
  'EndRelease' : "",
  'LastUpdated' : "",
  'Groups' : "",
};

var tablePlan = [[],[],[],[],[],[],[]];

function clickWait(locator, verification, waitTime, browser){
browser.click(locator).waitForElementVisible(verification, waitTime, '[Cpl] Clicked ' + verification + ' successful');
};

// function tablePlanArrayGetPlanID(browser){
//   for(i = 1; i < 5; i++) {
//     console.log("Jeffs Loop" + i);
//     if(browser.isVisible('//tbody/tr[' + i + ']/td[2]/a') == true) {
//       browser.getText('//tbody/tr[' + i + ']/td[2]/a', function(result){
//         tablePlan[[i],[0],[0],[0],[0],[0],[0]] = result.value;
//         console.log(result.value);
//         console.log(tablePlan[[i],[0],[0],[0],[0],[0],[0]]);
//         });
//       }else {
//         console.log("else" + i);
//       }
//   }
// };


// function getPlanTableText(browser){
//   for(i = 0; i < 7; i++) {
//
//     if(browser.isVisible('//tbody/tr[1]/td[' + i + ']/a') == true) {
//       browser.getText('//tbody/tr[1]/td[' + i + ']/a', function(result){
//         PLAN_TABLE.PlanID = result.value;
//         console.log(result.value);
//         console.log(PLAN_TABLE.PlanID);
//       });
//     }else if (browser.isVisible('//tbody/tr[1]/td[' + i + ']/span') == true) {
//       browser.getText('//tbody/tr[1]/td[' + i + ']/span', function(result){
//         PLAN_TABLE.Status = result.value;
//         console.log(result.value);
//         console.log(PLAN_TABLE.Status);
//       });
//     }else {
//       browser.getText('//tbody/tr[1]/td[' + i + ']', function(result){
//         PLAN_TABLE.PlanName = result.value;
//         console.log(result.value);
//         console.log(PLAN_TABLE.PlanName);
//       });
//     }
//   }
//   console.log(PLAN_TABLE.PlanID);
//   console.log(PLAN_TABLE.Status);
//   console.log(PLAN_TABLE.PlanName + 'Jeff');
// };



module.exports = {
	tags: ['CapacityPlanningList', 'SMOKE'],
	"OpenCapacityPlanningList" : function (browser) {
		//client = browser;
		data = browser.globals;
		//short, medium, long, xl
		CAPACITY_LIST.SHORT_PAUSE = CAPACITY_LIST.SHORT_PAUSE - data.undelay;
		CAPACITY_LIST.MEDIUM_PAUSE = CAPACITY_LIST.MEDIUM_PAUSE - data.undelay;
		CAPACITY_LIST.LONG_PAUSE = CAPACITY_LIST.LONG_PAUSE - data.undelay;
		CAPACITY_LIST.XL_PAUSE = CAPACITY_LIST.XL_PAUSE - data.undelay;

		var shotRoot = 'logs/s' + process.env.__NIGHTWATCH_ENV_KEY + 's';

		//console.log(this.globals);

		browser
    .maximizeWindow()
		.login(data.myUsername, data.myPassword)
    .useXpath();
    //Navigate to the Capacity Planning Page and check that it is on correct page
    clickWait(CAPACITY_LIST.PORTFOLIOTAB,CAPACITY_LIST.CAPACITYPLANOPTION, CAPACITY_LIST.MEDIUM_PAUSE, browser);
    browser
    .click(CAPACITY_LIST.CAPACITYPLANOPTION)
		.waitForElementVisible(CAPACITY_LIST.cpHeader, CAPACITY_LIST.MEDIUM_PAUSE, '[Cpl] Navigate to CapacityPlanningList successful')
    .assert.containsText(CAPACITY_LIST.cpHeader, 'Capacity Planning', '[Cpl] Title is exactly Capacity Planning')
    .getPlanTable(tablePlan);
    //getPlanTableText(browser);
    //tablePlanArrayGetPlanID(browser);


    //check add button is disabled with no text in the text box.  Then it becomes active when text is present then creates new plan with button and using the enter key press
    //Had to change to CSS to use attributeEquals assert
    browser
    .useCss()
    .assert.attributeEquals(CAPACITY_LIST.addNewButtonCss, 'disabled', 'true',"Add New button is not available with no text present - Success")
    .useXpath()
    .setValue(CAPACITY_LIST.newPlanName, 'Test Plan 1')
    .useCss()
    .assert.attributeEquals(CAPACITY_LIST.addNewButtonCss, 'class', 'smb-Button smb-Button--primary smb-Button--xs u-inlineItem',"Add New button is available with text present - Success")
    .useXpath()
    .click(CAPACITY_LIST.addNewButton)
    .setValue(CAPACITY_LIST.newPlanName, ['nightwatch' , browser.Keys.ENTER])
    //Can only check if the flair is given and not text in flair at this point in time...need more research on validating flair text
    .waitForElementVisible(CAPACITY_LIST.flairBody,CAPACITY_LIST.MEDIUM_PAUSE,'[Cpl] Create New Flair received');

    //Click Gear icon on first plan in list and select copy
    browser
    .useXpath()
    .click(CAPACITY_LIST.gearIcon)
    .click(CAPACITY_LIST.copyAction)
    .waitForElementVisible(CAPACITY_LIST.flairBody,CAPACITY_LIST.MEDIUM_PAUSE,'[Cpl] Flair received after Copy')
    //need flair verification and click add details action from flair into plan

    //Click Gear icon on first plan in list and select delete...get modal and cancel then confirm
    .click(CAPACITY_LIST.gearIcon)
    .click(CAPACITY_LIST.deleteAction)
    .waitForElementVisible(CAPACITY_LIST.deleteModalConfirm, CAPACITY_LIST.MEDIUM_PAUSE, '[Cpl] Received Delete Action modal successful')
    .click(CAPACITY_LIST.deleteModalCancel)
    .waitForElementNotVisible(CAPACITY_LIST.deleteModalConfirm, CAPACITY_LIST.MEDIUM_PAUSE, '[Cpl] Delete Action modal Cancel successful')

    .click(CAPACITY_LIST.gearIcon)
    .click(CAPACITY_LIST.deleteAction)
    .waitForElementVisible(CAPACITY_LIST.deleteModalConfirm, CAPACITY_LIST.MEDIUM_PAUSE, '[Cpl] Received Delete Action modal successful')
    .click(CAPACITY_LIST.deleteModalConfirm)
    .waitForElementNotVisible(CAPACITY_LIST.deleteModalConfirm, CAPACITY_LIST.MEDIUM_PAUSE, '[Cpl] Delete Action modal Confirm successful')
    .waitForElementVisible(CAPACITY_LIST.flairBody,CAPACITY_LIST.MEDIUM_PAUSE,'[Cpl] Flair received after delete action')



    //get plan table data and validate

    //click plan ID

    .pause(CAPACITY_LIST.MEDIUM_PAUSE)
	  .end();


    //click help icon and close help tab
    // .click(CAPACITY_LIST.helpIcon)
    // .pause(CAPACITY_LIST.MEDIUM_PAUSE)
    // .moveTo(CAPACITY_LIST.helpIcon)
    // .mouseButtonClick('right')
    // .assert.urlEquals("https://help.rallydev.com/capacity-planning", '[Cpl] Navigated to Help Tab successfully')
    // .closeWindow()

	}
};
