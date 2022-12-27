const ioSocket = io('http://localhost:3000',{
    transports: ["websocket", "polling"] // use WebSocket first, if available
});


function incomnigBox(params) {
    
    var ext = document.getElementById('extension').value

    var incomingBox = '<div class="col-md-2 my-1" id="incomingCall_'+ext+'">'
        incomingBox += '    <div class="card">'
        incomingBox += '        <div class="card-header blinking-in">'
        incomingBox += '            <i class="fa fa-phone me-2"></i>'
        incomingBox += '            Incoming call'
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
 

ioSocket.on("connect", () => {

    console.log('konek websocket server ' )

});

ioSocket.on("responseRinging", (res) => {

    console.log('dapet pesan dari server ringing' )
    console.log( res )
    
    var incoming = incomnigBox(res)

    $('#rowIncoming').append(incoming)

});

ioSocket.on("responseAnswer", (res) => {

    console.log("responseAnswer")
    console.log(res)
    
    var ext = res.peer.caller.number

    if(!document.body.contains(document.getElementById('incomingCall_'+ext)))
        document.getElementById('incomingCall_'+ext).remove()

});

ioSocket.on("responseNoanswer", (res) => {

    console.log("responseNoanswer")
    console.log(res)

    var ext = document.getElementById('extension').value

    if(document.body.contains(document.getElementById('incomingCall_'+ext)))
        document.getElementById('incomingCall_'+ext).remove()

});

ioSocket.on("responseDestroy", (res) => {

    console.log("responseDestroy")

    var ext = document.getElementById('extension').value

    if(document.body.contains(document.getElementById('incomingCall_'+ext)))
        document.getElementById('incomingCall_'+ext).remove()

});

ioSocket.on("responseError", (res) => {

    console.log( res )
    
});