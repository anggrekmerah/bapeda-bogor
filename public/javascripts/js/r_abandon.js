function report(e) {
        
    e.innerHTML = 'Loading...'
    
    $('#tableReportAbandon').DataTable({
        processing: true,
        serverSide: true,
        bDestroy: true,
        // bJQueryUI: true,
        ajax: {
            type: 'POST',
            url: '/report/abandon-datatable',
            data: {
               fromDate: $('#fromdate').val(),
               toDate: $('#todate').val(),
               // etc..
            },
            dataType: "json",
            // success: function(data){
            //     return JSON.stringify( data );
            // }
        }
        ,columnDefs: [
            {"className": "text-center", "targets": 5},
            {"className": "text-center", "targets": 0}
        ]
    })

} 