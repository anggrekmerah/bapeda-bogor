$(function(){

    $('#tablePhoneBook').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/phone-book/datatable',
        columnDefs: [
            {"className": "text-center", "targets": 5},
            {"className": "text-center", "targets": 0}
        ]
    })

    $('#discard').click(function(){
        $('#formPhoneBook')[0].reset()
    })

})