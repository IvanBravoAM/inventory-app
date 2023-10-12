import bcrypt from 'bcrypt'
import CustomError from "../src/services/CustomError.js";
import EErrors from "../src/services/enum.js";

export class util{
    async sessionValidation(req, res, next){
        if (req.session && req.session.user) {
            next();
        } else {
            res.redirect("/");
        }
    };

    async adminValidation(req, res, next){
        if(req.session.admin){next();}
        else{
            CustomError.createError(
                {name:"Authorization Error",
                cause:"User not admin",
                message:"You are not a system administrator.",
                code: EErrors.INVALID_TYPES_ERROR
            });
        }
    }

    createHash(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    isValidPassword(savedPass, password){
        console.log(bcrypt.compareSync(password, savedPass))
        return bcrypt.compareSync(password, savedPass);
    }

    
}

export const utilInstance = new util();