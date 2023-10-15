window.onload = function () {

    $('#wa-datatable').DataTable()
    $('#table_template').DataTable()
    $('#sender_table').DataTable()

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "",
            horizontalAlign: "left"
        },
        data: [{
            type: "doughnut",
            startAngle: 60,
            //innerRadius: 60,
            indexLabelFontSize: 17,
            // indexLabel: "{label} - #percent%",
            toolTipContent: "<b>{label}:</b> {y} (#percent%)",
            dataPoints: 
            [
                { y: 67 },
                { y: 28 },
                { y: 10 }
            ]
        }]
    });
    chart.render();
}