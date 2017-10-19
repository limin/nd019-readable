export const config={
  'API_BASE_URL':process.env.REACT_APP_BACKEND?`${process.env.REACT_APP_BACKEND}`:'http://localhost:3001',
  'FETCH_INIT_PARAM':{ headers: { 'Authorization': 'udacity'},credentials: 'include'}
}
