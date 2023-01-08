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
var authRouter = require('./routes/auth');
var office_hourRouter = require('./routes/office_hour');

var r_abandonRouter = require('./routes/r_abandon');
var r_incomingRouter = require('./routes/r_incoming');
var r_kpiRouter = require('./routes/r_kpi');
var r_outgoingRouter = require('./routes/r_outgoing');
var r_receiveRouter = require('./routes/r_receive');
var r_user_activityRouter = require('./routes/r_user_activity');


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
        app.use('/auth', authRouter);
        app.use('/office-hour', office_hourRouter);

        app.use('/report', r_abandonRouter);
        app.use('/report', r_incomingRouter);
        app.use('/report', r_kpiRouter);
        app.use('/report', r_outgoingRouter);
        app.use('/report', r_receiveRouter);
        app.use('/report', r_user_activityRouter);
    }
} 