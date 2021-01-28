exports.handler = async (event, context) => {
  console.log('EVENT', event)

  function generateContactEmail(name, emailAddress) {
    return `<div>
    <h2>You've got an enquiry lead from the blog </h2>
    <p>Get in touch with ${name} at ${emailAddress} pronto hombre..</p>
    <p>Best Regards,</p>
    <p>The Bealth Blog Robot</p>
  </div>`
  }

  const body = JSON.parse(event.body)
  // Check if they have filled out the honeypot
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Boop beep bop zzzzstt good bye..' })
    }
  }
  // Validate the data coming in is correct
  const requiredFields = ['name', 'email']

  for (const field of requiredFields) {
    console.log(`Validating ${field} : ${body[field]} is truthy..`)
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field..`
        })
      }
    }
  }

  // send the email
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`)
  const msg = {
    to: 'sean.alexander.29@icloud.com', // Change to your recipient
    from: 'sean.alexander.harris.29@googlemail.com', // Change to your verified sender
    subject: 'Bealthy Blog Enquiry Lead',
    text: 'and easy to do anywhere, even with Node.js',
    html: generateContactEmail(body['name'], body['email'])
  }

  console.log(msg)

  const response = await sgMail.send(msg)

  if (response.status >= 400 && response.status < 600) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' }),
      rawResponse: response
    }
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failure' }),
      rawResponse: response
    }
  }
}
