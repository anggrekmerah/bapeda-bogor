$(function(){

    $('#tableBlackList').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/black-list/datatable',
        columnDefs: [
            {"className": "text-center", "targets": 5},
            {"className": "text-center", "targets": 0}
        ]
    })

    $('#discard').click(function(){
        $('#formBlackList')[0].reset()
    })

})