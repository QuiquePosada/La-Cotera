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
            <Seo />
            <div style={mobileView ? null : { marginTop: '64px' }} />
            <Section headerStyle={mobileView ? {paddingTop: '40px'} : null} title={data.cow.name} subtitle={data.cow.sire} description={data.cow.dam ? data.cow.dam.join(", ") : data.cow.dam}>
                <p>{data.cow.body ? data.cow.body.body : null}</p>
                {/* Gallery */}
                <GatsbyImage image={data.cow.image.gatsbyImageData} /*style={{width: '100%', height: '80vh'}}*/ />
                {/* Information about the cow */}
                <div style={{padding: 16, textAlign: 'center'}}>
                    <GridList cellHeight={260} cols={3} spacing={4}>
                        {/* xs=12, sm=6, rest be 3  */}
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
                
                {console.log("my data\t",data.cow)}
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
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
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
