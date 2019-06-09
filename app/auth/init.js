import passport from 'passport';
import LocalStrategy from 'passport-local';
import to from 'await-to-js';
import mongoose from 'mongoose';
import { LoginStatus } from '../constants';

export default function configurePassport(dbconn) {
    let User = dbconn.model("User")

    let findUser = async params => {
        let [err, user] = await to(User.findOne(params));

        if (err || !user) {
            return null;
        }

        return user;
    }


    passport.use("basic", new LocalStrategy(async (username, password, done) => {
     
        let [err, user] = await to(findUser({ name: username }))
        
        if (err) {
            return done(err, false, { status: LoginStatus.UNKNOWN_ERROR });
        }

        if (!user || !user.validatePassword(password)) {
            return done(null, false, { status: user ? LoginStatus.WRONG_PASSWORD : LoginStatus.USER_NOT_FOUND } );
        }

        done(null, user);
    }))

    passport.serializeUser((user, done) => {
        // console.log("serializing user =>", user._id)
        done(null, user._id)
    })

    passport.deserializeUser(async (serializedUser, done) => {
        let [err, usr] = await to(User.findById(serializedUser))
        // console.log("desirializing user =>", serializedUser)
        done(null, usr)
    })
}