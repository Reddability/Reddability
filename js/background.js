chrome.runtime.onInstalled.addListener(function(details) {
	if(details.reason === 'install') {
		chrome.notifications.create(
			'installed', {
				type: 'basic',
				title: chrome.i18n.getMessage('install_title'),
				message: chrome.i18n.getMessage('install_message'),
				iconUrl: 'img/branding/app_iconx256.png',
				buttons: [{title: chrome.i18n.getMessage('install_button')}]
				}, function(){});
	}
});

