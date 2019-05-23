const AWS = require('aws-sdk');
const config = require('./config');
const uuid = require('uuid');
const credentials = {
  AWS_ACCESS_KEY_ID: config.get('AWS_ACCESS_KEY_ID'),
  AWS_SECRET_ACCESS_KEY: config.get('AWS_SECRET_ACCESS_KEY'),
};
console.log(credentials);
const S3 = new AWS.S3(credentials);

const upload = (data)=> {
  const regex = new RegExp(/^data:image\/(\w+);.*/);
  const extension = regex.exec(data)[1];
  const buffer = new Buffer(data.replace(/^data:image\/\w+;base64,/, ""),'base64')
  const bucket = config.get('AWS_BUCKET');
  const key = `${uuid()}.png`;
  var data = {
    Key: key, 
    Body: buffer,
    ContentEncoding: 'base64',
    ContentType: 'image/png',
    ACL: 'public-read',
    Bucket: bucket
  };
  return S3.putObject(data)
    .promise()
    .then(()=> {
      return `https://s3.amazonaws.com/${bucket}/${key}`;
    })
};

module.exports = {
  upload
};
