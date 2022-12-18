$(function(){

    $('#tableGroupMenu').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/group-menu/datatable',
        columnDefs: [
            {"className": "text-center", "targets": 5},
            {"className": "text-center", "targets": 0}
        ]
    })

    $('#discard').click(function(){
        $('#formGroupMenu')[0].reset()
    })

})