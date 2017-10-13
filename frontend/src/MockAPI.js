const data={
  categories:{
    java:{
      name: 'java',
      path: 'java'
    },
    javascript:{
      name: 'javascript',
      path: 'javascript'
    },
    python:{
      name: 'python',
      path: 'python'
    }
  },
  posts:{
    "8xf0y6ziyjabvozdd253nd": {
      id: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1467166872634,
      title: 'Using values from a list as a case in a switch/case statement',
      body: 'I have an ArrayList which has the following Strings in it: [name, age, gender, salary]. Is there a way I can use the values in my ArrayList to be case expressions? The obvious answer would be no, since case expressions must be constant expressions. However, I am wondering what the best way to do this would be if I can't use switch/case.',
      author: 'user8543721',
      category: 'java',
      voteScore: 2,
      deleted: false
    },
    "6ni6ok3ym7mf1p33lnez": {
      id: '6ni6ok3ym7mf1p33lnez',
      timestamp: 1468479767190,
      title: "Image click fadeout won't load the next image",
      body: "I'm trying to write a callback function that fadein the next image after fadeout the old one. But it seems like I can fadeout the image but I only fadein the old image instead of the new one. I think the first $(#image) will be the old one, but I don't know why it's still the old image after I reset its attr. The same thing happens in the caption too.",
      author: 'Z.Chen',
      category: 'javascript',
      voteScore: -5,
      deleted: false
    }
  },
  comments:{
    "894tuq4ut84ut8v4t8wun89g": {
      id: '894tuq4ut84ut8v4t8wun89g',
      parentId: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1468166872634,
      body: "If you really want to use a switch case and can't use non-native java objects, I would try something along the lines of this:...",
      author: 'luckydog32',
      voteScore: -6,
      deleted: false,
      parentDeleted: false
    },
    "8tu4bsun805n8un48ve89": {
      id: '8tu4bsun805n8un48ve89',
      parentId: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1469479767190,
      body: 'I believe you can do something like this. Assign each value to a variable then use the variables as your cases.',
      author: 'Hayden Passmore',
      voteScore: 5,
      deleted: false,
      parentDeleted: false
    }
  },
}

export const getCategories=()=>{
  return new Promise(function(resolve){
    resolve(data.categories);
  });
}

export const getPosts=()=>{
  return new Promise(function(resolve){
    resolve(data.posts);
  });
}

export const getComments=()=>{
  return new Promise(function(resolve){
    resolve(data.comments);
  });
}

export const upVotePost=(id)=>{
  let post=data.posts[id]
  post.voteScore++
  return new Promise(function(resolve){
    resolve(post)
  });
}

export const downVotePost=(id)=>{
  let post=data.posts[id]
  post.voteScore--
  return new Promise(function(resolve){
    resolve(post)
  });
}

export const upVoteComment=(id)=>{
  let comment=data.comments[id]
  comment.voteScore++
  return new Promise(function(resolve){
    resolve(comment)
  });
}

export const downVotePost=(id)=>{
  let comment=data.comments[id]
  comment.voteScore--
  return new Promise(function(resolve){
    resolve(comment)
  });
}

export const addPost=(post)=>{
  post.voteScore=0
  post.timestamp=Date.now()
  post.deleted=false
  data.posts[post.id]=post
  return new Promise(function(resolve){
    resolve(post)
  });
}

export const addComment=(comment)=>{
  comment.voteScore=0
  comment.timestamp=Date.now()
  comment.deleted=false
  comment.parentDeleted=false
  data.comments[comment.id]=comment
  return new Promise(function(resolve){
    resolve(comment)
  });
}

export const updatePost=(post)=>{
  data.posts[post.id]=post
  return new Promise(function(resolve){
    resolve(post)
  });
}

export const updateComment=(comment)=>{
  data.comments[comment.id]=comment
  return new Promise(function(resolve){
    resolve(comment)
  });
}

export const deletePost=(post)=>{
  data.posts[post.id].deleted=true
  data.comments.forEach((comment)=>{
    if(comment.parentId===post.id){
      comment.parentDeleted=true
    }
  })
}

export const deleteComment=(comment)=>{
  data.comments[comment.id].deleted=true;
}