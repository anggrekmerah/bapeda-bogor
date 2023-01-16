function report(e) {
    
    if(typeof e == 'object')
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
        ,
        initComplete:function( settings, json){
            console.log(json);

            if(typeof e == 'object')
                e.innerHTML = 'SEARCH'
            
            return json
            // call your function here
        }
        // ,columnDefs: [
        //     {"className": "text-center", "targets": 5},
        //     {"className": "text-center", "targets": 0}
        // ]
    })

} 

report('')