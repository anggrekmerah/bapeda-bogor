$(function(){

    $('#tableGroup').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/group/datatable',
        columnDefs: [
            {"className": "text-center", "targets": 5},
            {"className": "text-center", "targets": 0}
        ]
    })

    $('#discard').click(function(){
        $('#formGroup')[0].reset()
    })

})