var inputListener = function (that){
		$("#" + app.currentTab).on('keyup', function (e) {
    	if (e.keyCode == 13) {
    		that.addMessage(document.getElementById(app.currentTab).value)
    	}
	});
}
var tabListener = function (that){
		$('.tab').on('click', function (e) {
    		for(let i = 0; i < app.tabs.length; i++){
    			if(this.innerHTML == app.tabs[i].name && i != app.currentTab){
    				app.tabs[i].changeTab(i);
    				this.id = 'tabActive';
    			}
    		}
	});
}
var addTabListener = function (that){
		$('.addTab').on('click', function (e) {
    		document.getElementById('addTabModal').setAttribute('class', 'animatedMain pulse');
	});
}
var addTabCloseListener = function (that){
		$('#addTabModalClose').on('click', function (e) {
    		document.getElementById('addTabModal').setAttribute('class', 'animatedMain fadeOutRight');
	});
}
var tabInputListener = function (that){
		$("#addTabModalInput").on('keyup', function (e) {
    	if (e.keyCode == 13) {
    		app.addTab(this.value);
    	}
	});
}
function showListenerF(){
	var showListener = setInterval(function(){
	app.tabs[app.currentTab].showMessages();
}, 100);
}
function tabShowListener(){
	var tabShowListenerI = setInterval(function(){
		app.renderTabs();
	}, 100);
}
var nameInputListener = function (that){
		$("#addNameModalInput").on('keyup', function (e) {
    	if (e.keyCode == 13) {
    		app.enterName(this.value);
    	}
	});
}
function callListeners(){
	showListenerF();
	tabListener();
	tabShowListener();
	addTabCloseListener();
	addTabListener();
	tabInputListener();
	nameInputListener();
}