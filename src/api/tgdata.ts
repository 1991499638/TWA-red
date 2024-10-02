const axios = require('axios');
let data = JSON.stringify({
  "chat_id": "@redpackage2223"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.telegram.org/bot7342623230:AAFVEUhy25s36PbO2NQA3ANDXNeg4gnXfvk/getChat',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
