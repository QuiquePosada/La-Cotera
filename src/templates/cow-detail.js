import React, { useState, useEffect } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Section from '../components/section'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { graphql } from 'gatsby'

const Detail = ({ pageContext, data }) => {
    const [mobileView, setMobileView] = useState(null)
    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900 ?
                setMobileView(true)
                : 
                setMobileView(false)
        }
        setResponsiveness()
        window.addEventListener("resize", () => setResponsiveness())
    },[])
    
    return (
        <Layout pageContext={pageContext}>
            <Seo title={data.cow.name} lang={pageContext.langKey} description={data.cow.body ? {__html: data.cow.body.body} : null} />
            <div style={mobileView ? null : { marginTop: '64px' }} />
            <Section headerStyle={mobileView ? {paddingTop: '40px'} : null} title={data.cow.name} subtitle={data.cow.sire} description={data.cow.dam ? data.cow.dam.join(", ") : data.cow.dam}>
                <p style={{ paddingLeft: '5em' }} dangerouslySetInnerHTML={data.cow.body ? {__html: data.cow.body.body} : null}></p>
                {/* Gallery */}
                <div style={{ maxWidth: '68em', marginLeft: 'auto', marginRight: 'auto' }}>
                    <GatsbyImage image={data.cow.image.gatsbyImageData} alt={data.cow.image.title} />
                </div>
                {/* Information about the cow */}
                <div style={{padding: 16, textAlign: 'center'}}>
                    <GridList style={{ justifyContent: 'center' }} cellHeight={'auto'} cols={3} spacing={4}>
                        {
                            data.cow.multImg
                            ?
                            data.cow.multImg.map((image) => (
                                <GridListTile numCols={1}>
                                    <GatsbyImage image={image.gatsbyImageData} alt={image.title} />
                                </GridListTile>
                            ))
                            :
                            null
                        }
                    </GridList>
                </div>                
            </Section>
        </Layout>
    )
}

export const query = graphql`
    query($id:String!,$locale:String!){
        cow: contentfulVaca(id: {eq: $id}, node_locale: {eq: $locale}) {
            name
            node_locale
            body {
              body
            }
            dam
            sire
            image {
              gatsbyImageData(placeholder: TRACED_SVG, layout: FULL_WIDTH, aspectRatio: 1.5)
              title
            }
            multImg {
                gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
            }
            mother {
              name
              image {
                gatsbyImageData(placeholder: BLURRED)
                title
              }
            }
        }
    }
`

export default Detail
