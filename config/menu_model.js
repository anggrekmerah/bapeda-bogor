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

    bikinMenu(menus) {
  
        var html = '<ul>'
      
        for (var key in menus) {
          
          if(menus[key].submenu) {
      
            html += '<li>' + menus[key].menu_name + '<ul>' + bikinMenu(menus[key].submenu) + '</ul> </li>'
            
          } else {
      
            html += '<li>' + menus[key].menu_name + '</li>'
      
          }
      
      
        }
      
        html += '</ul>'
      
        return html
      
      }
    
    refactorMenu( callback ) {

        this.getAll( { "table" : "bapenda.m_menu", "id_field" : "parent_id",  "order" : "asc" } ).then( (res) => {
            
            var menus = this.nestedChildren2 (res)

            console.dir(menus, {depth: null})

            return callback(false, menu)
    
        }).catch( (err) => {
            
            return callback(true, err)
    
        })

    }

}