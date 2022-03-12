import {Strategy, StrategyOptions} from 'passport-jwt';
import {ExtractJwt} from 'passport-jwt';
import passport from "passport";
import {UserServiceFactory} from "../../factories/services";
import {IUserDB} from "../../schemas/user";
import '../../auth/strategy/jwtStrategy';


function validateUser(id: string, done: any): void {
    try {
        const service = UserServiceFactory.get('mongodb');
        service.getUser({username: id})
        .then((user: IUserDB) => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
        .catch((err: Error) => {
            return done(err, false);
        });

        
    } catch (err) {
        console.log("validateUser", err);
        return done(err, false);
    }
}


passport.serializeUser(function (user: any, done) {
    done(null, user.username);
  });
  
passport.deserializeUser(function (username: string, done) {
    validateUser(username, done);
});

/**
 * @memberof JWTStrategy
 * @type Options of jwt strategy
 */
const opt: StrategyOptions = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_AUTH_SECRET || 'secret'
}
/**
 * @memberof JWTStrategy
 * @description Strategy of jwt in passport
 */
export default new Strategy(opt,
    function(jwt_payload, done) {
        validateUser(jwt_payload.sub, done);
    });


