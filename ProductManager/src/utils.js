import bcrypt from 'bcrypt'


export class util{
    async sessionValidation(req, res, next){
        if (req.session && req.session.user) {
            next();
        } else {
            res.redirect("/");
        }
    };

    createHash(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    isValidPassword(savedPass, password){
        console.log(bcrypt.compareSync(password, savedPass))
        return bcrypt.compareSync(password, savedPass);
    }
}

export const utilInstance = new util();