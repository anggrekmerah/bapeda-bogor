const WebSocket = require('ws');
var http = require("http");
var amis = require('asterisk-manager');

require('dotenv').config({path:'.env'})

const { io } = require("socket.io-client");
const { stat } = require('fs');
const websocketModel = require('./models/websocket/websocketModel');

const env = process.env;

const socket = io('ws://localhost:3000');

var websocketModels = new websocketModel()

var amiManager = new amis(env.AMI_PORT,env.AMI_HOST,env.AMI_USER,env.AMI_PASS, true) 

amiManager.keepConnected()

const ws = new WebSocket('ws://'+env.ARI_HOST+':'+env.ARI_PORT+'/ari/events?api_key='+env.ARI_USER+':'+env.ARI_PASS+'&app=Voipstasis&subscribeAll=true');
 
ws.on('open', function open() {
  
	console.log('Connected Asterisk Rest Interface')

});
 
ws.on('message', async (data) => {
  // console.log(data)
  var res = JSON.parse(data)

  	switch(res.type){
	 
	  	case'ChannelStateChange':
		
			var channel = res.channel

			switch (channel.state) {
				
				case 'Ring':
					console.log(res)
					

					break;
			
				// case 'Ringing':

				// 	break;
			}
			

	  	break;

	  	case'Dial':	  	
	  		
			console.log(res)
			
			switch (res.dialstatus) {

				case 'RINGING':
					
						
						var phone = await websocketModels.check_phone_number(res.caller.caller.number)
							
						delete phone.meta

						console.log('hasil query phone book')
						console.log(phone)

						if(phone.length == 0) {

							res['from'] = 'Unknown'
							res['notes'] = ''

							var updatecounter = await websocketModels.update_counter(1)
							var currentcounter = await websocketModels.getDataById(1)

							delete currentcounter.meta
							
							console.log(currentcounter)

							res.callCounter = currentcounter[0]['call_counter']

							socket.emit('ringing', res)

						} else {

							for (const key in phone) {
							
								if(phone[key].active == 'N') {

									amiManager.action({
										'action':'Hangup',
										'channel':res.caller.name
									}, function(err, res) { });
	
									amiManager.on('response', function(evt) { });

									break;
	
								} else {
									
									res['from'] = ( phone[key].phone_name == null || phone[key].phone_name == '') ? 'Unknown' : phone[key].phone_name
									res['notes'] = (phone[key].notes == null) ? '' : phone[key].notes

									var updatecounter = await websocketModels.update_counter(1)
									var currentcounter = await websocketModels.getDataById(1)
									
									delete currentcounter.meta

									console.log(currentcounter)

									res.callCounter = currentcounter[0]['call_counter']

									socket.emit('ringing', res)

									break;
								
								}

							}

						}
						
					break;
			
				case 'ANSWER':
					var updatecounter = await websocketModels.update_counter(2)
					var currentcounter = await websocketModels.getDataById(2)
					delete currentcounter.meta
					
					console.log(currentcounter)

					res.callCounter = currentcounter[0]['call_counter']

					socket.emit('answer', res)
					break;

				case 'NOANSWER':
					var updatecounter = await websocketModels.update_counter(3)
					var currentcounter = await websocketModels.getDataById(3)
					delete currentcounter.meta
					console.log(currentcounter)

					res.callCounter = currentcounter[0]['call_counter']

					socket.emit('noanswer', res)
					break;

				case 'BUSY':
					var updatecounter = await websocketModels.update_counter(3)
					var currentcounter = await websocketModels.getDataById(3)
					delete currentcounter.meta
					console.log(currentcounter)

					res.callCounter = currentcounter[0]['call_counter']

					socket.emit('noanswer', res)
					break;
					
			}
		
	  	break;

	  	case'ChannelHold':
		  console.log(res)
		  socket.emit('hold', res)
	  	break;

	  	case'ChannelDestroyed' :
		  console.log(res)
		  
		  if(res.channel.dialplan.context == 'Bapeda_in_open' || res.channel.dialplan.context == 'Bapenda_in'){
			socket.emit('destroy', res)
		  }	

	  	break;

	  }

});