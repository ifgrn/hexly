const API_URL = import.meta.env.VITE_API_URL

export const addAccountService = async (formData: FormData) => {
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  const nick = formData.get('nick') as string
  const tagLine = formData.get('tagLine') as string
  const server = formData.get('server') as string

  const response = await fetch(`${API_URL}api/v1/accounts/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: "include",
    body: JSON.stringify({ username, nick, tagLine, server, password })
  })

  if (!response.ok) return { data: null, message: "No se pudo realizar la petición" }

  const data = await response.json()

  return data
}
