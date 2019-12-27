const { User } = require('../models');
const { ExtractJwt, Strategy } = require('passport-jwt');

module.exports = function(passport){
	let jwtOptions = {};
	jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	jwtOptions.secretOrKey = 'catonkeyboard';


	let strategy = new Strategy(jwtOptions, async function(jwt_payload, next) {
		//console.log('payload received', jwt_payload);
		let err, user;
		[err, user] = await User.findById(jwt_payload.id);

		if(err) return done(err, false);
		if(user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	});
	passport.use(strategy);
};