export const config={
  'API_BASE_URL':`${process.env.REACT_APP_BACKEND}`,
  'FETCH_INIT_PARAM':{ headers: { 'Authorization': 'udacity'},credentials: 'include'}
}
