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
  }
`

const ContactPage = props => {
  const { data, errors } = props
  const { values, updateValues } = useForm({
    name: '',
    email: '',
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

  if (!page) {
    throw new Error(
      'Missing "Contact" page data. Open the studio at http://localhost:3333 and add "Contact" page data and restart the development server.'
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
          data-netlify="true"
          action="/thankyou"
          onSubmit={useContact}
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
