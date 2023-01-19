/*!
    * Start Bootstrap - SB Admin v7.0.5 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2022 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
//
var intervalCOunter = {}
var totalSeconds = 0;

function tp(e, ind, se) {
            
    
    var type = $('#'+ind).attr("type");
    
    // console.log(type);
    
    if(type == "password") {
        $( "#"+se ).removeClass("fa-eye-slash");
        $( "#"+se ).addClass("fa-eye");
        $('#'+ind).attr("type","text");

    } else if (type == "text") {

        $( "#"+se ).removeClass("fa-eye");
        $( "#"+se ).addClass("fa-eye-slash");
        $('#'+ind).attr("type","password");

    }

}

(function($) {

    

    $(function() {

        

    });
})(jQuery);


window.addEventListener('DOMContentLoaded', event => {


    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))

    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
    
});
