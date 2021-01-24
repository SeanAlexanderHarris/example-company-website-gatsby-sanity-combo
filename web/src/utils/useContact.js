export default async function useContact(event, values) {
  event.preventDefault()
  //   setLoading(true)
  //   setError(null)
  //   setMessage('Go eat!')

  // gather all the data
  const body = {
    name: values.name,
    email: values.email,
    mapleSyrup: values.mapleSyrup
  }

  // 4. Send this data to the serverless function when they check out
  const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/contactBealth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  console.log(res)
  // const text = JSON.parse(await res)

  // check if everything worked
  if (res.status >= 400 && res.status < 600) {
    console.log("It didn't work..")
    // setLoading(false) // turn off loading
    // setError(text.message)
  } else {
    console.log('It worked..')
    // it worked!
    // setLoading(false)
    // setMessage('Success! Come on down for your pizza')
  }
}
