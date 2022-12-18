var menuClass = require('../config/navbar_model')

const createMenu = async (req, res, next) => {

    const classMenus = new menuClass()

    var refactorMenu = await classMenus.refactorMenu()

    req.menus = classMenus.bikinMenu(refactorMenu)

    next()
}

module.exports = {
    menuMiddleware : createMenu
};
