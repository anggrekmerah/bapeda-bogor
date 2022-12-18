$(function(){

    $('#tableExtension').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/extension/datatable',
        columnDefs: [
            {"className": "text-center", "targets": 1},
            {"className": "text-center", "targets": 0}
        ]
    })

    $('#discard').click(function(){
        $('#formExtension')[0].reset()
    })

})