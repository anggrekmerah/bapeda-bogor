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

(function($) {
    $(function() {
        $("#togglePassword").click(function (e) {
        
            e.preventDefault();
            
            var type = $('#inputPassword').attr("type");
            
            // console.log(type);
            
            if(type == "password") {
                $( "#spanEye" ).removeClass("fa-eye-slash");
                $( "#spanEye" ).addClass("fa-eye");
                $('#inputPassword').attr("type","text");
    
            } else if (type == "text") {
    
                $( "#spanEye" ).removeClass("fa-eye");
                $( "#spanEye" ).addClass("fa-eye-slash");
                $('#inputPassword').attr("type","password");
    
            }
    
        });
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
