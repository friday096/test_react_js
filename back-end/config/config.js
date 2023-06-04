var config = {

  //Local DB Credetinals
  db: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vetrine',
  },
  //Live DB Creditionals
  // db: {
  //     host: 'localhost',
  //     user: 'vetrine',
  //     password: 'Vetrine2023@',
  //     database: 'vetrine',
  //   },
  // smtp_data:{
  //     host: "smtp.example.com",
  //     port: 587,
  //     secure: false, // upgrade later with STARTTLS
  //     service: 'gmail',
  //     auth: {
  //       user: "username",
  //       pass: "password",
  //     },
  // },

  smtp_data: {
    service: 'gmail',
    port: 465,
    auth: {
      user: 'username',
      pass: 'password',
    },
    tls: {
      rejectUnauthorized: false
    }
  },
  from_email: 'info@vetrine.com',
  // base_url: 'http://localhost:3000', //local
  // base_url: 'http://164.68.108.74', //live
  base_url: 'http://streaming-eye.com', //live


};


module.exports = config;