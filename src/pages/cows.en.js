import React from 'react'
import { graphql } from 'gatsby'
// import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Video from '../components/video'
import CowVideo from '../video/cow.mp4'
import Container from '@material-ui/core/Container'
import Section from '../components/section'
import GridContainer from '../components/GridContainer'
import { Fade } from 'react-awesome-reveal'

const header = {
    display: 'flex', 
    flexDirection: 'column', 
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    textAlign: 'center', 
    // marginTop: '20vh'
}
const mainTitle = {
    fontSize: '4.5em',
    color: 'white',
    margin: 0,
    marginTop: '1em'
}
const mainSubtitle = {
    // fontSize: '1em',
    color: 'white',
    textTransform: 'uppercase'
}

const CowPage = ({ pageContext, data }) => {
    return (
        <Layout pageContext={pageContext} >
            <Seo title={`Cows | ${data.site.siteMetadata.title}`} lang={pageContext.langKey} description={data.markdown.frontmatter.subtitle} />
            {/* Video Bg */}
            <div style={{ minHeight: '40vh', backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center' }} className="overlay bgImgContainer">
                <Container style={header}  >
                    <Fade cascade>
                        <h1 style={mainTitle}>{data.markdown.frontmatter.title}</h1>
                        <h3 style={mainSubtitle}>{data.markdown.frontmatter.subtitle}</h3>
                    </Fade>
                </Container>
                <Video className="bgImg" videoSrcUrl={CowVideo} videoTitle="Eating Cow" />
            </div>
            {/* Content */}
            <Section title={data.markdown.frontmatter.section_1.title} subtitle={data.markdown.frontmatter.section_1.subtitle} description={data.markdown.frontmatter.section_1.description}>
                <GridContainer data={data.data.edges} langSlug={pageContext.slug} requiresPagination />
            </Section>
        </Layout>
    )
}

export const query = graphql`
    {
        data: allContentfulVaca(
            filter: {node_locale: {eq: "en-US"}}
            sort: {fields: createdAt, order: DESC}
        ) {
            edges {
                node {
                    name
                    sire
                    image {
                        gatsbyImageData(
                            layout: CONSTRAINED
                            placeholder: BLURRED
                            resizingBehavior: THUMB
                            aspectRatio: 1.3333
                            width: 600
                            )
                    }
                }
            }
        }
        markdown: markdownRemark(frontmatter: {lang: {eq: "en"}, templateKey: {eq: "cows"}}) {
            frontmatter {
                title
                subtitle
                section_1 {
                    description
                    subtitle
                    title
                }
            }
        }
        site {
            siteMetadata {
                title
            }
        }
    }
`

export default CowPage
