"use client"

import styles from '@shared/styles/components/stepper.module.css'
import CustomButton from '@shared/components/Buttons/CustomButton'
import { Children } from 'react'
import { Icon, IconProps } from '@tabler/icons-react'

type Step = {
  title: string
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>
}

interface StepperProps {
  defaultColor: string
  activeColor: string
  steps: Step[]
  children: React.ReactNode
  active: number
  onChange?: (newIndex: number) => void
  onFinish?: () => void
  lastStepLabel?: string
}

export function Stepper(props: StepperProps) {

  const {
    defaultColor,
    activeColor,
    steps,
    children,
    active,
    onChange,
    onFinish,
    lastStepLabel = "Finalizar"
  } = props


  const childrens = Children.toArray(children).filter((children: any) => {
    return children.type === StepperItem
  })

  const childrenActive = childrens[active] ?? <h1>Implementar</h1>


  const handleNextStep = (e: any) => {
    e.preventDefault();
    const newStep = active + 1
    const isLastStep = newStep > (steps.length - 1)

    if (isLastStep) return onFinish?.()

    onChange?.(newStep)

  }

  const handleBackStep = () => {
    const tryStep = active - 1
    if (tryStep < 0) return
    onChange?.(tryStep)
  }

  return (
    <>
      <header className={styles.container}>
        {
          steps.map((step, index) => (
            <div key={step.title} className={styles.stepContainer} >
              <div className={styles.step} >
                <div className={styles.stepCircle} style={{ backgroundColor: active === index ? activeColor : defaultColor }}>
                  <step.icon className={styles.stepIcon} color={active === index ? "white" : activeColor} />
                </div>
                <p className={styles.stepTitle} > {step.title} </p>
              </div>
              {index < steps.length - 1 && <hr className={styles.stepDivider} style={{ backgroundColor: active === 0 ? defaultColor : active > index ? activeColor : defaultColor }} />}
            </div>
          ))
        }
      </header>

      <form className={styles.stepItemContainer} onSubmit={handleNextStep} >
        {childrenActive}
        <div className={styles.actionsContainer}>
          {
            active > 0 && <CustomButton
              onClick={handleBackStep}
              text='Atrás'
              style="filled"
              styles={{ width: "200px" }} />
          }
          <CustomButton
            buttonType='submit'

            text={active === steps.length - 1 ? lastStepLabel : "Siguiente"}
            style="filled"
            styles={{ width: "200px" }} />
        </div>
      </form>
    </>
  )
}



export function StepperItem({ children }: { children?: React.ReactNode }) {
  return (
    <article
      className={styles.stepperItem}
    >
      {children}
    </article>
  )
}
