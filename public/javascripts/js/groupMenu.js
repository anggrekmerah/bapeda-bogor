function autoSelect(e, id) {
        
    if (e.checked) {
        $('.child_'+id).prop('checked', true)
    } else {
        $('.child_'+id).prop('checked', false)
    }

}

function checkSelect(id) {
    $('#parent_'+id).prop('checked', true)
    
    var is_parent_check = false
    
    $('input:checkbox.child_'+id).each(function () {
        console.log('input:checkbox.child_'+ id +' = '+ this.checked)
        
        if(this.checked) {
            is_parent_check = this.checked
            return false    
        }
        
         
    });

    $('#parent_'+id).prop('checked', is_parent_check)
        

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