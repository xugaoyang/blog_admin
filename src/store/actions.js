export const USERNAME = "USERNAME"

export const username = () => ({ type: USERNAME })

export const GET_USER_BEGIN   = 'GET_USER_BEGIN'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILURE = 'GET_USER_FAILURE'
export const GET_TOKEN = 'GET_TOKEN'


export const getUserBegin = () => ({
  type: GET_USER_BEGIN
})

export const getUserSuccess = username => ({
  type: GET_USER_SUCCESS,
  payload: { username }
})

export const getUserFailure = error => ({
  type: GET_USER_FAILURE,
  payload: { error }
})

export const getToken = token => ({
  type: GET_TOKEN,
  payload: { token }
})
