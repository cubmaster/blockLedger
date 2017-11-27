

var path = require('path');

module.exports = function(app)
{
    
    
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        console.log((err.message));
        next(err);
    });
    
    // error handlers
    
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            console.log((err.message));

            res.sendFile(path.join(__dirname, '../../Client/error.html'));
        });
    }
    
    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.sendFile(path.join(__dirname, '../../Client/error.html'));
    });
}