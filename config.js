const ENV = process.env.ENV || 'DEV';
try{
  Object.assign(process.env, require('./.env')[ENV]);
}
catch(ex){
  console.log(ex);
}

const get = (key)=> {
  return process.env[key];
}

module.exports = {
  get
};
