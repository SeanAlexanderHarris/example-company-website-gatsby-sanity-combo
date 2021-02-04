import React from 'react'
import { graphql } from 'gatsby'
import BlockContent from '../components/block-content'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import PeopleGrid from '../components/people-grid'

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }

    page: sanityPage(_id: { regex: "/(drafts.|)about/" }) {
      id
      title
      _rawBody
    }

    people: allSanityPerson {
      edges {
        node {
          id
          image {
            asset {
              _id
            }
          }
          name
          _rawBio
        }
      }
    }
  }
`

const IndexPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const page = data.page
  const personNodes =
    data && data.people && mapEdgesToNodes(data.people).filter(filterOutDocsWithoutSlugs)

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <BlockContent blocks={page._rawBody || []} />
        {personNodes && personNodes.length > 0 && <PeopleGrid items={personNodes} title="People" />}
      </Container>
    </Layout>
  )
}

export default IndexPage
