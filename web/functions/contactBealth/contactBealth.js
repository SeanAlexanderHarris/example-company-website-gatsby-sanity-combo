exports.handler = async (event, context) => {
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
      body: JSON.stringify({ message: 'Boop beep bop zzzzstt good bye' })
    }
  }
  // Validate the data coming in is correct
  const requiredFields = ['name', 'email']

  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`)
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
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: 'sean.alexander.harris.29@googlemail.com', // Change to your recipient
    from: 'The Bealth Blog <info@chrisbellpt.com>', // Change to your verified sender
    subject: 'Bealthy Blog Enquiry Lead',
    text: 'and easy to do anywhere, even with Node.js',
    html: generateContactEmail(body[name], body[email])
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .then(res => {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success' }),
        response: res
      }
    })
    .catch(error => {
      console.error(error)
    })
}
