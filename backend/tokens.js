const nJwt = require('njwt');
const secureRandom = require('secure-random');
const signingKey = secureRandom(256, {type: 'Buffer'}); // Create a highly random byte array of 256 bytes
const users=require('./users')
const TOKEN_TTL=3600*24 //24 hours

/**
{
  iss: string!,
  sub: long!,
  scope: long!,
  iat: json!,
  exp: bool!
}

e.g.
{
"iat": 1434660338,
"exp": 1434663938,
"nbf": 1434663938,
"iss": "http://myapp.com/",
"sub": "users/user1234",
"scope": ["self","admins"]
}
*/

function create(user){
  const {provider,id}=user
  const claims = {
    iss: "https://github.com/limin",  // The URL of your service
    sub: {provider,id},    // The UID of the user in your system
    scope: "self"
  }

  claims.exp=Date.now()/1000+TOKEN_TTL //expired after 1 day
  const jwt = nJwt.create(claims,signingKey);
  const token = jwt.compact();
  return new Promise((res,rej)=>{
    res(token)
  })
}

function verify(token){
  return new Promise((res,rej)=>{
    try{
      const sub=nJwt.verify(token,signingKey).body.sub
      users.findByProviderId(sub.provider,sub.id).then(user=>res(user))    
    }catch(e){
      rej(e)
    }
  })
}

module.exports={
  create,verify
}
