$(function(){

    $('#tableExtension').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/extension/datatable',
        columnDefs: [
            {"className": "text-center", "targets": 0},
            {"className": "text-center", "targets": 4}
        ]
    })

    $('#discard').click(function(){
        $('#formExtension')[0].reset()
    })

})