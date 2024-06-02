let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let groupRouter = require('./routes/group');
let menuRouter = require('./routes/menu');
let group_menuRouter = require('./routes/group_menu');
let sitemapRouter = require('./routes/sitemap');

let phone_bookRouter = require('./routes/phone_book');
let black_listRouter = require('./routes/black_list');
let extensionRouter = require('./routes/extension');
let dashboardRouter = require('./routes/dashboard');
let dashboard_agentRouter = require('./routes/dashboard-agent');
let authRouter = require('./routes/auth');
let office_hourRouter = require('./routes/office_hour');
let upload_file = require('./routes/upload_file');

let whatsapp = require('./routes/whatsapp');

let r_abandonRouter = require('./routes/r_abandon');
let r_incomingRouter = require('./routes/r_incoming');
let r_kpiRouter = require('./routes/r_kpi');
let r_outgoingRouter = require('./routes/r_outgoing');
let r_receiveRouter = require('./routes/r_receive');
let r_user_activityRouter = require('./routes/r_user_activity');


module.exports ={
    routes : function (app) {
        app.use('/', authRouter);
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
        app.use('/upload', upload_file);
        // app.use('/whatsapp', whatsapp);

        app.use('/report', r_abandonRouter);
        app.use('/report', r_incomingRouter);
        app.use('/report', r_kpiRouter);
        app.use('/report', r_outgoingRouter);
        app.use('/report', r_receiveRouter);
        app.use('/report', r_user_activityRouter);
    }
} 