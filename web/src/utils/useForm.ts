import { useState } from 'react'

interface IUseForm {
  name: String
  email: String
  message: String
  contactNumber: String
  mapleSyrup: String
}

export default function useForm(defaults: IUseForm) {
  const [values, setValues] = useState(defaults)

  function updateValues(event: { target: HTMLInputElement }) {
    // check if its a number and convert to string
    let { value, name, type } = event.target

    if (type === 'number') {
      value = `${value}`
    }

    setValues({
      // copy the existing values into it
      ...values,
      // update the new value that changed
      [name]: value
    })
  }

  return { values, updateValues }
}
