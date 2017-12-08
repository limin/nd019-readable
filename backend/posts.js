const clone = require('clone')
const Datastore = require('nedb')
const config=require('./config')
const db = {};
db.posts = new Datastore({filename:`${config.DB_PATH}/posts.db`, autoload: true });

function getByCategory (token, category) {
  return new Promise((res) => {
    db.posts.find({category,deleted:false},(err,docs)=>{
      res(docs)
    })
  })
}

function get (token, id) {
  return new Promise((res) => {
    db.posts.findOne({id,deleted:false},(err,doc)=>{
      res(doc)
    })
  })
}

function getAll (token) {
  return new Promise((res) => {
    db.posts.find({deleted:false},(err,docs)=>{
      res(docs)
    })
  })
}

function add (token, post) {
  return new Promise((res) => {
    const newPost=Object.assign({},post,{voteScore:1,deleted:false})
    db.posts.insert(newPost,(err,doc)=>{
      res(doc)
    })
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    db.posts.findOne({id},(err,post)=>{
      let voteScore=post.voteScore
      switch(option) {
          case "upVote":
              voteScore ++
              break
          case "downVote":
              voteScore --
              break
          default:
              console.log(`posts.vote received incorrect parameter: ${option}`)
      }
      db.posts.update({id},{$set:{voteScore}},{returnUpdatedDocs:true, multi:false},(err,num,affectedDocuments)=>{
        res(affectedDocuments)
      })
    })
  })
}

function disable (token, id) {
    return new Promise((res) => {
      db.posts.update({id},{$set:{deleted:true}},{returnUpdatedDocs:true, multi:false},(err,num,affectedDocuments)=>{
        res(affectedDocuments)
      })
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
      db.posts.findOne({id},(err,doc)=>{
        let newPost=Object.assign({},doc,post)
        db.posts.update({id},newPost,(err,num,affectedDocuments)=>{
          res(affectedDocuments)
        })
      })
    })
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll
}
