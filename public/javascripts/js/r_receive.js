function report(e) {
        
    if(typeof e == 'object')
        e.innerHTML = 'Loading...'
    
    $('#tableReportReceive').DataTable({
        processing: true,
        serverSide: true,
        bDestroy: true,
        // bJQueryUI: true,
        ajax: {
            type: 'POST',
            url: '/report/receive-datatable',
            data: function (params) {

                params.fromDate = $('#fromdate').val()
                params.toDate = $('#todate').val()

                return JSON.stringify( params );
                // etc..
             },
            dataType: "json",
            contentType: "application/json",
            // async: false,
            // success: function(data){
            //     return JSON.stringify( data );
            // }
        },
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