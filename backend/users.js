const Datastore=require('nedb')
const config=require('./config')
const db={}
db.users=new Datastore({filename:`${config.DB_PATH}/users.db`,autoload:true})

/**
{
  "provider":"github",
  "login": "limin",
  "id": 23356,
  "avatar_url": "https://avatars1.githubusercontent.com/u/23356?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/limin",
  "html_url": "https://github.com/limin",
  "name": "Min Li",
  "location": null,
  "email": null,
  "bio": null,
}
*/

function create(user){
  return new Promise((res,rej)=>{
    const {provider,id}=user
    db.users.update({provider, id},user,{returnUpdatedDocs:true, multi:false, upsert:true},(err, numAffected, affectedDocuments, upsert)=>{
      if(err){
        rej(err)
      }else{
        res(affectedDocuments)
      }
    })
  })
}

function findByProviderId(provider, id){
  return new Promise((res,rej)=>{
    db.users.findOne({provider, id},(err,doc)=>{
      if(err){
        rej(err)
      }else{
        res(doc)
      }
    })
  })
}

function update(user){
  return new Promise((res,rej)=>{
    db.users.update({_id:user._id},user,{returnUpdatedDocs:true},(err, numAffected, affectedDocuments, upsert)=>{
      if(err){
        rej(err)
      }else if(affectedDocuments.length==1){
        res(affectedDocuments[0])
      }else{
        rej()
      }
    })
  })
}

module.exports={
  create,findByProviderId,update
}
