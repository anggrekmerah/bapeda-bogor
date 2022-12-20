$(function(){

    $('#tableMenu').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/menu/datatable',
        columnDefs: [
            {"className": "text-center", "targets": 0},
            {"className": "text-center", "targets": 8}
        ]
    })

    $('#discard').click(function(){
        $('#formMenu')[0].reset()
    })

})