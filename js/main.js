var sidebarHiddenText = 'Show sidebar';
var sidebarVisibleText = 'Hide sidebar';
var sidebarHiddenClass = 'sidebar-hidden';
var sidebarHide = '#sidebar-hide';
var sidebar = $('.side');

$(document).ready(function() {
	$('.side #search input[name="q"]').attr('autocomplete', 'off');
	console.log('Search autocomplete has been turned off.');

	console.log('Adding hiding sidebar option to header.');
	$('.flat-list.hover li').append('<a href="#" id="sidebar-hide" class="pref-lang">' + sidebarVisibleText + '</a>');

	console.log('Hiding/showing sidebar based on previous visits.');
	updateSidebar();

	console.log('Seting onclickhandler.');
	$(sidebarHide).on('click', setSidebar);
	console.log('Onclickhandler set.');
});

function setSidebar(hide) {
	console.log('setSidebar with ' + hide + ', type: ' + (typeof hide));
	var isHidden = $(sidebarHide).hasClass(sidebarHiddenClass);
	console.log(isHidden + ' || (' + hide + ' === false) \n    ' +
		isHidden + ' || ' + (hide === false) + ' \n        ' +
		(isHidden || (hide === false)));
	if(isHidden || hide === false) {
		console.log('Showing sidebar...');
		$(sidebarHide).text(sidebarVisibleText);
		$(sidebar).show();
		$(sidebarHide).removeClass(sidebarHiddenClass);
	} else {
		console.log('Hiding sidebar...');
		$(sidebarHide).text(sidebarHiddenText);
		$(sidebar).hide();
		$(sidebarHide).addClass(sidebarHiddenClass);
	}
	saveSidebarSettings(!isHidden);
}

function saveSidebarSettings(hide) {
	chrome.storage.local.set({'hide': hide}, function() {
		console.log('Side bar setting set to: ' + hide);
	});
}

function updateSidebar() {
	chrome.storage.local.get('hide', function(result) {
		console.log('runtime.lastError: ' + chrome.runtime.lastError);
		console.log('result: ' + result);
		console.log('hide: ' + result.hide);
		setSidebar(result.hide);
		console.log('Done updating sidebar, continuing.');
	});
}