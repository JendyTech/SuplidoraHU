"use client"

import { Options } from '@shared/components/Elements/Options'
import { AutoComplete } from '@/shared/components/Form/AutoComplete'


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

      <AutoComplete
        freeOption
        options={[
          {
            label: 'Option 1',
            value: '1'
          },
          {
            label: 'Option 2',
            value: '2'
          }
        ]}
      />
    </>
  )
}