import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Section from '../components/section'
import Seo from '../components/seo'
import Container from '@material-ui/core/Container'
import { StaticImage, GatsbyImage } from 'gatsby-plugin-image'
import { Fade } from 'react-awesome-reveal'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

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

const img = {
    height: '60vh',
    margin: 0,
    borderBottomLeft: '100%'
    // backgroundImage: 'radial-gradient(120% 100% at top left,transparent 92%, #fff 92.5%),linear-gradient(135deg, #51a595 0%, #3fcfa2 100%)'
}

const About = ({ pageContext, data }) => {
    const [numCols,setNumCols] = useState(null)

    useEffect(() => {
        const setResponsiveness = () => {
            if (window.innerWidth < 600){
                return setNumCols(1)
            } else if (window.innerWidth < 900){
                return setNumCols(2)
            } else if (window.innerWidth < 1280){
                return setNumCols(3)
            }
            return setNumCols(4)
        }
        setResponsiveness()
        window.addEventListener("resize", () => setResponsiveness())
    },[])

    return (
        <Layout pageContext={pageContext}>
            <Seo title={`Nosotros | ${data.site.siteMetadata.title}`} />
            {/* header */}
            <div style={{height: '40vh', backgroundColor: 'rgba(0,0,0,0.45)'}} className='bgImgContainer overlay'>
                <Container style={header} maxWidth='md' >
                    <Fade cascade>
                        <h1 style={mainTitle}>{data.markdown.frontmatter.title}</h1>
                        <h3 style={mainSubtitle}>{data.markdown.frontmatter.subtitle}</h3>
                    </Fade>
                </Container>
                <StaticImage src='../images/enhancedHistory1.jpg' 
                    className='bgImg'
                    placeholder="blurred"
                    imgStyle={{objectPosition: 'top'}}
                    // placeholder='tracedSVG'
                    alt='BgImg1'
                />
            </div>
            <Section>
                <Grid container>
                    <Grid item sm={4} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <h2 style={{wordWrap: 'break-word', marginLeft: 15, textTransform: 'uppercase'}}>WE FOCUS ON PRODUCING LARGE COWS WITH EXCELLENT MORPHOLOGY, LONGEVES AND ABLE OF PRODUCING LARGE QUANTITIES OF MILK WITH EXCELLENT COMPONENTS</h2>
                        <h2 style={{wordWrap: 'break-word', marginLeft: 15, textTransform: 'uppercase'}}>WE ARE CONCERNED ABOUT THE GENETIC IMPROVEMENT OF THE HOLSTEIN BREED SINCE {(new Date("01/12/1961").getFullYear())} </h2>
                    </Grid>
                    <Grid item sm={8}>
                        <StaticImage src='../images/enhancedHistory2.jpg' 
                            // className='bgImg'
                            style={{...img}}
                            imgStyle={{objectPosition: 'top',borderRadius: '100% 0% 0% 60% / 0% 100% 0% 100%'}}
                            placeholder="blurred"
                            // placeholder='tracedSVG'
                            alt="BgImg2"
                        />
                    </Grid>
                </Grid>
            </Section>
            {/* insert a section about expositions and state carnival/exposition/feria */}
            <Section title={data.markdown.frontmatter.section_2.title} subtitle={data.markdown.frontmatter.section_2.subtitle} description={data.markdown.frontmatter.section_2.description}>
                {/* Use a function window listener for # of cols 4, 2, 1 for mobile */}
                <div style={{padding: 16}}>
                    <GridList cellHeight={260} cols={numCols} spacing={4}>
                        {/* xs=12, sm=6, rest be 3  */}
                        {
                            data.data.edges.map((tile,index) => {
                                const space = Math.random() < 0.15
                                return(
                                    // <GridListTile cols={index % 9 === 0 || index === 0 ? 2 : 1}>
                                    <GridListTile style={{borderRadius: '10px'}} cols={(space || index === 0) && (numCols > 1) ? 2 : 1} >
                                        <GatsbyImage image={tile.node.image.gatsbyImageData} alt={tile.node.name} />
                                    </GridListTile>
                                )
                            })
                        }
                    </GridList>
                </div>
            </Section>
        </Layout>
    )
}

export const query = graphql`
    {
        data: allContentfulVaca(
            filter: {node_locale: {eq: "en-US"}, isHistoric: {eq: true}}
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
                        )
                    }
                }
            }
        }
        markdown: markdownRemark(frontmatter: {lang: {eq: "en"}, templateKey: {eq: "about"}}) {
            frontmatter {
                title
                subtitle
                section_2 {
                    title
                    subtitle
                    description
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

export default About