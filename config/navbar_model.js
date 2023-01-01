const crud_model = require('./crud_model');

module.exports = class navbar_model extends crud_model  {

    constructor() {
        
        super()
         
    }
    
    nestedChildren2 (menu) {
      
        var out = {};
        
        delete menu.meta
    
        for (const key in menu)        
            out[ 'k' + menu[key].id_menu] = menu[key]
    
        // console.log(out)

        this.nestedChildren3(out)
    
        return out;
    
    }

    nestedChildren3(menu, parentId = '', menuId = '') {

        var lastId = {}
    
        for (const k in menu) {
        
            var pid = ( parentId != '' ) ? 'k' + parentId : 'k' + menu[k].parent_id
            var mid = ( menuId != '' ) ? 'k' + menuId : 'k' + menu[k].id_menu
    
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
      
            html += '<a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts' + menus[key].id_menu + '" aria-expanded="false" aria-controls="collapseLayouts' + menus[key].id_menu + '">'
            
                html += '<div class="sb-nav-link-icon"> <i class="' + menus[key].icon + '"></i></div>' 
                
                    html += menus[key].menu_name
                    
                html += '<div class="sb-sidenav-collapse-arrow"> <i class="fas fa-angle-down"></i></div>'

            html += '</a>'
            
            html += '<div class="collapse" id="collapseLayouts' + menus[key].id_menu + '" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages' + menus[key].id_menu + '">'
            html += '<nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages' + menus[key].id_menu + '">'
            html += this.bikinMenu(menus[key].submenu, true) 
            html += '</nav>'
            html += '</div>'

          } else {
      
            if(isSub) {
                if(menus[key].submenu) {

                    html += '<a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts' + menus[key].id_menu + '" aria-expanded="false" aria-controls="collapseLayouts' + menus[key].id_menu + '" >'
                        html += menus[key].menu_name
                        html += '<div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>'
                    html += '</a>'
                    
                } else {
                    html += '<a class="nav-link" href="'+menus[key].menu_url+'">' + menus[key].menu_name + '</a>'
                }
                
            } else {
                
                html += '<a class="nav-link" href="'+menus[key].menu_url+'"> <div class="sb-nav-link-icon"> <i class="' + menus[key].icon + '"></i></div>' + menus[key].menu_name + '</a>'
            }
            
      
          }
      
      
        }
      
        return html
      
    }

    bikinGroupMenu(menus, isSub = false) {
  
        var html = ''
                        
        for (var key in menus) {
          
            var ischecked = (menus[key].checklist == 'Y') ? 'checked' : ''

          if(menus[key].submenu) {
      
            html += '<li class="list-group-item">'
            
                html += '<div class="form-check">'
                html +=    '<input class="form-check-input" '+ischecked+' name="menu[]" onclick="autoSelect(this, '+menus[key].id_menu+')" type="checkbox" value="'+menus[key].id_menu+'" id="parent_'+menus[key].id_menu+'">'
                html +=    '<label class="form-check-label" for="flexCheckDefault">'
                html +=    menus[key].menu_name
                html +=    '</label>'
                html += '</div>'

                html += '<ul>'
                html += this.bikinGroupMenu(menus[key].submenu, true) 
                html += '</ul>'

            html += '</li>'
            
            

          } else {
      
            var name = (isSub) ? 'child' : 'parent'
            var autoSelect = (isSub) ? 'onclick="checkSelect('+menus[key].parent_id+')"' : 'onclick="autoSelect(this, '+menus[key].id_menu+')"'
            
            html += '<li class="list-group-item">' 
            html += '<div class="form-check">'
            html +=    '<input class="form-check-input '+name+'_'+menus[key].parent_id+'" '+ischecked+' '+autoSelect+'  type="checkbox" name="menu[]" value="'+menus[key].id_menu+'" id="flexCheckDefault">'
            html +=    '<label class="form-check-label" for="flexCheckDefault">'
            html +=    menus[key].menu_name
            html +=    '</label>'
            html += '</div>'
            html += '</li>'
      
          }
      
      
        }
      
        return html
      
    }
    
    refactorMenu( ) {

        return new Promise((resolve, reject) => {

            this.getAll( { "table" : "bapenda.m_menu", "id_field" : "order_menu",  "order" : "asc" } ).then( (res) => {
            
                resolve( this.nestedChildren2 (res) )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }

}