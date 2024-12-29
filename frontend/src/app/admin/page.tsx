"use client"

import { Options } from '@shared/components/Elements/Options'
export default function AdminPage() {
  return (
    <>
      <Options
        data={{ id: 1 }}
        options={[
          {
            type: "button",
            text: "Edit",
            handler: () => alert('Hola mundo')
          }
        ]}
      />
    </>
  )
}