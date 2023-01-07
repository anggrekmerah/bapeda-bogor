
const ioSocket = io('http://'+window.location.hostname+':3000',{
    transports: ["websocket", "polling"] // use WebSocket first, if available
});

function incomnigBox(params) {
    
    if(!document.body.contains(document.getElementById('extension')))
        return ''

    var ext = document.getElementById('extension').value

    var incomingBox = '<div class="col-md-2 my-1" id="incomingCall_'+ext+'" card-incoming="card-'+params.caller.caller.number+'">'
        incomingBox += '    <div class="card">'
        incomingBox += '        <div class="card-header blinking-in">'
        
        incomingBox += '                <div class="row">'
        incomingBox += '                    <div class="col-md-10">'
        incomingBox += '                        <i class="fa fa-phone me-2">Incoming call</i>'
        incomingBox += '                    </div>'
        incomingBox += '                    <div class="col-md-2 text-end">'
        incomingBox += '                        <i class=" fa-solid fa-ellipsis-vertical" id="dropdownMenuButton1" style="cursor:pointer;" data-bs-toggle="dropdown" ></i>'
        incomingBox += '                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1"></ul>'
        incomingBox += '                            <li>'
        incomingBox += '                                <a class="dropdown-item" href="/phone-book/add?phone_number='+params.caller.caller.number+'"> Add Phonebook</a>'
        incomingBox += '                            </li>'
        incomingBox += '                            <li>'
        incomingBox += '                                <a class="dropdown-item" href="/black-list/add?phone_number='+params.caller.caller.number+'"> Add Blacklist</a>'
        incomingBox += '                            </li>'
        incomingBox += '                    </div>'
        incomingBox += '                </div>'
                            
                            

        incomingBox += '        </div>'
        incomingBox += '        <div class="card-body">'
        incomingBox += '            <table class="table" > '  
        incomingBox += '                <tr>  '
        incomingBox += '                    <td> From </td>'
        incomingBox += '                    <td> : </td>'
        incomingBox += '                    <td> '+params.from+' </td>'
        incomingBox += '                </tr>'
        incomingBox += '                <tr>  '
        incomingBox += '                    <td> Phone </td>'
        incomingBox += '                    <td> : </td>'
        incomingBox += '                    <td> '+params.caller.caller.number+' </td>'
        incomingBox += '                </tr>'
        incomingBox += '                <tr>  '
        incomingBox += '                    <td> Note </td>'
        incomingBox += '                    <td> : </td>'
        incomingBox += '                    <td> '+params.notes+' </td>'
        incomingBox += '                </tr>'
        incomingBox += '            </table>'
        incomingBox += '        </div>'
        incomingBox += '    </div>    '
        incomingBox += '</div>'
    
    return incomingBox     

}
 
function setTime(ext) {

    ++totalSeconds;

    var hoursLabel      = document.getElementById("hours_"+ext);
    var minutesLabel    = document.getElementById("minutes_"+ext);
    var secondsLabel    = document.getElementById("seconds_"+ext);

    secondsLabel.innerHTML = pad(totalSeconds % 60);

    minutesLabel.innerHTML = pad(parseInt( (totalSeconds / 60) % 60) );

    hoursLabel.innerHTML = pad(parseInt(  totalSeconds / 3600 ));

}
  
function pad(val) {
    
    var valString = val + "";
    
    return (valString.length < 2) ? "0" + valString : valString;
  
}

ioSocket.on("connect", () => {

    console.log('konek websocket server ' )

});

ioSocket.on("responseRinging", (res) => {

    console.log('dapet pesan dari server ringing' )
    console.log( res )
    
    if(document.body.contains(document.getElementById('counterIncoming')))
        document.getElementById('counterIncoming').innerHTML = res.callCounter


    if(document.querySelector("div[card-incoming='card-"+res.caller.caller.number+"']") == undefined && 
        document.body.contains(document.getElementById('extension'))) {

        var incoming = incomnigBox(res)

        $('#rowIncoming').append(incoming)

    }
        

});

