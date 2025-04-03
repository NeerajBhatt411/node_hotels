const Person = require("./model/person");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// // passport middleware 

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    try {
        console.log("Received Credentials :", USERNAME, password);
        const user = await Person.findOne({ username: USERNAME })
        if (!user) {
            // done ye 3 parameter leta h error user , info 
            // agar authentication sucessful ho jta h done(eeror ki jagh null , user ki jagah user , )
            // agar authentication fail  ho jta h done(eeror ki jagh null , user ki jagah false ,info mai message dal denge {message: "yxz"} );


            return done(null, false, { message: "Incorrect username" });
        }

        const isPasswordMatch = await user.comparePassword(password);
        // agar password match hota h toh return user 
        if (isPasswordMatch) {
            return done(null, user);

        }
        else {
            return done(null, false, { message: "incorrect password" })

        }

    }
    catch (err) {
        return done(err);

    }

}));


module.exports = passport