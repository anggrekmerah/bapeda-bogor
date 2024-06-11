
function showModal(title, body) {
    $('#modalTitle').html(title)
    $('#modalBody').html(body)

    var myModal = new bootstrap.Modal(document.getElementById('modalView'))
    myModal.show()
}

$(function(){

    $('#tableUploadFile').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/upload/datatable',
        // columnDefs: [
        //     {"className": "text-center", "targets": 5},
        //     {"className": "text-center", "targets": 0}
        // ]
    })

    $('#discard').click(function(){
        $('#formUpload')[0].reset()
    })

})