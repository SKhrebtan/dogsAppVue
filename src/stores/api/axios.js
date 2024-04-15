import axios from 'axios'

export const auth = axios.create({
  baseURL: 'https://nest-postgres-dogs.onrender.com/'
})

export const setToken = (token) => {
  auth.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const clearToken = () => {
  auth.defaults.headers.common['Authorization'] = ''
}

export async function signUp(body) {
  const { data } = await auth.post('/user', body)
  console.log(data)
  return data
}

export async function signIn(body) {
  const { data } = await auth.post('/auth/login', body)
  setToken(data.token)
  console.log(data)
  return data
}

export function signOut() {
  clearToken()
  return null
}

export async function getProfile(token) {
  const { data } = await auth.get('/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}
