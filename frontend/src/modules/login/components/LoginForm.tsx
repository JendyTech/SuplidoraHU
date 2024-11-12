"use client"

import SubmitForm from '@/shared/components/Logic/Form'
import { useLogin } from '@modules/login/useLogin'

export function LoginForm() {
  const { submit } = useLogin()

  return (
    <SubmitForm
      submit={submit}
    >
      <input type="email" name="email" />
      <input type="password" name="password" />
      <button type="submit">Login</button>
    </SubmitForm>
  )
}