"use client"
import { SubmitPromiseForm, SubmitHandler } from '@contracts/Form'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { forwardRef } from 'react'
import { useForm as formManager } from '@/hooks/useForm'
import { toast } from 'sonner'
import { FORM_ACTION_TIMEOUT, REDIRECT_TIMEOUT } from '@config/constants'
import { useLoader } from '@/contexts/Loader'

interface Props {
  submit: (params: SubmitHandler<any>) => Promise<Partial<any>>
  manageLoading: boolean
  children: React.ReactNode
  style: React.CSSProperties
  actionTimeout: number
  formProps: React.HTMLProps<HTMLFormElement>
}

const SubmitForm = forwardRef<HTMLFormElement, Readonly<Partial<Props>>>((props, ref) => {
  const router = useRouter()
  const {
    submit = async () => await Promise.resolve({}),
    actionTimeout = FORM_ACTION_TIMEOUT,
    children,
    formProps,
    style,
    manageLoading = true
  } = props

  const { setLoading } = useLoader()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const { getValues, resetForm } = formManager(e)
    const form = e.target as HTMLFormElement
    const data = getValues()
    const inputs = Array.from(form.querySelectorAll('input'))
    const textareas = Array.from(form.querySelectorAll('textarea'))
    const selects = Array.from(form.querySelectorAll('select'))
    const buttons = Array.from(form.querySelectorAll('button'))

    const elements = [...inputs, ...textareas, ...selects, ...buttons]

    elements.forEach((element) => {
      const field = element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      field.disabled = true
    })

    const promise = new Promise((resolve, reject) => {
      if (manageLoading) {
        setLoading(true)
      }
      setTimeout(async () => {
        try {
          const result = await submit({ data, form, reset: resetForm })
          resolve(result)
        } catch (error) {
          reject(error)
        }
      }, actionTimeout)
    })

    promise.then((data: any) => {
      const result = data as SubmitPromiseForm

      if (result.redirect) {
        setTimeout(() => {
          result.redirectWindow
            ? window.location.href = result.redirect as string
            : result.replaceRedirect ? router.replace(result.redirect as string) : router.push(result.redirect as string)
        }, REDIRECT_TIMEOUT)
      }

      if (result.notDisabledFields) {
        elements.forEach((element) => {
          const field = element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
          field.disabled = false
        })
      }

      const formatFinal = () => {
        return result.message.trim().endsWith('.') ? 'Redireccionando...' : '. Redireccionando...'
      }

      if (!result.notMessage) {
        toast.success(result.message + (result.redirect ? formatFinal() : ''))
      }
    })
      .catch((err: any) => {
        elements.forEach((element) => {
          const field = element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
          field.disabled = false
        })
        toast.error(err)
      })
      .finally(() => {
        if (manageLoading) {
          setLoading(false)
        }
      })
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        ...style
      }}
      ref={ref}
      {...formProps}
    >
      {children}
    </form>
  )
})

SubmitForm.displayName = 'SubmitForm'

export { SubmitForm }

export default SubmitForm
