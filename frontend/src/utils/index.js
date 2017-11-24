export const MOMENT_FORMAT="YYYY/MM/DD HH:mm"

export const uniqueId=()=>{
  const timestamp=Date.now().toString(36)
  const rdm=Math.random().toString(36).substring(2)
  return `${timestamp}${rdm}`
}
