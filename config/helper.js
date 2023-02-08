

module.exports={
    
    MessageSuccess: function (message) {

        return [{
            value:''
           ,msg:message
           ,param:'success'
           ,location:''
        }]

    }
    ,btnEdit: function(url) {
        return ' <a href="'+url+'" class="btn btn-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="left" title="Edit"><i class="fas fa-edit"></i></a> '
    }

    ,btnDelete: function(url) {
        return ' <a href="'+url+'" class="btn btn-danger btn-sm " data-bs-toggle="tooltip" data-bs-placement="right" title="Delete"><i class="fas fa-trash-alt"></i></a> '
    }
    
    ,btnBlackList: function(url) {
        return '    <a href="'+url+'" class="btn btn-warning btn-sm " data-bs-toggle="tooltip" data-bs-placement="right" title="Black List"><i class="fas fa-phone-slash"></i></a> '
    }

    ,isArray: function(a) {
        return (!!a) && (a.constructor === Array);
    }

    ,dateNow: function(){

        var d = new Date()
        
        let ank = d.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
        console.log('date now')
        console.log(ank)
        let curdateL = ank.slice(0,10).split('/')
        let m = (curdateL[1] < 10) ? '0'+curdateL[1] : curdateL[1]
        let da = (curdateL[0] < 10) ? '0'+curdateL[0] : curdateL[0]

        let curdate = curdateL[2].trim().split(' ')[0] + '-' + m + '-' + da

        return curdate
    }

    ,convertDate: function(d){

        var d = new Date(d)
        
        let ank = d.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

        let curdateL = ank.slice(0,10).split('/')

        let m = (curdateL[1] < 10) ? '0'+curdateL[1] : curdateL[1]
        let da = (curdateL[0] < 10) ? '0'+curdateL[0] : curdateL[0]


        let curdate = curdateL[2].trim().split(' ')[0] + '-' + m + '-' + da

        return curdate
        
    }

    ,MessageFailed: function (message) {

        return [{
            value:''
           ,msg:message
           ,param:'failed'
           ,location:''
       }]
        
    }
    ,checkAccessPage: async function(req, models){
        // console.log(req)
        var d = await models.execQuery( 'select can_select, can_delete, can_insert, can_update from m_group_menu where id_group=? and id_menu=?' ,[req.id_group, req.id_menu])  
        
        delete d.meta

        if(d) {
            
            for (const key in d) {

                if(d[key]['can_select'] == 'N'){
                    return false
                }

            }
            
        }

        return d[0]

    }
    ,flashMessage: async function(req, models, defaultObject){
        
        var q = req.query

        if('id' in q){

            var d = await models.getDataById(q.id)  
            
            if(d) {
                
                req.renderObjects.dataUpdate = d[0]
            }

        } else {
            
            req.renderObjects.dataUpdate = defaultObject
        
        }

        var resultMessage = (req.session.resultMessage) ? req.session.resultMessage : '' 

        delete req.session.resultMessage

        if(req.session.dataUpdate)
            delete req.session.dataUpdate

        var alert = ''

        if (resultMessage != '') {

            for (const key in resultMessage) {
                
                if (resultMessage[key].param == 'success') {
                
                    alert += '<div class="alert alert-success d-flex align-items-center" role="alert">'
                    alert += '<i class="fas fa-check me-1"></i>'
                    alert += '<div>'
                    alert += resultMessage[key].msg
                    alert += '</div>'
                    alert += '</div>'
                
                } else {
                    alert += '<div class="alert alert-danger d-flex align-items-center" role="alert">'
                    alert += '<i class="fas fa-exclamation-triangle me-1"></i>'
                    alert += '<div>'
                    alert +=  resultMessage[key].msg
                    alert += '</div>'
                    alert += '</div>'
                }

            }

        }

        return alert

    }
    , dashboardAgent: function (params) {
        
        var html = ''

        var status = (params.active_login == 'Y') ? 'AVAILABLE' : 'UNAVAILABLE';
        
        var status_incall = (params.in_call == 'Y') ? 'IN CAll' : 'IDLE';
            status_incall = (params.active_login == 'N') ? 'OFF' : status_incall

        var border_disable = (params.active_login == 'Y') ? 'primary' : 'disable'
        var image_disable = (params.active_login == 'Y') ? '' : '-webkit-filter: grayscale(100%); filter: grayscale(100%);' 

        var lineBotom = (params.active_login == 'Y') ? 'dark' : 'disable'
        var buttonDisable = (params.in_call == 'Y') ? '' : 'disabled="disabled"'
        var buttonBg = (params.active_login == 'Y') ? 'warning' : 'secondary'
        var statusBg = (params.active_login == 'Y') ? 'primarys' : 'secondary'

        html += '<div class="row border pt-2 mt-1" id="cardAgent_'+params.extension+'">'
        html += '    <div class="col-md-3 d-flex justify-content-center pb-2">'
        html += '        <div id="borderAgent_'+params.extension+'" class="rounded-circle overflow-hidden border border-'+border_disable+'  border-5" style="width:80px; height: 80px">'
        html += '            <img id="imageAgent_'+params.extension+'" src="/images/user-photo/'+params.photo+'" class="img-cover" style="width:80px; height: 80px '+image_disable+'"></img>'
        html += '        </div>'
        html += '    </div>'
        html += '    <div class="col-md-9 ps-2">'
        html += '        <table class="table table-borderless table-sm" cellspacing="0" cellpadding="0">'
        html += '            <tr>'
        html += '                <td>'+params.first_name+' '+params.last_name+''
        html += '                <span id="statusAgent_'+params.extension+'" class="badge bg-'+statusBg+' float-end">'+status+'</span>  '
        html += '                </td>'
        html += '            </tr>    '
        html += '            <tr> '
        html += '                <td> ( Extension ) '+params.extension+'' 
        html += '                    <span id="callsTakenAgent_'+params.extension+'" class="badge bg-'+statusBg+' ms-1 float-end">Calls taken <span id="totalCallsTakenAgent_'+params.extension+'" class="badge bg-warning text-dark" > '+params.total_receive+'</span></span>'
        html += '                </td>'
        html += '            </tr>'
        html += '        </table>'
        html += '    </div>'
        html += '    <div id="lineBottomAgent_'+params.extension+'" class="col-md-12 bg-'+lineBotom+' d-flex bd-highlight ">'
        html += '        <div class="p-2 flex-fill bd-highlight">'
        html += '            <span id="statusInCallAgent_'+params.extension+'" class="badge rounded-pill bg-'+buttonBg+' text-dark">'+status_incall+'</span> '
        html += '        </div>'
        html += '        <div class="p-2 flex-fill bd-highlight"> '
        html += '            <span class="ms-1 text-light" id="durationAgent_'+params.extension+'">'
        html += '               <label id="hours_'+params.extension+'">00</label>:<label id="minutes_'+params.extension+'">00</label>:<label id="seconds_'+params.extension+'">00</label>'
        html += '            </span> '
        html += '        </div>'
        // html += '        <div class="p-2 flex-fill bd-highlight">'
        // html += '            <span class="ms-1 text-light" id="takeCallAgent_'+params.extension+'">082122071292</span> '
        // html += '        </div>'
        html += '        <div class="p-2 flex-fill bd-highlight">'
        html += '            <button id="btnBargeAgent_'+params.extension+'" class="btn btn-'+buttonBg+' btn-sm float-end ms-1" '+buttonDisable+' >Barge</button> '
        html += '            <button id="btnWishpAgent_'+params.extension+'" class="btn btn-'+buttonBg+' btn-sm float-end ms-1" '+buttonDisable+' >Whisp</button> '
        html += '            <button id="btnSpyAgent_'+params.extension+'" class="btn btn-'+buttonBg+' btn-sm float-end ms-1" '+buttonDisable+' >Spy</button> '
        html += '        </div>'
        html += '    </div>'
        
        if (params.in_call == 'Y' && 'incall_datetime' in params) {

            var date1 = new Date(); // current date
            var date2 = new Date(params.incall_datetime); // mm/dd/yyyy format
            var timeDiff = Math.abs(date2.getTime() - date1.getTime()); // in miliseconds
            var timeDiffInSecond = Math.ceil(timeDiff / 1000); // in second


            html += '<input type="hidden" name="listExtActiveCall[]" value="'+params.extension+'|'+timeDiffInSecond+'">'
        }

        html += '</div>'

        return html
        
    }

  }