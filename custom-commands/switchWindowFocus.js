exports.command = function switchTab(expectedWindows, focusToTabNum, browser){
	browser.windowHandles(function(result) {
					browser.assert.equal(result.value.length, expectedWindows, 'there is '+ expectedWindows + ' window[s].');
					var handle = result.value[focusToTabNum];
					browser.switchWindow(handle);
			})
};
