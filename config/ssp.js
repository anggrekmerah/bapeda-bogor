const mariadb = require('mariadb');
const crud_model = require('./crud_model');

module.exports = class ssp extends crud_model {

    constructor() {
        
        super()
         
    }

    data_output(columns, data){

        var out = []

        var ien = data.length

        for (let i = 0; i < ien; i++) {

            var row = []

            for (let j = 0; j < columns.length; j++) {
                
                var column = columns[j]

				// Is there a formatter?
				if ( 'formatter' in column  ) {
                    if( column['db'] == ''){
                        row.push(column['formatter']( data[i] ))
                    }
                    else{
                        row.push(column['formatter']( data[i][ column['db'] ], data[i] ))
                    }
				}
				else {
                    if(column['db'] != ''){
                        row.push( data[i][ columns[j]['db'] ])
                    }
                    else{
                        row.push("");
                    }
				}
                
            }

            out.push(row)
            
        }


        return out;

    }

    limit ( request, columns )
	{
		var limit = '';

		if ( 'start' in request && request['length'] != -1 ) {
			limit = "LIMIT " + parseInt(request['start']) + ", " + parseInt( request['length'] );
		}

		return limit;
	}

    array_search(search, cols) {

        for (const key in cols) {
            
            if(key == cols[key])
                return key

        }

        return 0

    }

    order ( request, columns )
	{
		var order = '';

		if ( 'order' in request && count($request['order']) ) {

			var orderBy = [];

			var dtColumns = this.pluck( columns, 'dt' );

			for ( let i=0; i < request['order'].length ; $i++ ) {
				
                // Convert the column index into the column data property
				var columnIdx = parseInt(request['order'][i]['column'])

				var requestColumn = request['columns'][columnIdx];

				columnIdx = this.array_search( requestColumn['data'], dtColumns );
				var column = columns[ columnIdx ];

				if ( requestColumn['orderable'] == 'true' ) {

					var dir = (request['order'][i]['dir'] === 'asc') ? 'ASC' : 'DESC';

					orderBy.push('`' + column['db'] + '` ' + $dir)
				}
			}

			if ( orderBy.length > 0 ) {
				order = 'ORDER BY ' + orderBy.join(', ');
			}
		}

		return order;
	}


    filter ( request, columns, bindings = '' )
	{
		var globalSearch = [];
		var columnSearch = [];
		var dtColumns = this.pluck( columns, 'dt' );

		if ( 'search' in request && request['search']['value'] != '' ) {
			var str = request['search']['value'];

            var ien = request['columns'].length ;

			for ( let i=0;  i < ien ; i++ ) {
				
                var requestColumn = request['columns'][i];
				var columnIdx = this.array_search( requestColumn['data'], dtColumns );
				var column = columns[ columnIdx ];

				if ( requestColumn['searchable'] == 'true' ) {
					if(column['db'] != ''){
						var binding = this.bind( bindings, '%' + str + '%', 'string' );
						globalSearch.push("`" + column['db'] + "` LIKE " + binding);
					}
				}
			}
		}

		// Individual column filtering
		if ( 'columns' in request ) {
			
            var ien = request['columns'].length

            for ( let i=0; i < ien ; i++ ) {
				
                var requestColumn = request['columns'][i];
				var columnIdx = this.array_search( requestColumn['data'], dtColumns );
				var column = columns[ columnIdx ];

				var str = requestColumn['search']['value'];

				if ( requestColumn['searchable'] == 'true' && str != '' ) {
					if(column['db'] != ''){
						var binding = this.bind( bindings, '%' + $str + '%', 'string' );
						columnSearch.push("`" + $column['db'] + "` LIKE " + binding)
					}
				}
			}
		}

		// Combine the filters into a single string
		var where = '';

		if ( globalSearch.length > 0 ) {
			where = '(' + globalSearch.join(' OR ') + ')';
		}

		if ( columnSearch.length ) {
			where = (where === '') ? columnSearch.join(' AND ') : where + ' AND ' + columnSearch.join(' AND ');
		}

		if ( where !== '' ) {
			where = 'WHERE ' + where;
		}

		return where;
	}

    simple ( query, request, primaryKey, columns )
	{
        return new Promise((resolve, reject) => {

            var bindings = [];
            
            // Build the SQL query string from the request
            var limit = this.limit( request, columns );
            var order = this.order( request, columns );
            var where = this.filter( request, columns, bindings );

            // Main query to actually get the data

            var sqlUtama = "SELECT  *, (@nomors := @nomors+1) as nomor FROM (" +query+ ") A " + where + order + limit + " , (select @nomors := 0) r"
            // console.log('sqlUtama = ' + sqlUtama)
            this.execQuery(sqlUtama, bindings).then( (res) => {
                // console.log(res)
                // Data set length after filtering
                var sqlFilter = "SELECT COUNT(*) as total_filter FROM  (" + query +") A " + where
                
                this.execQuery( sqlFilter, bindings).then( (resFilter) => {

                    
                    var recordsFiltered = resFilter[0]['total_filter'];

                    // Total data set length
                    this.execQuery( "SELECT COUNT(*) as total FROM ("+query+") A " ).then((resTotal) => {

                        var recordsTotal = resTotal[0]['total'];

                        /*
                        * Output
                        */
                       var outputs = {	
                            "draw"            : ( 'draw' in request ) ? parseInt( request['draw'] ) : 1,
                            "recordsTotal"    : parseInt( recordsTotal ),
                            "recordsFiltered" : parseInt( recordsFiltered ),
                            "data"            : this.data_output( columns, res )
                        }

                        resolve(outputs )
                        
                    }).catch((errTotal) => {
                        reject(errTotal)
                    })
                    

                }).catch((errFilter) => {
                    reject(errFilter)
                })
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
		
	}


    fatal ( msg )
	{
		return {"error" : msg}
	}

    bind ( a = [], val, type )
	{
		var key = ':binding_'.a.length;

		a.push ({ 
			'key'  : key,
			'val'  : val,
			'type' : type
        })

		return key;
	}

    pluck ( a, prop )
	{
		var out = [];

        var len = a.length

		for ( let i=0; i < len ; i++ ) {
            
            if(a[i][prop] == ''){
                continue;
			}

			//removing the $out array index confuses the filter method in doing proper binding,
			//adding it ensures that the array data are mapped correctly
			out[i] = a[i][prop];
		}

		return out;
	}

    _flatten ( a, join = ' AND ' )
	{
		if ( ! a ) {
			return '';
		}
		else if ( a && typeof a == 'object' ) {
			return a.join( join );
		}
		return a;
	}

}