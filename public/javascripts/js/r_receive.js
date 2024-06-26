function report(e) {
        
    if(typeof e == 'object')
        e.innerHTML = 'Loading...'
    
    $('#tableReportReceive').DataTable({
        processing: true,
        serverSide: true,
        bDestroy: true,
        order: [[0, 'desc']],
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

function exportCsv(e){

    var fromDate = $('#fromdate').val()
    var toDate = $('#todate').val()

    var u = ''

    if( fromDate != '' && toDate != '') {
        u = fromDate +'/'+toDate
    } else {
        u = 'null/null'
    }

    window.location.href = '/report/receive-csv/' + u

}

function downloadRecording(e) {


    var fromDate = $('#fromdate').val()
    var toDate = $('#todate').val()

    var u = ''

    if( fromDate == '' && toDate == '') {
        setTimeout(() => {
            alert('Date cannot be empty')
            e.innerHTML = 'Download Recording'
        }, "500");
        
        
        return false
    } 

    
    window.location.href = '/report/receive-recording/' + fromDate +'/'+toDate

}

report('')