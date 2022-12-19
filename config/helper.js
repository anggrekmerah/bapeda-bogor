

module.exports={
    
    MessageSuccess: function (message) {

        return [{
            value:''
           ,msg:message
           ,param:'success'
           ,location:''
        }]

    }

    ,MessageFailed: function (message) {

        return [{
            value:''
           ,msg:message
           ,param:'failed'
           ,location:''
       }]
        
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

  }