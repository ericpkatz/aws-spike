const expect = require('chai').expect;
const smiley = require('./smiley');
const ImageUploader = require('./ImageUploader');
const config = require('./config');

describe('App', ()=> {
  it('can upload images to S3', ()=> {
      //https://s3.amazonaws.com/prof-aws-test/f4bf3378-7458-4f62-b426-ba057d044368.png
      const startsWith = `https://s3.amazonaws.com/${config.get('AWS_BUCKET')}`; 
      const endsWith = 'png';
    return ImageUploader.upload(smiley) 
      .then( url => {
        expect(url.endsWith(endsWith)).to.equal(true)
        expect(url.startsWith(startsWith)).to.equal(true)
      });


  });
});
