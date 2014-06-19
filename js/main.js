var sidebarHiddenText = 'Show sidebar';
var sidebarVisibleText = 'Hide sidebar';
var sidebarHiddenClass = 'sidebar-hidden';
var sidebarHide = '#sidebar-hide';
var sidebar = $('.side');

$(document).ready(function() {
	$('.side #search input[name="q"]').attr('autocomplete', 'off');

	$('.flat-list.hover li').append('<a href="#" id="sidebar-hide" class="pref-lang">' + sidebarVisibleText + '</a>');

	updateSidebar();

	$(sidebarHide).on('click', setSidebar);
});

function setSidebar(hide) {
	var isHidden = $(sidebarHide).hasClass(sidebarHiddenClass);
	if(isHidden || hide === false) {
		$(sidebarHide).text(sidebarVisibleText);
		$(sidebar).show();
		$(sidebarHide).removeClass(sidebarHiddenClass);
	} else {
		$(sidebarHide).text(sidebarHiddenText);
		$(sidebar).hide();
		$(sidebarHide).addClass(sidebarHiddenClass);
	}
	saveSidebarSettings(!isHidden);
}

function saveSidebarSettings(hide) {
	chrome.storage.local.set({'hide': hide}, function() {
		if(chrome.runtime.lastError !== undefined)
			console.log('Something went wrong when setting the hide variable in the local storage: ' + chrome.runtime.lastError);
	});
}

function updateSidebar() {
	chrome.storage.local.get('hide', function(result) {
		if(chrome.runtime.lastError !== undefined)
			console.log('Something went wrong when getting the hide variable in the local storage: ' + chrome.runtime.lastError);
		else
			setSidebar(result.hide);
	});
}