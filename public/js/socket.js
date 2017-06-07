var port = 1346;
var socket = io.connect('http://chattabs.azurewebsites.net:' + port);


socket.on('tabs', function(tabs){
	for(let i = 0; i < tabs.length; i++){
		app.tabs[i] = new ChatTab;
		app.tabs[i].messages = tabs[i].messages;
		app.tabs[i].name = tabs[i].name;
		app.tabs[i].tabId = tabs[i].tabId;
	}
	callListeners();
});
socket.on('newMessages', function(tabs){
	app.tabs[tabs.currentTab].messages = tabs.data;
	document.getElementById('chatDisplay').scrollTop = 9999;
});