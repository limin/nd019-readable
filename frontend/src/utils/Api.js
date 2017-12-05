import {config} from "../config.js"

export const loadData=()=>{
  const categoryFetcher=fetch(`${config.API_BASE_URL}/categories`, config.FETCH_INIT_PARAM)
  const postFetcher=fetch(`${config.API_BASE_URL}/posts`, config.FETCH_INIT_PARAM)
  const commentsFetcher=fetch(`${config.API_BASE_URL}/comments`, config.FETCH_INIT_PARAM)

  return Promise.all([categoryFetcher,postFetcher,commentsFetcher]).then(responses=>{
    return Promise.all([responses[0].json(),responses[1].json(),responses[2].json()]).then(values=>{
      return {
        categories:values[0].categories,
        posts:values[1],
        comments:values[2],
      }})
  })
}

export const fetchPost=(id)=>{
  const postFetcher=fetch(`${config.API_BASE_URL}/posts/${id}`, config.FETCH_INIT_PARAM)
  const commentsFetcher=fetch(`${config.API_BASE_URL}/posts/${id}/comments`, config.FETCH_INIT_PARAM)
  return Promise.all([postFetcher,commentsFetcher]).then(responses=>
      Promise.all([responses[0].json(),responses[1].json()])
    )
}

export const fetchComment=(id)=>
  fetch(`${config.API_BASE_URL}/comments/${id}`,config.FETCH_INIT_PARAM).then(res=>res.json())

export const fetchUser=(token)=>{
  return fetch(`${config.API_BASE_URL}/me`,{
      headers:{
        ...config.FETCH_INIT_PARAM,
        'Authorization':token
      }
  }).then(
    res=>{
      const user=res.json()
      return user
    }
  )
}



export const createPost=(post)=>
  fetch(`${config.API_BASE_URL}/posts`, {
    method:"POST",
    headers:{
      ...config.FETCH_INIT_PARAM.headers,
      'Content-Type':"application/json"
    },
    body:JSON.stringify(post)
  }).then(res=>res.json())

export const updatePost=(id,post)=>fetch(`${config.API_BASE_URL}/posts/${id}`,{
  method:"PUT",
  headers:{
    ...config.FETCH_INIT_PARAM.headers,
    'Content-Type':"application/json"
  },
  body:JSON.stringify(post)
}).then(res=>res.json())

export const deletePost=(id)=>fetch(`${config.API_BASE_URL}/posts/${id}`,{
  method:"DELETE",
  headers:{
    ...config.FETCH_INIT_PARAM.headers,
  }
})

export const createComment=(comment)=>
  fetch(`${config.API_BASE_URL}/comments`, {
    method:"POST",
    headers:{
      ...config.FETCH_INIT_PARAM.headers,
      'Content-Type':"application/json"
    },
    body:JSON.stringify(comment)
  }).then(res=>res.json())

export const updateComment=(id,comment)=>fetch(`${config.API_BASE_URL}/comments/${id}`,{
  method:"PUT",
  headers:{
    ...config.FETCH_INIT_PARAM.headers,
    'Content-Type':"application/json"
  },
  body:JSON.stringify(comment)
}).then(res=>res.json())

export const deleteComment=(id)=>fetch(`${config.API_BASE_URL}/comments/${id}`,{
  method:"DELETE",
  headers:{
    ...config.FETCH_INIT_PARAM.headers,
  }
}).then(res=>res.json())

export const votePost=(id,up)=>fetch(`${config.API_BASE_URL}/posts/${id}`,{
  method:"POST",
  headers:{
    ...config.FETCH_INIT_PARAM.headers,
    'Content-Type': "application/json"
  },
  body:JSON.stringify({option:up?"upVote":"downVote"})}
).then(res=>res.json())

export const voteComment=(id,up)=>fetch(`${config.API_BASE_URL}/comments/${id}`,{
  method:"POST",
  headers:{
    ...config.FETCH_INIT_PARAM.headers,
    'Content-Type': "application/json"
  },
  body:JSON.stringify({option:up?"upVote":"downVote"})}
).then(res=>res.json())
