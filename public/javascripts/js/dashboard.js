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
            
            
            // e.classList.remove("btn-warning");
            // e.classList.add("btn-success");
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

            // console.log(data)

            var dataPointsIncoming = []
            var dataPointsReceive = []
            var dataPointsAbandon = []

            var dataPointsIncomingTahun = []
            var dataPointsReceiveTahun = []
            var dataPointsAbandonTahun = []
            
            var d = data.data.bulan
            var dt = data.data.tahun

            var t = ''
            var m = ''
                
            for (const key in d) {
                
                t = d[key].tahun
                m = d[key].bulan

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

            for (const k in dt) {
                
                switch (dt[k].call_event) {

                    case 'RINGING':
                        dataPointsIncomingTahun.push({ x: new Date(dt[k].tahun, (parseInt(dt[k].bulan) - 1), dt[k].tanggal), y: Number(dt[k].total) })
                        break;
            
                    case 'ANSWER':
                        dataPointsReceiveTahun.push({ x: new Date(dt[k].tahun, (parseInt(dt[k].bulan) - 1), dt[k].tanggal), y: Number(dt[k].total) })
                        break;
                    
                    case 'NOANSWER':
                    case 'BUSY':
                        dataPointsAbandonTahun.push({ x: new Date(dt[k].tahun, (parseInt(dt[k].bulan) - 1), dt[k].tanggal), y: Number(dt[k].total) })
                        break;
                
                }

            }

            console.log(dataPointsIncomingTahun)
            console.log(dataPointsReceiveTahun)
            console.log(dataPointsAbandonTahun)

              
            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                theme: "light2",
                title:{
                    text: "Calls Traffic " + m  + " " + t
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

            var chartTahun = new CanvasJS.Chart("chartContainerTahun", {
                animationEnabled: true,
                theme: "light2",
                title:{
                    text: "Calls Traffic " + m  + " " + t
                },
                axisX:{
                    valueFormatString: "MMM",
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
                    color: "#F08080",
                    dataPoints: dataPointsIncomingTahun
                },
                {
                    type: "line",
                    showInLegend: true,
                    name: "Receive",
                    markerType: "square",
                    color: "#1da585",
                    dataPoints: dataPointsReceiveTahun
                },
                {
                    type: "line",
                    showInLegend: true,
                    name: "Abandon",
                    markerType: "square",
                    color: "#dfa115",
                    dataPoints: dataPointsAbandonTahun
                }]
            });
            chartTahun.render();
            
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
