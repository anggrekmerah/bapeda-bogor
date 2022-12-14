const mariadb = require('mariadb');

const crud_model = require('./crud_model');

module.exports = class menu_model extends crud_model  {

    nestedChildren2 (menu) {
      
        var out = {};
        
        delete menu.meta
    
        for (const key in menu)        
            out[menu[key].id_menu] = menu[key]
    
        this.nestedChildren3(out)
    
        return out;
    
    }

    nestedChildren3(menu, parentId = '', menuId = '') {

        var lastId = {}
    
        for (const k in menu) {
        
            var pid = ( parentId != '' ) ? parentId : menu[k].parent_id
            var mid = ( menuId != '' ) ? menuId : menu[k].id_menu
    
            if( pid != 0 ) {
    
                if( menu[ pid ] != undefined ) {
    
                    if(typeof menu[ pid ]['submenu'] != 'object')
                        menu[ pid ]['submenu'] = {}
        
                    menu[ pid ]['submenu'][ mid ] = menu[k]
                    
                    lastId[mid] = mid
    
                } else {
    
                   for (const j in menu) {
                    
                        if( menu[j].submenu != undefined ) {
    
                            this.nestedChildren3(menu[j].submenu, menu[k].parent_id, menu[k].id_menu)
    
                        }
    
                   }
    
                }
    
            }
             
    
        }
    
        for (const h in lastId) {
            
            delete menu[h]
    
        }
    
        return menu
    
    }

    bikinMenu(menus, isSub = false) {
  
        var html = ''
      
        for (var key in menus) {
          
          if(menus[key].submenu) {
      
            html += '<a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts' + menus[key].id_menu + '" aria-expanded="false" aria-controls="collapseLayouts">'
            
                html += '<div class="sb-nav-link-icon") <i class="' + menus[key].icon + '"></i></div>' 
                
                    html += menus[key].menu_name
                    
                html += '<div class="sb-sidenav-collapse-arrow"> <i class="fas fa-angle-down"></i></div>'

            html += '</a>'
            
            html += '<div class="collapse" id="collapseLayouts' + menus[key].id_menu + '" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">'
            html += '<nav class="sb-sidenav-menu-nested nav">'
            html += this.bikinMenu(menus[key].submenu, true) 
            html += '</nav>'
            html += '</div>'

          } else {
      
            if(isSub) {
                html += '<a class="nav-link" href="index.html">' + menus[key].menu_name + '</a>'
            } else {
                html += '<a class="nav-link" href="index.html"> <div class="sb-nav-link-icon"> <i class="fas fa-tachometer-alt">' + menus[key].menu_name + '</i></div></a>'
            }
            
      
          }
      
      
        }
      
        return html
      
      }
    
    refactorMenu( ) {

        return new Promise((resolve, reject) => {

            this.getAll( { "table" : "bapenda.m_menu", "id_field" : "parent_id",  "order" : "asc" } ).then( (res) => {
            
                resolve( this.nestedChildren2 (res) )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }

}