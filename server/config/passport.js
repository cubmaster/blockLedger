
var LocalStrategy = require('passport-local').Strategy;

var Users =require('mongoose').model('User');
var strategyOptions = {
    usernameField: 'username'
};



exports.login = new LocalStrategy(strategyOptions,function (username, password, done)  {


    Users.findOne({username:username.toLowerCase()})
        .exec(function (err, user) {
            if (err) return done(err);

            if (!user) return done(null, false, {
                message: 'Wrong email/password'
            });

            user.authenticate(password, function (err, isMatch) {
                if (err) return done(err);

                if (!isMatch) return done(null, false, {
                    message: 'Wrong email/password'
                });

                return done(null, user);


            });
        });
});

exports.register = new LocalStrategy(strategyOptions,
    function (username, password, done)
    {


        Users.findOne({username:username.toLowerCase()},
                function (err, user)
                {
                    if (err) return done(err);

                    if (user!=null) return done(null, false, {
                        message: 'User already exists'
                    });

                }
        );


        return done(null,username);

    }
);


