export interface FormInput {
  id: string
  name: string
  type: string
  label: string
  placeholder: string
  required: boolean
  pattern?: string
  minLength?: number
  errorMessage?: string
}

export interface Account {
  id: string
  nickname: string
  tagline: string
  server: string
  tier: string
  rank: string
  wins: number
  losses: number
}
