(function() {
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = chrome.extension.getURL('img/favicon.ico');
    console.log('Favicon has been successfully set to: ' + link.href);
    document.getElementsByTagName('head')[0].appendChild(link);
}());

$(document).ready(function() {
	$('.side #search input[name="q"]').attr('autocomplete', 'off');
	console.log('Search autocomplete has been turned off.');
});