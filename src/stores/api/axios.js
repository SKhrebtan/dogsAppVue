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
  return data
}

export async function signIn(body) {
  const { data } = await auth.post('/auth/login', body)
  setToken(data.token)
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

export async function getAllDogs({ pages = 1, itemsPerPage = 10 }) {
  try {
    const { data } = await auth.get(`/alldogs/pagination?page=${pages}&limit=${itemsPerPage}`)
    return data
  } catch (error) {
    console.log(error.message)
  }
}
export async function getDogs() {
  try {
    const { data } = await auth.get(`/dogs`)
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export async function getOneDog(id) {
  try {
    const { data } = await auth.get(`/alldogs/${id}`)
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export async function getOneMyDog(id) {
  try {
    const { data } = await auth.get(`/dogs/dog/${id}`)
    console.log(data)
    return data
  } catch (error) {
    console.log(error.message)
  }
}
