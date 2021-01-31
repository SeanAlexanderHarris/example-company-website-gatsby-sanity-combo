import React from 'react'
import { graphql } from 'gatsby'
import BlockContent from '../components/block-content'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import useForm from '../utils/useForm'
import useContact from '../utils/useContact'

import { responsiveTitle1 } from '../components/typography.module.css'

export const query = graphql`
  query ContactPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)contact/" }) {
      title
      _rawBody
    }
    services: allSanityService {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`

const ContactPage = props => {
  const { data, errors } = props
  const { values, updateValues } = useForm({
    name: '',
    email: '',
    message: '',
    contactNumber: '',
    services: {},
    mapleSyrup: ''
  })

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const page = data.page
  const services = data.services.edges

  if (!page) {
    throw new Error(
      'Missing "Contact" page data. Open the studio at http://localhost:3333 and add "Contact" page data and restart the development server.'
    )
  }

  if (!services) {
    throw new Error(
      'Missing "services" data. Open the studio at http://localhost:3333 and add "Services" data and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO title={page.title} />
      <Container>
        <h1 className={responsiveTitle1}>{page.title}</h1>
        <BlockContent blocks={page._rawBody || []} />

        <form
          name="Contact Form"
          method="POST"
          action="/thankyou"
          onSubmit={event => useContact(event, values)}
        >
          <input type="hidden" name="form-name" value="Contact Form" />
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={'...'}
              value={values.name}
              onChange={updateValues}
            />
          </div>
          <div>
            <label>Your Email:</label>
            <input
              type="email"
              name="email"
              value={'...'}
              value={values.email}
              onChange={updateValues}
            />
          </div>
          <div>
            <label>What's the best number to reach you on?:</label>
            <input
              type="text"
              name="contactNumber"
              value={'...'}
              value={values.contactNumber}
              onChange={updateValues}
            />
          </div>
          <div>
            <label>Message:</label>
            <input
              type="text"
              name="message"
              value={'...'}
              value={values.message}
              onChange={updateValues}
            />
          </div>
          <label>What would you like me to work with you on?</label>
          {services.map(node => (
            <div key={node.node.id}>
              <label>{`Service - ${node.node.title}`}</label>
              <input
                type="checkbox"
                name={`service ${node.node.title}`}
                value={'...'}
                value={values.services}
                onChange={updateValues}
              />
            </div>
          ))}
          <button type="submit">Send</button>
        </form>
      </Container>
    </Layout>
  )
}
ContactPage.defaultProps = {
  data: {
    page: {
      title: 'No title'
    }
  }
}
export default ContactPage
