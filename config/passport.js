const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./database');

module.exports = function(passport){
	let jwtOptions = {};
	jwtOptions.jwtFromRequest = ExtractJwt.fromHeader('authorization');
	jwtOptions.secretOrKey = config.secret;

	passport.use(new JwtStrategy(jwtOptions, function(payload, done){
		User.getUserById(payload._doc._id, (err, user) => {
			if(err){return done(err, false);
			}
			if(user){
				return done(err, user);
			} else {
				return done(null, false);
			}
		});
	}));
}