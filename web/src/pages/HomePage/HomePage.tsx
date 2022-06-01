import { FieldError, Form, TextField, useForm } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import BatchPriceCell from 'src/components/BatchPriceCell'

interface BatchInfo {
  width: number
  height: number
  quantity: number,
  snapshotID: number,
}

const FORM_DEFAULTS: BatchInfo = {
  width: 1,
  height: 1,
  quantity: 100,
  // hard-coded for now, add flexibility later
  snapshotID: 1,
}

const HomePage = () => {
  const formMethods = useForm()

  const {
    formState: { isValid },
  } = formMethods

  const [batchInfo, setBatchInfo] = useState<BatchInfo>(FORM_DEFAULTS)

  useEffect(() => {
    const sub = formMethods.watch((val, { name }) => {
      if (isValid) {
        setBatchInfo({
          ...batchInfo,
          [name]: Number(val[name]),
        })
      }
    })

    return () => sub.unsubscribe()
  }, [formMethods, batchInfo, isValid])

  return (
    <main className="antialiased flex flex-col text-gray-200 items-center justify-center h-full bg-gray-800">
      <MetaTags title="Home" description="Home page" />
      <div className="flex flex-col">
        <h2 className="text-4xl mb-4">MadStickers Price Calculator</h2>

        <Form config={{ mode: 'onBlur' }} formMethods={formMethods}>
          <div className="flex flex-col lg:flex-row gap-4 max-w-full">
            <label className="flex flex-col" htmlFor="width">
              Width
              <TextField
                className="h-24 text-black text-2xl px-4"
                name="width"
                defaultValue={1}
                step={0.25}
                validation={{
                  required: true,
                  pattern: {
                    value: /^[0-9]*(\.[0-9]{0,2})?$/,
                    message: 'Width must be a number (2 decimals max)',
                  },
                }}
                errorStyle={{ border: '1px solid red' }}
              />
              <FieldError name="width" />
            </label>

            <label className="flex flex-col" htmlFor="height">
              Height
              <TextField
                className="h-24 text-black text-2xl px-4"
                name="height"
                defaultValue={1}
                step={0.25}
                validation={{
                  required: true,
                  pattern: {
                    value: /^[0-9]*(\.[0-9]{0,2})?$/,
                    message: 'Height must be a number (2 decimals max)',
                  },
                }}
                errorStyle={{ border: '1px solid red' }}
              />
              <FieldError name="height" />
            </label>

            <label className="flex flex-col" htmlFor="quantity">
              Quantity
              <TextField
                className="h-24 text-black text-2xl px-4"
                name="quantity"
                defaultValue={100}
                step={50}
                validation={{
                  required: true,
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Quantity must be a whole number',
                  },
                }}
                errorStyle={{ border: '1px solid red' }}
              />
              <FieldError name="quantity" />
            </label>
          </div>
        </Form>
      </div>

      <div>
        Square Footage: <BatchPriceCell input={batchInfo} />
      </div>
    </main>
  )
}

export default HomePage
