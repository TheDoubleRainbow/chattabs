class App{
	constructor(){
		this.tabs = [];
		this.currentTab = 0;
		this.prevTab = 0;
		this.userName = 'Anonimous';
		this.oldTabsHTML
	}

	addTab(name, that){
		var isNew = true;
		for(let i = 0; i< app.tabs.length; i++){
			if(app.tabs[i].name == name) isNew = false; 
		}
		if(name != '' && name.length < 16 && isNew){
			socket.emit('newTab', {name: app.userName, tabName: name})
			this.renderTabs();
			document.getElementById('addTabModal').setAttribute('class', 'hiddenModal');
		}
		else if(!isNew) {alert('this tab is already exist')} else alert('Name of the tab should be < than 16 letters and has at least 1 letter')
		if(!isNew) alert('asda')
	}
	renderTabs(){
		var tabsHTML = '';
		var a;
		var b;
		for(let i = 0; i < this.tabs.length; i++){
			a = '';
			if(this.currentTab == this.tabs[i].tabId) a = 'id = "tabActive"';
			tabsHTML += '<div class="tab" '+ a +' num="0">' + this.tabs[i].name + '</div>';
		}
		tabsHTML += '<div class="addTab" data-reveal-id="addTab">+</div>'
		if(this.oldTabsHTML != tabsHTML){
			document.getElementById('chatTabs').innerHTML = tabsHTML;
			this.oldTabsHTML = tabsHTML;
		}
		tabListener();
		addTabCloseListener();
		addTabListener();
	}

	enterName(name){
			app.userName = name;
			document.getElementById('addNameModal').setAttribute('class', 'animatedMain fadeOutRight');
		
	}
}