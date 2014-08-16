// Hide/show sidebar
var sidebar_show_text = chrome.i18n.getMessage('show_sidebar');
var sidebar_hide_text = chrome.i18n.getMessage('hide_sidebar');
var sidebarHiddenClass = 'sidebar-hidden';
var sidebarHide = '#sidebar-hide';
var sidebar = $('.side');

$(document).ready(function() {
	$('.side #search input[name="q"]').attr('autocomplete', 'off');

	$('#header-bottom-right .flat-list.hover li').append('<a href="#" id="sidebar-hide" class="pref-lang">' + sidebar_hide_text + '</a>');

	updateSidebar();

	$(sidebarHide).on('click', function(event) { event.preventDefault(); setSidebar(); });
});

function setSidebar(hide) {
	var isHidden = $(sidebarHide).hasClass(sidebarHiddenClass) || hide === false;
	if(isHidden) {
		$(sidebarHide).text(sidebar_hide_text);
		$(sidebar).show();
		$(sidebarHide).removeClass(sidebarHiddenClass);
	} else {
		$(sidebarHide).text(sidebar_show_text);
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
