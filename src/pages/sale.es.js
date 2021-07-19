import React from 'react'
import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Video from '../components/video'
import CowVideo from '../video/cow.mp4'
import Container from '@material-ui/core/Container'
import GridContainer from '../components/GridContainer'
import Section from '../components/section'
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
}
const mainSubtitle = {
    // fontSize: '1em',
    color: 'white',
    textTransform: 'uppercase'
}

const Sale = ({ pageContext, data }) => {

    return (
        <Layout pageContext={pageContext} >
            <Seo title={`Ganado en Venta | ${data.site.siteMetadata.title}`} lang={pageContext.langKey} description={data.markdown.frontmatter.subtitle} />
            {/* Video Bg */}
            <div style={{ height: '40vh', backgroundColor: 'rgba(0,0,0,0.6)' }} className="overlay bgImgContainer">
                <Container style={header}  >
                    <Fade cascade>
                        <h1 style={mainTitle}>{data.markdown.frontmatter.title}</h1>
                        <h3 style={mainSubtitle}>{data.markdown.frontmatter.subtitle}</h3>
                    </Fade>
                </Container>
                <Video className="bgImg" videoSrcUrl={CowVideo} videoTitle="Eating Cow" />
            </div>
            {/* Content */}
            {
                data.data.edges.length > 0
                ?
                <Section title={data.markdown.frontmatter.section_1.title} subtitle={data.markdown.frontmatter.section_1.subtitle} description={data.markdown.frontmatter.section_1.description}>
                    <GridContainer data={data.data.edges} langSlug={pageContext.slug} requiresPagination />
                </Section>
                :
                <Section subtitle="Por ahora no tenemos ganado en venta" title="Te invitamos a estar al pendiente, ó a contactarnos para recibir más información">
                    <div style={{ textAlign: 'center' }}>
                        <a style={{ visibility: 'hidden', display: 'none' }} href="https://storyset.com/work" aria-label="Work illustrations by Storyset">Work illustrations by Storyset</a>
                        <StaticImage placeholder="tracedSVG" height={400} alt="No Data" src="../images/Empty-pana.png" />
                    </div>
                </Section>
            }
        </Layout>
    )
}

export const query = graphql`
    {
        data: allContentfulVaca(
            filter: {node_locale: {eq: "es-MX"}, onSale: {eq: true}}
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
        markdown: markdownRemark(frontmatter: {lang: {eq: "es"}, templateKey: {eq: "sale"}}) {
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

export default Sale
