'use strict';
class ChatTab{
	constructor(name){
		this.name = name ? name : 'Unknown Tab';
		this.messages = [];
		this.tabId = app.tabs[0]!= undefined ? Number(app.tabs[app.tabs.length-1].tabId)+1 : 0;
		this.oldMessageList = '';
		inputListener(this);
	}
	changeTab(num){
			document.getElementById(app.currentTab).id = num;
			app.prevTab = app.currentTab;
			app.currentTab = num;
			document.getElementById('chatDisplay').setAttribute('class', 'animatedMain pulse');
			setTimeout(function(){
				document.getElementById('chatDisplay').setAttribute('class', '');
			}, 500)
	}

	addMessage(messag){
		if(this.tabId == app.currentTab && messag != ''){
			socket.emit('message', {name : app.userName, message : messag, currentTab : app.currentTab})
        	document.getElementById(app.currentTab).value = "";
        	document.getElementById('chatDisplay').scrollTop = 9999;		}
	}

	showMessages() {
		var messageList = '';
		var a = '';
		var b = '';
		for(let i = 0; i < this.messages.length; i++){
			if(this.oldMessageList.indexOf(this.messages[i].message)+1){
				a = ''
			}
			else{
				a = 'animatedMain pulse'
			}
			if(this.messages[i].name == app.userName){
				b = 'mine';
			}
			else {
				b = '';
			}
			messageList += '<div class="'+ b +' message '+ a + '"><span class="messageName">' + this.messages[i].name + ':</span><span class="messageContent"> ' + this.messages[i].message + '</span></div>';
			a = '';
		}
		if(document.getElementById('chatDisplay').innerHTML != messageList){
			document.getElementById('chatDisplay').innerHTML = messageList;
			document.getElementById('chatDisplay').scrollTop = 9999;
		} 
		this.oldMessageList = messageList;
	}
}