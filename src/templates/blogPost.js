/** @jsx jsx */
import { jsx } from '@emotion/core'
import { graphql } from 'gatsby'

import Layout from '../components/layout.js'
import SEO from '../components/seo.js'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.excerpt} />
      <h1 css={{ marginBottom: '0px' }}>{frontmatter.title}</h1>
      <p>
        <small>
          <i>
            {frontmatter.date} &raquo; {markdownRemark.timeToRead} min read
          </i>
        </small>
      </p>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        excerpt
      }
    }
  }
`
