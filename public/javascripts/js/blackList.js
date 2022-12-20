$(function(){

    $('#tableBlackList').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/black-list/datatable',
        columnDefs: [
            {"className": "text-center", "targets": 0},
            {"className": "text-center", "targets": 1}
        ]
    })

    $('#discard').click(function(){
        $('#formBlackList')[0].reset()
    })

})