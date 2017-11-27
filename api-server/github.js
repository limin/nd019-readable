const https = require('https')
const qs = require('qs')

const GTIHUB_CLIENT_ID="30eeb0a3e0a7f806ece1"
const GITHUB_CLIENT_SECRET="ed8d04a0efcd4346829fb15844766e4c236181d3"
const GITHUB_APP_NAME="Readable"

function auth(code){
  return new Promise((res)=>{
    getAccessToken(code).then((token)=>getUser(token)).then((user)=>res(user))
  })
}

//https://github.com/login/oauth/authorize?client_id=30eeb0a3e0a7f806ece1&scope=user
function getAccessToken(code){
  // Build the post string from an object
  const data = qs.stringify({
    'client_id' : GTIHUB_CLIENT_ID,
    'client_secret': GITHUB_CLIENT_SECRET,
    'code': code
  })
  console.log('post data:',data)
  const options = {
    hostname: 'github.com',
    port: 443,
    path: '/login/oauth/access_token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  }

  const promise=new Promise((resolve,reject)=>{
    const req = https.request(options, (res) => {
      console.log('statusCode:', res.statusCode)
      //console.log('headers:', res.headers)
      let body=''
      res.on('data', (d) => {
        body+=d
      })
      res.on('end', () => {
        console.log('body:',body)
        //access_token=94f01039f16bf517e31d61a8d3c34033d9b98c9d&scope=&token_type=bearer
        //error=bad_verification_code&error_description=The+code+passed+is+incorrect+or+expired.&error_uri=https%3A%2F%2Fdeveloper.github.com%2Fv3%2Foauth%2F%23bad-verification-code
        const obj = qs.parse(body)
        if(obj.hasOwnProperty('access_token')){
          resolve(obj.access_token)
        }else{
          reject(obj)
        }
      })
    })

    req.on('error', (e) => {
      console.error(e)
    })
    // post the data
    req.write(data)
    req.end()
  })
  return promise
}

function getUser(token){
  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/user',
    method: 'GET',
    //"Authorization: token 94f01039f16bf517e31d61a8d3c34033d9b98c9d"
    headers: {
      'Authorization': `token ${token}`,
      'User-Agent':GITHUB_APP_NAME
    }
  }
  console.log('getUser options:',options)
  return new Promise((resolve,reject)=>{
    https.get(options,(res)=>{
      //console.log('statusCode:', res.statusCode)
      let body=''
      res.on('data', (d) => {
        body+=d
      })
      res.on('end', () => {
        //console.log('body:',body)
        if(res.statusCode===200){
          const user = JSON.parse(body)
          resolve(user)
        }else{
          reject()
        }
      })
    }).on('error', (e) => {
      console.error(e);
    })
  })
}

module.exports={
  auth
}
