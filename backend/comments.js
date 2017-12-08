const clone = require('clone')
const Datastore = require('nedb')
const config = require('./config')
const db = {};
db.comments = new Datastore({filename:`${config.DB_PATH}/comments.db`, autoload: true });

const defaultData = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: {name:'thingtwo'},
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  "8tu4bsun805n8un48ve89": {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: {name:'thingone'},
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  }
}

// Find all documents in the collection
//db.find({}, function (err, docs) {
//});
function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getAll (token) {
  return new Promise((res) => {
    db.comments.find({deleted:false},(err,docs)=>{
      res(docs)
    })
  })
}

function getByParent (token, parentId) {
  return new Promise((res) => {
    db.comments.find({parentId,deleted:false},(err,docs)=>{
      res(docs)
    })
  })
}

function get (token, id) {
  return new Promise((res) => {
    db.comments.findOne({id},(err,doc)=>{
      res(doc)
    })
  })
}

function add (token, comment) {
  return new Promise((res) => {
    const newComment=Object.assign({},comment,{voteScore:1,deleted:false,parentDeleted:false})
    db.comments.insert(newComment,(err,doc)=>{
      res(doc)
    })
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    db.comments.findOne({id},(err,comment)=>{
      let voteScore=comment.voteScore
      switch(option) {
          case "upVote":
              voteScore ++
              break
          case "downVote":
              voteScore --
              break
          default:
              console.log(`comments.vote received incorrect parameter: ${option}`)
      }
      db.comments.update({id},{$set:{voteScore}},{multi:false,returnUpdatedDocs:true},(err,num,affectedDocuments)=>{
        res(affectedDocuments)
      })
    })
  })
}

function disableByParent (token, post) {
    return new Promise((res) => {
      const parentId=post.id
      db.comments.update({parentId},{multi:true,returnUpdatedDocs:true},(err,num,affectedDocuments)=>{
        res(affectedDocuments)
      })
    })
}

function disable (token, id) {
    return new Promise((res) => {
      const deleted=true
      db.comments.update({id},{$set:{deleted}},{multi:false,returnUpdatedDocs:true},(err,num,affectedDocuments)=>{
        res(affectedDocuments)
      })
    })
}

function edit (token, id, comment) {
    return new Promise((res) => {
        db.comments.findOne({id},(err,doc)=>{
          const newComment=Object.assign({},doc,comment)
          db.comments.update({id},newComment,{multi:false,returnUpdatedDocs:true},(err,num,affectedDocuments)=>{
            res(affectedDocuments)
          })
        })
    })
}

module.exports = {
  get,
  getAll,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
}
