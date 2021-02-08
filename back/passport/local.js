const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email', //req.body.email
    passwordField: 'password' //req.body.password
  }, async (email, password, done) => {
    //전략 세우자.
    try {
      const user = await User.findOne({
        where: { email }
      });
      if (!user) {
        return done(null, false, { reason: '존재하지 않는 이메일입니다.'}); //done 은 콜백 같은 것.
      }
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        return done(null, user);
      }
      return done(null, false, { reason: '비밀번호가 틀렸습니다.'});
    } catch (error) {
      console.error(error);
      return done(error);
    }
    
  }));
}