
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

	check_method (req) {

		return (req.method == 'POST') ? req.body : req.query

	}

    limit ( request, columns )
	{
		var limit = '';

        var q = this.check_method (request)

		if ( 'start' in q && q['length'] != -1 ) {
			limit = " LIMIT " + parseInt(q['start']) + ", " + parseInt( q['length'] );
		}

		return limit;
	}

    array_search(search, cols) {

        for (const key in cols) {
            
            if(search == cols[key])
                return search

        }

        return 0

    }

    order ( request, columns )
	{
		var order = '';

        var q = this.check_method (request)


		if ( 'order' in q && q['order'].length ) {

			var orderBy = [];

			var dtColumns = this.pluck( columns, 'dt' );

			for ( let i=0; i < q['order'].length ; i++ ) {
				
                // Convert the column index into the column data property
				var columnIdx = parseInt(q['order'][i]['column'])

				var requestColumn = q['columns'][columnIdx];

				columnIdx = this.array_search( requestColumn['data'], dtColumns );
				var column = columns[ columnIdx ];

				if ( requestColumn['orderable'] == 'true' ) {

					var dir = (q['order'][i]['dir'] === 'asc') ? 'ASC' : 'DESC';

					orderBy.push('`' + column['db'] + '` ' + dir)
				}
			}

			if ( orderBy.length > 0 ) {
				order = ' ORDER BY ' + orderBy.join(', ');
			}
		}

		return order;
	}


    filter ( request, columns, bindings = [] )
	{
		var globalSearch = [];
		var columnSearch = [];
		var dtColumns = this.pluck( columns, 'dt' );
        var q = this.check_method (request)

		if ( 'search' in q && q['search']['value'] != '' ) {
			var str = q['search']['value'];

            var ien = q['columns'].length ;

			for ( let i=0;  i < ien ; i++ ) {
				
                var requestColumn = q['columns'][i];
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
		if ( 'columns' in q ) {
			
            var ien = q['columns'].length

            for ( let i=0; i < ien ; i++ ) {
				
                var requestColumn = q['columns'][i];
				var columnIdx = this.array_search( requestColumn['data'], dtColumns );
				var column = columns[ columnIdx ];
				console.log(column)
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
			var r = this.check_method (request)
            // Main query to actually get the data

            var sqlUtama = "SELECT  *, (@nomors := @nomors+1) as nomor FROM (" +query+ ") A , (select @nomors := "+parseInt(r['start'])+") r " + where + order + limit 
            console.log('sqlUtama = ' + sqlUtama)
			console.log(bindings)
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
						console.log(res)
                       var outputs = {	
                            "draw"            : ( 'draw' in r ) ? parseInt( r['draw'] ) : 0,
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

		console.log(typeof a)

		var key = '?';

		a.push (val)

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