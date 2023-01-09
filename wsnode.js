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

let tmp_incall = {}
let tmp_abandoncall = {}
let tmp_busy = {}
 
ws.on('message', async (data) => {
  // console.log(data)
  	var res = JSON.parse(data)

  	switch(res.type){
	 
	  	case'ChannelStateChange':
		
			var channel = res.channel

			switch (channel.state) {
				
				case 'Ring':

					console.log(res)
					
					var phone = await websocketModels.check_phone_number(res.channel.caller.number)

					if(phone.length != 0 ) {

						for (const key in phone) {
							
							if(phone[key].black_list == 'Y') {

								amiManager.action({
									'action':'Hangup',
									'channel':res.channel.name
								}, function(err, res) { });

								amiManager.on('response', function(evt) { });

								break;

							} 

						}

					}

					break;
			
				// case 'Ringing':

				// 	break;
			}
			

	  	break;

	  	case'Dial':	  	
	  		
			console.log(res)
			
			switch (res.dialstatus) {

				case 'RINGING':
					
					if(!('caller' in res) )
						return false
						
					if(res.caller.dialplan.context != 'Bapeda_in_open')
						return false

					if(res.caller.caller.number in tmp_incall)
						return false

						tmp_incall[res.caller.caller.number] = res.caller.caller.number
						
						var phone = await websocketModels.check_phone_number(res.caller.caller.number)
							
						var valueRinging = [
						 	 res.caller.id
							,''
							,res.dialstatus
							,res.timestamp
							,res.caller.caller.number
							,''
						]
						
						var inserLog = await websocketModels.insertData(valueRinging)

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

					if(!('caller' in res) && !('peer' in res))
						return false
					
					var updatecounter = await websocketModels.update_counter(2)
					var currentcounter = await websocketModels.getDataById(2)

					var valueAnswer = [
                        res.caller.id
						,res.peer.id
						,res.dialstatus
						,res.timestamp
						,res.caller.caller.number
						,res.peer.caller.number
                    ]

					var inserLog = await websocketModels.insertData(valueAnswer)
					var update_incall = await websocketModels.update_incall( res.peer.caller.number, 'Y' )

					delete currentcounter.meta
					
					console.log(currentcounter)

					res.callCounter = currentcounter[0]['call_counter']

					socket.emit('answer', res)
					break;

				case 'NOANSWER':
					
					if(res.caller.caller.number in tmp_abandoncall)
						return false

					tmp_abandoncall[res.caller.caller.number] = res.caller.caller.number

					var updatecounter = await websocketModels.update_counter(3)
					var currentcounter = await websocketModels.getDataById(3)
					
					var valueNoanswer = [
                        res.caller.id
						,res.peer.id
						,res.dialstatus
						,res.timestamp
						,res.caller.caller.number
						,res.peer.caller.number
                    ]
					
					var inserLog = await websocketModels.insertData(valueNoanswer)
					var update_incall = await websocketModels.update_incall( res.peer.caller.number )

					delete currentcounter.meta

					console.log(currentcounter)

					res.callCounter = currentcounter[0]['call_counter']

					

					socket.emit('noanswer', res)
					break;

				case 'BUSY':

					if(res.caller.caller.number in tmp_busy)
						return false
					
					tmp_busy[res.caller.caller.number] = res.caller.caller.number

					var updatecounter = await websocketModels.update_counter(3)
					var currentcounter = await websocketModels.getDataById(3)

					var valueBusy = [
                        res.caller.id
						,res.peer.id
						,res.dialstatus
						,res.timestamp
						,res.caller.caller.number
						,res.peer.caller.number
                    ]
					
					var inserLog = await websocketModels.insertData(valueBusy)

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
		  
			if(res.channel.caller.number in tmp_incall)
				delete tmp_incall[res.channel.caller.number]

			if(res.channel.caller.number in tmp_abandoncall)
				delete tmp_abandoncall[res.channel.caller.number]

			if(res.channel.caller.number in tmp_busy)
				delete tmp_busy[res.channel.caller.number]

			
			if(res.channel.dialplan.context == 'bapeda'){
				socket.emit('destroy', res)
			}	

	  	break;

	  }

});