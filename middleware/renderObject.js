
function renderObject(req, res, next) {

    req.renderObjects = { 
        controller:'', 
        title: '', 
        menu: req.menus 
    }

    next()

}

module.exports = {
    renderObjectMiddleware : renderObject
};