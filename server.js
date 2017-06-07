'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app); 
var io = require('socket.io')(server); 
var log4js = require('log4js');
var logger = log4js.getLogger(); 
var port = 1348; 
logger.debug('Script has been started...');
server.listen(port);

app.use(express.static(__dirname + '/public'));
class ServerData{
	constructor(){
		this.tabs = [undefined];
	}
	addTab(name){
		let a = new serverTab(name);
		this.tabs.push(a);
	}
}
var serverData = new ServerData();
class serverTab{
	constructor(name){
		this.name = name ? name : 'Unknown Tab';
		this.messages = [];
		this.users = [];
		this.tabId = serverData.tabs[0]!= undefined ? Number(serverData.tabs[serverData.tabs.length-1].tabId)+1 : 0;
		this.oldMessageList = '';
	}
	addMessage(messag){
		this.messages.push({name : messag.name, message : messag.message});
	}
}


serverData.tabs[0] = new serverTab('Home');

io.on('connection', function (socket) { 
	socket.emit('tabs', serverData.tabs);
  	logger.info('user connected to chat!');

  socket.on('message', function(msg){ 
    logger.warn('-----------');
    logger.warn('User: ' + msg.name + ' | Message: ' + msg.message);
    logger.warn('Saving message and sending it to others');
    serverData.tabs[msg.currentTab].addMessage(msg)
    io.sockets.emit('newMessages', {data : serverData.tabs[msg.currentTab].messages, currentTab : msg.currentTab}); 
});

  socket.on('newTab', function(tab){ 
    logger.warn('^^^^^^^^^^^^^^^^^^');
    logger.warn('User: ' + tab.name + ' | New Tab: ' + tab.tabName);
    logger.warn('<<<<<<<<<>>>>>>>>>');
    serverData.addTab(tab.tabName);
    socket.emit('tabs', serverData.tabs);
    logger.info('Tabs have been updated');
});
});