function autoSelect(e, id) {
        
    if (e.checked) {
        $('.child_'+id).prop('checked', true)
    } else {
        $('.child_'+id).prop('checked', false)
    }

}

function checkSelect(id) {
    $('#parent_'+id).prop('checked', true)
    
    $('input:checkbox.child_'+id).each(function () {

        if(this.checked){
            return false
        } else 
            $('#parent_'+id).prop('checked', false) 
    });
        

}

$(function(){

    $('#tableGroupMenu').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/group-menu/datatable',
        columnDefs: [
            {"className": "text-center", "targets": 0},
            {"className": "text-center", "targets": 3}
        ]
    })

    $('#discard').click(function(){
        $('#formGroupMenu')[0].reset()
    })

})