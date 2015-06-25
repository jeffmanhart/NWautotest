var PROGRAM_STATUS = {
	'ENGINEERINGROOT': "#/23112780161ud/programtrack",
	'SHORT_PAUSE': 2500,
	'MEDIUM_PAUSE': 7500,
	'LONG_PAUSE': 18000,
	'XL_PAUSE': 120000,
	'HEADER' : 'span[data-reactid=".1.0.0.0.0"]',



	'PAGEMAST' : "div[class*='program-track-page-header']",
	'LOADING': "div[class*='loading-indicator']",

	//Children of PAGEMAST
	'PRSTITLE' : "div[class*='ptph-t'] h1[class*=titlebar-text]",
	'BETATAG'  : "div[class*='ptph-t'] span[class*='beta']",
	'PROGRESS' : "div[class*='progress'] div[class*='progress-bar']",

	//Children of PAGEMAST
	'RELEASEPICKER' : "div[class*='ptph-rs'] div[class*='release-selector'] div[class*='select-scrollable'] div[role='combobox']",

	//Children of ReleasePicker
	'RELEASEDOWNARROW' : "div span[class*='icon-chevron-down']",
	'RELEASELIST' : "ul[class*='dropdown-menu']",

	//Child of RELEASELIST
	//'RELEASECLICKABLE': "li[class='dropdown-item']", //Something other than currently selected. Do not use *= here
	'RELEASECLICKABLE': "li[aria-label*='-'] span", //Only match if the aria-label property has a "-" in it (for separating date ranges in releases)
	'RELEASECLICKABLELAST': "li[aria-label*='-']:last-of-type", //Only match if the aria-label property has a "-" in it (for separating date ranges in releases)


	'TOGGLEBUTTONS' : "div[class*='togglebar-row'] div div[class*='toggle']",
	'CHART' : "div[class*='icon-graph']",
	'BOARD' : "div[class*='icon-board']",


	'PRSCONTAINER' : "div[class*='program-track-page-container']",

	'FRDCONTAINER' : "div[class*='feature-details-container']",
	'FRDTITLE': "div h3[class*='panel-title']",

	//'GRIDCONTAINER' : "div[class*='feature-grid']",




};

function childel(arr) {
	var eleSlector = "";
	for (var i in arr) {
		var thisElement = PROGRAM_STATUS[arr[i]];
		eleSlector = eleSlector + thisElement;

		//Add a space if we have more elements to find
		if (i < arr.length - 1) { eleSlector = eleSlector + " ";}
	}
	return eleSlector;
}


function releaseProgressBar(elProgressBar, browser, minimumRequired) {
	var required = minimumRequired || 1;
	browser.getAttribute(elProgressBar, 'aria-valuenow', function(result) {
		//console.log("Master Progress Bar value", result.value);
		this.assert.equal(result.value >= required, true, '[PrS] Master progress bar has an aria-value ('+ result.value +') >= 0');
	});
	return browser;
}


function clickMessage(p1) {
	console.log("Click!", p1.state);
}

function statusR0Clicked(p1) {	console.log("Selected the first release in the list"); }
function statusRnClicked(p1) { console.log("Selected the last release in the list");}



