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

window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Calls Traffic"
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
            dataPoints: [
                { x: new Date(2017, 0, 3), y: 650 },
                { x: new Date(2017, 0, 4), y: 700 },
                { x: new Date(2017, 0, 5), y: 710 },
                { x: new Date(2017, 0, 6), y: 658 },
                { x: new Date(2017, 0, 7), y: 734 },
                { x: new Date(2017, 0, 8), y: 963 },
                { x: new Date(2017, 0, 9), y: 847 },
                { x: new Date(2017, 0, 10), y: 853 },
                { x: new Date(2017, 0, 11), y: 869 },
                { x: new Date(2017, 0, 12), y: 943 },
                { x: new Date(2017, 0, 13), y: 970 },
                { x: new Date(2017, 0, 14), y: 869 },
                { x: new Date(2017, 0, 15), y: 890 },
                { x: new Date(2017, 0, 16), y: 930 }
            ]
        },
        {
            type: "line",
            showInLegend: true,
            name: "Receive",
            markerType: "square",
            color: "#1da585",
            dataPoints: [
                { x: new Date(2017, 0, 3), y: 310 },
                { x: new Date(2017, 0, 4), y: 360 },
                { x: new Date(2017, 0, 5), y: 340 },
                { x: new Date(2017, 0, 6), y: 358 },
                { x: new Date(2017, 0, 7), y: 344 },
                { x: new Date(2017, 0, 8), y: 393 },
                { x: new Date(2017, 0, 9), y: 357 },
                { x: new Date(2017, 0, 10), y: 263 },
                { x: new Date(2017, 0, 11), y: 239 },
                { x: new Date(2017, 0, 12), y: 273 },
                { x: new Date(2017, 0, 13), y: 260 },
                { x: new Date(2017, 0, 14), y: 262 },
                { x: new Date(2017, 0, 15), y: 243 },
                { x: new Date(2017, 0, 16), y: 270 }
            ]
        },
        {
            type: "line",
            showInLegend: true,
            name: "Abandon",
            markerType: "square",
            color: "#dfa115",
            dataPoints: [
                { x: new Date(2017, 0, 3), y: 150 },
                { x: new Date(2017, 0, 4), y: 150 },
                { x: new Date(2017, 0, 5), y: 150 },
                { x: new Date(2017, 0, 6), y: 158 },
                { x: new Date(2017, 0, 7), y: 154 },
                { x: new Date(2017, 0, 8), y: 153 },
                { x: new Date(2017, 0, 9), y: 157 },
                { x: new Date(2017, 0, 10), y: 683 },
                { x: new Date(2017, 0, 11), y: 689 },
                { x: new Date(2017, 0, 12), y: 683 },
                { x: new Date(2017, 0, 13), y: 680 },
                { x: new Date(2017, 0, 14), y: 682 },
                { x: new Date(2017, 0, 15), y: 683 },
                { x: new Date(2017, 0, 16), y: 680 }
            ]
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

}