ioSocket.on("responseAnswer", (res) => {

    console.log("responseAnswer")
    console.log(res)
    
    if(document.body.contains(document.getElementById('counterReceive'))) // dashboard counter
        document.getElementById('counterReceive').innerHTML = res.callCounter

    if(document.body.contains(document.getElementById('extension'))) { // dashboard agent

        var ext = res.peer.caller.number
        var ext_actual = document.getElementById('extension').value

        if(!document.body.contains(document.getElementById('incomingCall_'+ext)))
            document.getElementById('incomingCall_'+ext_actual).remove()

    }


    if(document.body.contains(document.getElementById('statusInCallAgent_'+res.peer.caller.number))) { // dashboard

        console.log('btnBargeAgent_'+res.peer.caller.number)
        console.log('btnWishpAgent_'+res.peer.caller.number)
        console.log('btnSpyAgent_'+res.peer.caller.number)

        if(document.body.contains(document.getElementById('btnBargeAgent_'+res.peer.caller.number))){
            document.getElementById('btnBargeAgent_'+res.peer.caller.number).removeAttribute('disabled')
            document.getElementById('btnBargeAgent_'+res.peer.caller.number).setAttribute('onclick','dial(this,\''+res.peer.caller.number+'\',\''+res.peer.id+'\',\'barge\')')
        }
        
        
        if(document.body.contains(document.getElementById('btnWishpAgent_'+res.peer.caller.number))){
            document.getElementById('btnWishpAgent_'+res.peer.caller.number).removeAttribute('disabled')
            document.getElementById('btnWishpAgent_'+res.peer.caller.number).setAttribute('onclick','dial(this,\''+res.peer.caller.number+'\',\''+res.peer.id+'\',\'whisp\')')
        }
            
        
        if(document.body.contains(document.getElementById('btnSpyAgent_'+res.peer.caller.number))){
            document.getElementById('btnSpyAgent_'+res.peer.caller.number).removeAttribute('disabled')
            document.getElementById('btnSpyAgent_'+res.peer.caller.number).setAttribute('onclick','dial(this,\''+res.peer.caller.number+'\',\''+res.peer.id+'\',\'spy\')')
        }
            

        document.getElementById('statusInCallAgent_'+res.peer.caller.number).innerHTML = 'IN CALL'

        intervalCOunter[res.peer.caller.number] = setInterval( function(){setTime(res.peer.caller.number)} , 1000);

    }
    

});

ioSocket.on("responseNoanswer", (res) => {

    console.log("responseNoanswer")
    console.log(res)

    if(document.body.contains(document.getElementById('counterAbandon')))
        document.getElementById('counterAbandon').innerHTML = res.callCounter

    if(document.body.contains(document.getElementById('extension'))) {

        var ext = document.getElementById('extension').value

        if(document.body.contains(document.getElementById('incomingCall_'+ext)))
            document.getElementById('incomingCall_'+ext).remove()

    }
    
});

ioSocket.on("responseDestroy", (res) => {

    console.log("responseDestroy")

    if(document.body.contains(document.getElementById('extension'))) { // dashboard agent

        var ext = document.getElementById('extension').value

        if(document.body.contains(document.getElementById('incomingCall_'+ext)))
            document.getElementById('incomingCall_'+ext).remove()
        
    }

    if(document.body.contains(document.getElementById('statusInCallAgent_'+res.channel.caller.number))) { // dashboard

        clearInterval(intervalCOunter[res.channel.caller.number])

        document.getElementById('statusInCallAgent_'+res.channel.caller.number).innerHTML = 'IDLE'

        document.getElementById('btnBargeAgent_'+res.channel.caller.number).setAttribute('disabled','disabled')
        document.getElementById('btnWishpAgent_'+res.channel.caller.number).setAttribute('disabled','disabled')
        document.getElementById('btnSpyAgent_'+res.channel.caller.number).setAttribute('disabled','disabled')

        document.getElementById('btnBargeAgent_'+res.channel.caller.number).classList.remove('btn-success')
        document.getElementById('btnWishpAgent_'+res.channel.caller.number).classList.remove('btn-success')
        document.getElementById('btnSpyAgent_'+res.channel.caller.number).classList.remove('btn-success')

        document.getElementById('btnBargeAgent_'+res.channel.caller.number).classList.add('btn-warning')
        document.getElementById('btnWishpAgent_'+res.channel.caller.number).classList.add('btn-warning')
        document.getElementById('btnSpyAgent_'+res.channel.caller.number).classList.add('btn-warning')

    }
       

});

ioSocket.on("responseUserLogin", (res) => {

    console.log("responseUserLogin")
    console.log(res)

    if(document.body.contains(document.getElementById('cardAgent_'+res.extension))) {

        document.getElementById('cardAgent_'+res.extension).remove()

        let temp = document.createElement('template');
        temp.innerHTML = res.element;
        
        document.getElementById('agentList').append(temp.content.firstChild)

    }

});

ioSocket.on("responseUserLogOut", (res) => {

    console.log("responseUserLogOut")
    console.log(res)

    if(document.body.contains(document.getElementById('cardAgent_'+res.extension))) {

        document.getElementById('cardAgent_'+res.extension).remove()

        let temp = document.createElement('template');
        temp.innerHTML = res.element;
        
        document.getElementById('agentList').append(temp.content.firstChild)

        document.getElementById('btnBargeAgent_'+res.extension).setAttribute('disabled','disabled')
        document.getElementById('btnWishpAgent_'+res.extension).setAttribute('disabled','disabled')
        document.getElementById('btnSpyAgent_'+res.extension).setAttribute('disabled','disabled')

    }

});

ioSocket.on("responseError", (res) => {

    console.log( res )
    
});