module.exports = {
	tags: ['ProgramStatus', 'SMOKE'],
	"OpenProgramStatus" : function (browser) {
		//client = browser;
		data = browser.globals;
		//short, medium, long, xl
		PROGRAM_STATUS.SHORT_PAUSE = PROGRAM_STATUS.SHORT_PAUSE - data.undelay;
		PROGRAM_STATUS.MEDIUM_PAUSE = PROGRAM_STATUS.MEDIUM_PAUSE - data.undelay;
		PROGRAM_STATUS.LONG_PAUSE = PROGRAM_STATUS.LONG_PAUSE - data.undelay;
		PROGRAM_STATUS.XL_PAUSE = PROGRAM_STATUS.XL_PAUSE - data.undelay;

		var shotRoot = 'logs/s' + process.env.__NIGHTWATCH_ENV_KEY + 's';



		var elProgramStatusTitle = childel(['PAGEMAST', 'PRSTITLE']);
		var elBetaTag = childel(['PAGEMAST', 'BETATAG']);
		var elReleasePicker = childel(['PAGEMAST', 'RELEASEPICKER']);
		var elRelDownArrow = childel(['PAGEMAST', 'RELEASEPICKER', 'RELEASEDOWNARROW']);
		var elAvailableReleases = childel(['PAGEMAST', 'RELEASEPICKER', 'RELEASELIST', 'RELEASECLICKABLE']);
		var elProgressBar = childel(['PAGEMAST', 'PROGRESS']);

		var elFirstRelease = childel(['PAGEMAST', 'RELEASEPICKER', 'RELEASELIST', 'RELEASECLICKABLE']);
		var elLastRelease = childel(['PAGEMAST', 'RELEASEPICKER', 'RELEASELIST', 'RELEASECLICKABLELAST']);

		var tglChart = childel(['TOGGLEBUTTONS', 'CHART']);
		var tglBoard = childel(['TOGGLEBUTTONS', 'BOARD']);

		var frdTitle = childel(['PRSCONTAINER', 'FRDCONTAINER', 'FRDTITLE']);


		//console.log(this.globals);


		browser

		.login(data.myUsername, data.myPassword)


		.urlHash(PROGRAM_STATUS.ENGINEERINGROOT)

		//.waitForElementVisible(PROGRAM_STATUS.PAGEMAST, PROGRAM_STATUS.MEDIUM_PAUSE)
		.waitForElementVisible(elReleasePicker, PROGRAM_STATUS.MEDIUM_PAUSE, '[PrS] Find Release Picker ( %d ms)')
		.saveScreenshot(shotRoot + 'prsboot.png')
		.pause(1000)

		//Elements Visible Assertions
		.assert.visible(PROGRAM_STATUS.PAGEMAST, '[PrS] Program Status Header is visible. ')
		.assert.visible(elProgramStatusTitle, '[PrS] Program Status Title is visible')
		.assert.visible(elReleasePicker, '[PrS] Release Picker is visible')
		.assert.visible(elRelDownArrow, '[PrS] Release Picker has a down arrow visible')


		//Element contains text assertions
		.assert.containsText(elProgramStatusTitle, 'Program Status', '[PrS] Title is exactly Program Status')
		.assert.containsText(elBetaTag, 'BETA', '[PrS] Beta Tag is present')

		//Select the first actual release from the list
		.click(elRelDownArrow)
		.click(elFirstRelease, statusR0Clicked)
		//.waitForElementNotVisible(PROGRAM_STATUS.LOADING, PROGRAM_STATUS.MEDIUM_PAUSE)
		.pause(PROGRAM_STATUS.MEDIUM_PAUSE)



		//.click(elRelDownArrow)
		//.click(elLastRelease, statusRnClicked)
		//.pause(PROGRAM_STATUS.XL_PAUSE)
		.saveScreenshot(shotRoot + 'lastrelease.png')
		//.waitForElementNotVisible(PROGRAM_STATUS.LOADING, PROGRAM_STATUS.XL_PAUSE)


		.click(tglBoard, clickMessage)
		.pause(PROGRAM_STATUS.SHORT_PAUSE) //Micro pause while page redraws
		.saveScreenshot(shotRoot + 'prsboard.png')
		//.click(tglChart, clickMessage)
		.assert.containsText(frdTitle, "ITERATIONS", "[PrS] Board Title is ITERATIONS")



		.click(tglChart, clickMessage)
		.pause(PROGRAM_STATUS.MEDIUM_PAUSE)
		.saveScreenshot(shotRoot + 'prschart.png')
		//.waitForElementNotVisible(PROGRAM_STATUS.LOADING, PROGRAM_STATUS.XL_PAUSE)

		//.waitForElementVisible("svg", PROGRAM_STATUS.LONG_PAUSE, "[PrS] SVG (Chart) Element is visible.")




		;

		//console.log(frdTitle);
		//div[class*='program-track-page-header'] div[class*='ptph-rs'] div[class*='release-selector'] div[class*='select-scrollable'] ul[class*='dropdown-menu'] li[class='dropdown-item']:last-of-type





		//Check the progress bar
		//browser = releaseProgressBar(elProgressBar, browser);




		browser.pause(PROGRAM_STATUS.SHORT_PAUSE)
	  .end();
	}
};
