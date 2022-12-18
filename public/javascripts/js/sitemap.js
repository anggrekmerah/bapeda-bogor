$(function(){

    $('#tableSitemap').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/sitemap/datatable',
        columnDefs: [
            {"className": "text-center", "targets": 5},
            {"className": "text-center", "targets": 0}
        ]
    })

    $('#discard').click(function(){
        $('#formSitemap')[0].reset()
    })

})