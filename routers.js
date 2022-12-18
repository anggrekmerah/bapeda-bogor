var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var groupRouter = require('./routes/group');
var menuRouter = require('./routes/menu');
var group_menuRouter = require('./routes/group_menu');
var sitemapRouter = require('./routes/sitemap');

var phone_bookRouter = require('./routes/phone_book');
var black_listRouter = require('./routes/black_list');
var extensionRouter = require('./routes/extension');
var dashboardRouter = require('./routes/dashboard');
var dashboard_agentRouter = require('./routes/dashboard-agent');


module.exports ={
    routes : function (app) {
        app.use('/', indexRouter);
        app.use('/users', usersRouter);
        app.use('/group', groupRouter);
        app.use('/menu', menuRouter);
        app.use('/group-menu', group_menuRouter);
        app.use('/sitemap', sitemapRouter);
        app.use('/phone-book', phone_bookRouter);
        app.use('/black-list', black_listRouter);
        app.use('/extension', extensionRouter);
        app.use('/dashboard', dashboardRouter);
        app.use('/dashboard-agent', dashboard_agentRouter);
    }
} 