'use strict';
module.exports = function (app) {

    app.setValue = app.set.bind(app);

    app.getValue = function (path) {
        return app.get(path);
    };

    require('./app-variables')(app);
    require('./static-middleware')(app);
    require('./parsing-middleware')(app);

    app.use(app.getValue('log'));
 //    app.use(function (req, res, next) {

 //    res.setHeader('Access-Control-Allow-Origin', 'http://www.facebook.com');

 //    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

 //    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

 //    res.setHeader('Access-Control-Allow-Credentials', true);
 //    	next();
	// });

    require('./authentication')(app);
};