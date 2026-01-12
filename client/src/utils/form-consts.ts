export const LoginInputs = [
  {
    placeholder: 'johndoe',
    label: 'Username',
    required: true,
    id: 'username',
    name: 'username',
    type: 'text',
    minLength: 3,
    errorMessage: 'Username must be at least 3 characters long',
  },
  // {
  //   placeholder: 'user@email.com',
  //   label: 'Email',
  //   required: true,
  //   id: 'email',
  //   name: 'email',
  //   type: 'email',
  // },
  {
    placeholder: 'Password',
    label: 'Password',
    required: true,
    id: 'password',
    name: 'password',
    type: 'password',
    minLength: 6,
    errorMessage: 'Password must be at least 6 characters long',
  },
]

export const registerInputs = [
  {
    placeholder: 'johndoe',
    label: 'Username',
    required: true,
    id: 'username',
    name: 'username',
    type: 'text',
    minLength: 3,
    errorMessage: 'Username must be at least 3 characters long',
  },
  {
    placeholder: 'user@email.com',
    label: 'Email',
    required: true,
    id: 'email',
    name: 'email',
    type: 'email',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    errorMessage: 'Please enter a valid email address',
  },
  {
    placeholder: 'Password',
    label: 'Password',
    required: true,
    id: 'password',
    name: 'password',
    type: 'password',
    minLength: 6,
    errorMessage: 'Password must be at least 6 characters long',
  },
  {
    placeholder: 'Confirm Password',
    label: 'Confirm Password',
    required: true,
    id: 'confirm-password',
    name: 'confirm-password',
    type: 'password',
  },
]

export const addAccountInputs = [
  {
    placeholder: 'Hide on bush',
    label: 'GameName',
    required: true,
    id: 'gamename',
    name: 'nick',
    type: 'text',
  },
  {
    placeholder: '#KR1',
    label: 'TagLine',
    required: true,
    id: 'tagline',
    name: 'tagLine',
    type: 'text',
  },
  {
    placeholder: 'KR',
    label: 'Server',
    required: true,
    id: 'server',
    name: 'server',
    type: 'text',
  },
  {
    placeholder: 'midvlad123',
    label: 'Username',
    required: true,
    id: 'username',
    name: 'username',
    type: 'text',
  },
  {
    placeholder: 'password',
    label: 'Password',
    required: true,
    id: 'password',
    name: 'password',
    type: 'password',
  },

]


