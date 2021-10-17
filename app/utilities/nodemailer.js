const nodemailer = require('nodemailer');

 var code = null
class sendbymail {
  getMailMessage = () => {
 
      code = Math.random().toString(21).substring(3, 17)  

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user:  'cmdshakeel21@gmail.com',
          pass: 'sdb21051998 ',
        },  

      });
      
      let mailOptions = {
        from:'cmdshakeel21@gmail.com',
        to: 'cmdshakeel3377@gmail.com' ,
        subject: 'Fundoo notes Password / resetpass testing',
        text: code
      };

      transporter.sendMail(mailOptions, function (error, data) {
        if (error) {
          console.log("Errorr " + error);     
        } else {
          console.log("Email sent successfully");
        }
      });
  }


  passcode = (data)=>{
    if(data == code){
      console.log("correct-code");
      return "true"
    }else{
      console.log("wrong-code")
      return "false"
    }
  }
   
}
module.exports = new sendbymail()
