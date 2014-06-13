(function() {
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = chrome.extension.getURL('img/favicon.ico');
    console.log("This is the link of the local Simple Reddit Favicon: " + link.href)
    document.getElementsByTagName('head')[0].appendChild(link);
}());