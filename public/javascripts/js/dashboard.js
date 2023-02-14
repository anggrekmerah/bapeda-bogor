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
                        dataPointsIncoming.push({ x: parseInt(d[key].tanggal), y: Number(d[key].total) })
                        break;
            
                    case 'ANSWER':
                        dataPointsReceive.push({ x: parseInt(d[key].tanggal), y: Number(d[key].total) })
                        break;
                    
                    case 'NOANSWER':
                    case 'BUSY':
                    case 'CANCEL':
                        dataPointsAbandon.push({ x: parseInt(d[key].tanggal) , y: Number(d[key].total) })
                        break;
                
                }

            }

            var it = {}
            var rt = {}
            var at = {}

            for (const k in dt) {
                var mtt = new Date(dt[k].tahun, (parseInt(dt[k].bulan) - 1), 1).toLocaleString('en-US', { month: 'short' });
                switch (dt[k].call_event) {

                    case 'RINGING':
                        if(it[ dt[k].bulan ] != undefined) {
                            it[dt[k].bulan]['RINGING'] = { label: mtt, y: (it[dt[k].bulan]['RINGING']['y'] + Number(dt[k].total)) , indexLabelFontSize: 16}
                        } else {
                            it[dt[k].bulan] = {'RINGING' : { label: mtt, y: Number(dt[k].total) , indexLabelFontSize: 16}}
                        }
                        
                        break;
            
                    case 'ANSWER':
                        if(rt[ dt[k].bulan ] != undefined) {
                            rt[dt[k].bulan]['ANSWER'] = { label: mtt, y: (it[dt[k].bulan]['RINGING']['y'] + Number(dt[k].total)) , indexLabelFontSize: 16}
                        } else {
                            rt[dt[k].bulan] = {'ANSWER' : { label: mtt, y: Number(dt[k].total) , indexLabelFontSize: 16}} 
                        }
                        break;
                    
                    case 'NOANSWER':
                    case 'BUSY':
                    case 'CANCEL':
                        if(at[ dt[k].bulan ] != undefined) {
                            at[dt[k].bulan]['ABANDON'] = { label: mtt, y: (it[dt[k].bulan]['RINGING']['y'] + Number(dt[k].total)) , indexLabelFontSize: 16}
                        } else {
                            at[dt[k].bulan] = {'ABANDON' : { label: mtt, y: Number(dt[k].total) , indexLabelFontSize: 16}} 
                        }
                        break;
                
                }

            }

            
            for (let index = 1; index <= 12; index++) {
                
                var mt = new Date(t, (index - 1), 1).toLocaleString('en-US', { month: 'short' });

                if(it[index] == undefined) {
                    dataPointsIncomingTahun.push({ label: mt, y: 0 , indexLabelFontSize: 16})
                } else {
                    dataPointsIncomingTahun.push(it[index]['RINGING'])
                }

                if(it[index] == undefined) {
                    dataPointsReceiveTahun.push({ label: mt, y: 0 , indexLabelFontSize: 16})
                } else {
                    dataPointsReceiveTahun.push(rt[index]['ANSWER'])
                }

                if(it[index] == undefined) {
                    dataPointsAbandonTahun.push({ label: mt, y: 0 , indexLabelFontSize: 16})
                } else {
                    dataPointsAbandonTahun.push(at[index]['ABANDON'])
                }
                
                

            }
            console.log(dataPointsIncomingTahun)
            console.log(dataPointsReceiveTahun)
            console.log(dataPointsAbandonTahun)

              
            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                title:{
                    text: "Calls Traffic " + m  + " " + t
                },
                axisX:{
                    labelFontSize: 12,
                    interval: 1,
                    intervalType: "number"
                    // valueFormatString: "MMM",
                    // crosshair: {
                    //     enabled: false,
                    //     snapToDataPoint: true
                    // }
                },
                axisY: {
                    labelFontSize: 12
                    // title: "",
                    // includeZero: true,
                    // crosshair: {
                    //     enabled: true
                    // }
                },
                legend:{
                    cursor: "pointer",
                    fontSize: 16,
                    itemclick: toggleDataSeries
                },
                toolTip:{
                    shared: true
                },
                data: [{
                    name: "Incoming",
                    type: "spline",
                    yValueFormatString: "#",
                    showInLegend: true,
                    dataPoints: dataPointsIncoming
                },
                {
                    name: "Receive",
                    type: "spline",
                    yValueFormatString: "#",
                    showInLegend: true,
                    dataPoints: dataPointsReceive
                },
                {
                    name: "Abandon",
                    type: "spline",
                    yValueFormatString: "#",
                    showInLegend: true,
                    dataPoints: dataPointsAbandon
                }]
            });
            chart.render();

            var chartTahun = new CanvasJS.Chart("chartContainerTahun", {
                animationEnabled: true,
                // theme: "light2",
                title:{
                    text: "Calls Traffic " + t
                },
                axisX:{
                    labelFontSize: 12,
                    interval: 1,
                    intervalType: "month"
                    // valueFormatString: "MMM",
                    // crosshair: {
                    //     enabled: false,
                    //     snapToDataPoint: true
                    // }
                },
                axisY: {
                    labelFontSize: 12
                    // title: "",
                    // includeZero: true,
                    // crosshair: {
                    //     enabled: true
                    // }
                },
                toolTip:{
                    shared:true
                },  
                legend:{
                    cursor:"pointer",
                    verticalAlign: "bottom",
                    fontSize: 16,
                    // dockInsidePlotArea: true,
                    itemclick: toogleDataSeriesTahun
                },
                data: [{
                    type: "spline",
                    showInLegend: true,
                    name: "Incoming",
                    markerType: "square",
                    color: "#F08080",
                    dataPoints: dataPointsIncomingTahun
                },
                {
                    type: "spline",
                    showInLegend: true,
                    name: "Receive",
                    markerType: "square",
                    color: "#1da585",
                    dataPoints: dataPointsReceiveTahun
                },
                {
                    type: "spline",
                    showInLegend: true,
                    name: "Abandon",
                    markerType: "square",
                    color: "#dfa115",
                    dataPoints: dataPointsAbandonTahun
                }]
            });
            chartTahun.render();
            
            function toggleDataSeries(e){
                if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else{
                    e.dataSeries.visible = true;
                }
                chart.render();
            }

            function toogleDataSeriesTahun(e){
                if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else{
                    e.dataSeries.visible = true;
                }
                chartTahun.render();
            }
        
            // chart.render();

        },
        error: function(errMsg) {
            alert(errMsg);
        }
    });


})
