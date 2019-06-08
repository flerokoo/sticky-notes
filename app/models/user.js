import mongoose from 'mongoose'
import crypto from 'crypto';

// https://www.freecodecamp.org/news/learn-how-to-handle-authentication-with-node-using-passport-js-4a56ed18e81e/


export function createUserModel(dbconn) {
    
    let schema = mongoose.Schema({
        name: String,
        hash: String,
        salt: String,
    })

    schema.methods.setPassword = function(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    }

    schema.methods.validatePassword = function (password) {
        return this.hash == crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');        
    }

    schema.methods.generateJWT = function() {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);
      
        return jwt.sign({
            email: this.email,
            id: this._id,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, 'secret');
    }
      
    schema.methods.toAuthJSON = function() {
        return {
            _id: this._id,
            email: this.email,
            token: this.generateJWT(),
        };
    };        

    dbconn.model("User", schema)
}