$(function(){

    $.ajax({
        type: "POST",
        url: "/report/chart",
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
            
            var d = data.data

            var t = ''
            var m = ''
                
            var dataP = []
            var dataO = {}

            for (const key in d) {
                
                t = d[key].tahun
                m = d[key].bulan

                if(!(d[key].call_receive_number in dataO)) {
                    dataO[d[key].call_receive_number] = [{ x: new Date(d[key].tahun, 0, d[key].tanggal), y: Number(d[key].total_receive) }]
                } else {
                    dataO[d[key].call_receive_number].push({ x: new Date(d[key].tahun, 0, d[key].tanggal), y: Number(d[key].total_receive) })
                }
                
            }

            for (const k in dataO) {
                
                dataP.push(
                    {
                        type: "line",
                        showInLegend: true,
                        name: k,
                        markerType: "square",
                        dataPoints: dataO[k]
                    }
                )

            }

            console.log(dataP)
            
              
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
                data: dataP
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
