import {config} from "../config.js"

const headers={
  'Accept': 'application/json',
  'Authorization': 'udacity'
}

export const fetchPost=(id)=>{
  const postFetcher=fetch(`${config.API_BASE_URL}/posts/${id}`, config.FETCH_INIT_PARAM)
  const commentsFetcher=fetch(`${config.API_BASE_URL}/posts/${id}/comments`, config.FETCH_INIT_PARAM)
  return Promise.all([postFetcher,commentsFetcher]).then(responses=>
      Promise.all([responses[0].json(),responses[1].json()])
    )
}

export const createPost=(post)=>
  fetch(`${config.API_BASE_URL}/posts`, {
    method:"POST",
    headers:{
      ...headers,
      'Content-Type':"application/json"
    },
    body:JSON.stringify(post)
  }).then(res=>res.json())

export const updatePost=(id,post)=>fetch(`${config.API_BASE_URL}/posts/${id}`,{
  method:"PUT",
  headers:{
    ...headers,
    'Content-Type':"application/json"
  },
  body:JSON.stringify(post)
}).then(res=>res.json())

export const deletePost=(id)=>fetch(`${config.API_BASE_URL}/posts/${id}`,{
  method:"DELETE",
  headers:{
    ...headers
  }
})
