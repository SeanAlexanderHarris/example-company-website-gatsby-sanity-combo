import React from 'react'
import { graphql } from 'gatsby'
import BlockContent from '../components/block-content'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import OrderStyles from '../components/OrderStyles'
import useForm from '../utils/useForm'

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
  const { values, updateValue } = useForm({
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
        <OrderStyles>
          <fieldset>
            <legend>Your Info</legend>
            <label htmlFor="name">
              Name
              <input
                type="text"
                name="name"
                id="name"
                value={'...'}
                value={values.name}
                onChange={updateValue}
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                id="email"
                value={'...'}
                value={values.email}
                onChange={updateValue}
              />
            </label>
            <label htmlFor="message">
              How do you want me to help?
              <input
                type="text"
                name="message"
                id="message"
                value={'...'}
                value={values.message}
                onChange={updateValue}
              />
            </label>
          </fieldset>
          <fieldset>
            <div aria-live="polite" aria-atomic="true">
              {error ? <p>Error: {error}</p> : ''}
            </div>
            <button type="submit">Get in touch</button>
          </fieldset>
        </OrderStyles>
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
