export const MOMENT_FORMAT="YYYY/MM/DD HH:mm"

export const uniqueId=()=>{
  const timestamp=Date.now().toString(36)
  const rdm=Math.random().toString(36).substring(2)
  return `${timestamp}${rdm}`
}

export const setToken=(token)=>{
  window.sessionStorage.setItem('token', token)
}

export const checkToken=()=>{
  const token=window.sessionStorage.getItem('token')
  if(!token){
    window.location.href="/a/b/login"
  }
}
