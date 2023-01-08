function dial(e, ext, id, type) {
        
    e.innerHTML = 'Loading...'
    
    $.ajax({
    
        url:"/dashboard/"+type,
        method:"POST", //First change type to method here
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            'ext': ext,
            'channel': id
        }),
        success:function(response) {
            
            if(response.err){
               alert('System error')
               return false 
            }

            switch (type) {
        
                case 'barge':
                    e.innerHTML = 'Barge'
                    break;
            
                case 'whisp':
                    e.innerHTML = 'Wishp'
                    break;
    
                case 'spy':
                    e.innerHTML = 'Spy'        
                    break;
            }
            
            
            e.classList.remove("btn-warning");
            e.classList.add("btn-success");
        },
        error:function(){
            alert("Sorry cannot " + type );
        }
    
    });

}            

$(function(){

    var listActiveCall = $('input[name="listExtActiveCall[]"]')

    for (var i = 0; i <listActiveCall.length; i++) {
        
        var v = listActiveCall[i].value.split('|')
        var ext = v[0]
        var seconds = v[1]

        if(ext != '' || ext != null) {

            totalSeconds = seconds
    
            intervalCOunter[ext] = setInterval( function(){setTime(ext)} , 1000);

        }

    }

    $.ajax({
        type: "POST",
        url: "/dashboard/chart",
        // data: JSON.stringify({ Markers: markers }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){

            if(data.err){
                alert(data);
                return false
            }

            console.log(data)

            var dataPointsIncoming = []
            var dataPointsReceive = []
            var dataPointsAbandon = []
            var d = data.data
            var t = ''

            for (let index = 1; index <= 31; index++) {
                
                for (const key in d) {
                    
                    t = d[key].tahun

                    if(d[key].tanggal == index) {

                        switch (d[key].call_event) {

                        case 'RINGING':
                            dataPointsIncoming.push({ x: new Date(d[key].tahun, 0, d[key].tanggal), y: Number(d[key].total) })
                            break;
                
                        case 'ANSWER':
                            dataPointsReceive.push({ x: new Date(d[key].tahun, 0, d[key].tanggal), y: Number(d[key].total) })
                            break;
                        
                        case 'NOANSWER':
                        case 'BUSY':
                            dataPointsAbandon.push({ x: new Date(d[key].tahun, 0, d[key].tanggal) , y: Number(d[key].total) })
                            break;
                        
                        }

                    } 

                }
                
            }
              
            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                theme: "light2",
                title:{
                    text: "Calls Traffic " + t
                },
                axisX:{
                    valueFormatString: "DD MMM",
                    crosshair: {
                        enabled: true,
                        snapToDataPoint: true
                    }
                },
                axisY: {
                    title: "",
                    includeZero: true,
                    crosshair: {
                        enabled: true
                    }
                },
                toolTip:{
                    shared:true
                },  
                legend:{
                    cursor:"pointer",
                    verticalAlign: "bottom",
                    horizontalAlign: "left",
                    dockInsidePlotArea: true,
                    itemclick: toogleDataSeries
                },
                data: [{
                    type: "line",
                    showInLegend: true,
                    name: "Incoming",
                    markerType: "square",
                    xValueFormatString: "DD MMM, YYYY",
                    color: "#F08080",
                    dataPoints: dataPointsIncoming
                },
                {
                    type: "line",
                    showInLegend: true,
                    name: "Receive",
                    markerType: "square",
                    color: "#1da585",
                    dataPoints: dataPointsReceive
                },
                {
                    type: "line",
                    showInLegend: true,
                    name: "Abandon",
                    markerType: "square",
                    color: "#dfa115",
                    dataPoints: dataPointsAbandon
                }]
            });
            chart.render();
            
            function toogleDataSeries(e){
                if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else{
                    e.dataSeries.visible = true;
                }
                chart.render();
            }
        
            chart.render();

        },
        error: function(errMsg) {
            alert(errMsg);
        }
    });


})
