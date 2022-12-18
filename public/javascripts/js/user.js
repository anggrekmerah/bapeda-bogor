$(function(){

    $('#tableUser').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/users/datatable',
        columnDefs: [
            {"className": "text-center", "targets": 5},
            {"className": "text-center", "targets": 0}
        ]
    })

    $('#discard').click(function(){
        $('#formUser')[0].reset()
    })

})