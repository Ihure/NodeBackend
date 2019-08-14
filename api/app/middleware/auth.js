const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
require('dotenv').config();
import CustomerModel from '../model/customerModel'

let privateKey = process.env.APPKEY;

// verify that token sent by user is valid
passport.use(new JWTStrategy({
	secretOrKey: privateKey,
	jwtFromRequest : extractJWT.fromHeader('user-key')
	// jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken()
}, async  (payload, done) => {
		try {
			let user = await CustomerModel.getUser(payload.id);
			return done(null, user)
		}catch (e) {
			return done(e, false);
		}
}));

