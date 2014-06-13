$(document).ready(function() {
    var favicon = $('link[type="image/x-icon"');
    $(favicon).attr('rel', 'shortcut icon');
    $(favicon).attr('href', chrome.extension.getURL('img/favicon.ico'));
    console.log('Favicon has been set.');

	$('.side #search input[name="q"]').attr('autocomplete', 'off');
	console.log('Search autocomplete has been turned off.');
});