import {Strategy, StrategyOptions} from 'passport-jwt';
import {ExtractJwt} from 'passport-jwt';
import passport from "passport";
import {UserServiceFactory} from "../../factories/services";
import {IUserDB} from "../../schemas/user";
import '../../auth/strategy/jwtStrategy';


async function validateUser(id: string, done: any): Promise<void> {
    try {
        const service = UserServiceFactory.get('mongodb');
        const user: IUserDB | null = await service.getUser({username: id});
        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
        
    } catch (err) {
        return done(err, false);
    }
}


passport.serializeUser(async function (user: any, done) {
    done(null, user.username);
  });
  
passport.deserializeUser(async function (username: string, done) {
validateUser(username, done);
});

/**
 * @memberof JWTStrategy
 * @type Options of jwt strategy
 */
const opt: StrategyOptions = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'secret'
}
/**
 * @memberof JWTStrategy
 * @description Strategy of jwt in passport
 */
export default new Strategy(opt,
    async function(jwt_payload, done) {
        validateUser(jwt_payload.sub, done);
    });


