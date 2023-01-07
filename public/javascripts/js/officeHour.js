$(function(){

    $('#tableOfficeHour').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/office-hour/datatable',
        columnDefs: [
            {"className": "text-center", "targets": 5},
            {"className": "text-center", "targets": 0}
        ]
    })

    $('#discard').click(function(){
        $('#formOfficeHour')[0].reset()
    })

})