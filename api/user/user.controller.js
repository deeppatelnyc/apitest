const {
    create,
    checkEmail
  } = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");

const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
});
let IS_SPAM_ALLOW = true;

  module.exports = {
    createUser: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);

      var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
      var isEmailValid = emailRegex.test(body.email);

      if(isEmailValid){
        checkEmail(body.email, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection errror"
            });
          }
          if(!results || IS_SPAM_ALLOW){
            create(body, (err, results) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  success: 0,
                  message: "Database connection errror"
                });
              }
              let datetime = new Date();
              return res.status(201).json({
                success: true,
                time: datetime,
                data: results
              });
            });
          }
          
          if(results && !IS_SPAM_ALLOW) {
            return res.status(406).json({
              success: false,
              data: "Email Already Exist"
            });
          }
          
        });
      }

      if(!isEmailValid){
        return res.status(406).json({
          success: false,
          message: "Email Pattern Error"
        });
      }
      
    },

    checkId: (req, res) => {
      const body = req.body;
      checkEmail(body.email, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        if(!results){
          return res.status(404).json({
            success: false,
            data: "Not Found"
          });
        }
        
        if(results) {
          return res.status(201).json({
            success: true,
            data: results
          });
        }
        
      });
    },
    
  };