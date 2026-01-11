const API_URL = import.meta.env.VITE_API_URL

export const loginHandler = async (formdata: FormData) => {
  const username = formdata.get('username') as string
  const password = formdata.get('password') as string
  const response = await fetch(`${API_URL}api/v1/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: "include",
    body: JSON.stringify({ username, password })
  })

  if (!response.ok) return { data: null, message: "No se pudo realizar la petición" }

  const data = await response.json()


  return data
}

export const signUpHandler = async (formdata: FormData) => {
  const username = formdata.get('username') as string
  const email = formdata.get('email') as string
  const password = formdata.get('password') as string
  const response = await fetch(`${API_URL}api/v1/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: "include",
    body: JSON.stringify({ username, email, password })
  })

  if (!response.ok) return { data: null, message: "No se pudo realizar la petición" }

  const data = await response.json()

  return data
}


export const signoutHandler = async () => {
  const response = await fetch(`${API_URL}api/v1/users/logout`, {
    method: 'POST',
    credentials: "include",
  })

  if (!response.ok) return { data: null, message: "No se pudo realizar la petición" }

  const data = await response.json()

  return data
}



