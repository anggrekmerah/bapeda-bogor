$(function(){

    $('#tablePhoneBook').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/phone-book/datatable',
        columnDefs: [
            {"className": "text-center", "targets": 0},
            {"className": "text-center", "targets": 6}
        ]
    })

    $('#discard').click(function(){
        $('#formPhoneBook')[0].reset()
    })

})