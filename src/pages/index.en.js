import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Section from '../components/section'
import { StaticImage, GatsbyImage } from 'gatsby-plugin-image'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import withStyles from '@material-ui/core/styles/withStyles'
// import Box from '@material-ui/core/Box'
import { Fade } from 'react-awesome-reveal'
import { PhoneRounded } from '@material-ui/icons'
import Map from '../components/mapBox'

/* Styling */
const paper = {
    height: '100%'
}
const header = {
    display: 'flex', 
    flexDirection: 'column', 
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    textAlign: 'center', 
    marginTop: '20vh'
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
const paperImg = {
    borderTopLeftRadius: '4px', 
    borderTopRightRadius: '4px'
}
const paperTitle = {
    fontSize: '1em',
    color: '#732F2F'
}

const link = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#732F2F',
    fontFamily: 'Montserrat',
    textTransform: 'uppercase',
    letterSpacing: '4px',
    fontSize: '1em',
}

const MyTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#732F2F',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#732F2F',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#403E3D',
            },
            '&:hover fieldset': {
                borderColor: '#A6635D',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#732F2F',
            },
        },
    },
})(TextField)

const coordinates = {
    longitude: -100.17505833136873,
    latitude: 20.529340840959442
}

const emailRegexPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/

const IndexPage = ({ pageContext, data }) => {
    const [email,setEmail] = useState("")
    const [messageBody, setMessageBody] = useState("")
    const mapHTML = '<div style="text-align: center"><h1>Sta. Maria La Cotera Farm</h1><h4><a style="color: #732F2F" href="https://goo.gl/maps/i2dZmL4nukFntMNy8">Open in Google Maps</a></h4></div>'
    console.log("page context\t",pageContext)
    return(
        <Layout pageContext={pageContext}>
            <Seo title={`Home | ${data.site.siteMetadata.title}`} />
            <div style={{height: '100vh', backgroundColor: 'rgba(0,0,0,0.45)'}} className='bgImgContainer overlay'>
                <Container style={header} maxWidth='xs' >
                    <Fade cascade>
                        <h1 style={mainTitle}>{data.markdown.frontmatter.title}</h1>
                        <h3 style={mainSubtitle}>{data.markdown.frontmatter.subtitle}</h3>
                    </Fade>
                </Container>
                <StaticImage src='../images/home-screen.jpg' 
                    className='bgImg'
                    placeholder='tracedSVG'
                    alt='BgImg1'
                />
            </div>
            {/* about section */}
            {/* Fade is a div showing in cascade elements within the Grid  */}
            <Fade direction="bottom" triggerOnce>
                <Section title={data.markdown.frontmatter.section_1.title} subtitle={data.markdown.frontmatter.section_1.subtitle} description={data.markdown.frontmatter.section_1.description}>
                    <div style={{ padding: 20}}>
                        <Grid container spacing={5} justify="center" alignItems="stretch">
                                <Grid item xs={12} sm={6} md={4} >
                                    {/* <Fade style={paper} triggerOnce direction="left" > */}
                                        <Paper style={paper}>
                                            <StaticImage src="../images/pasture.jpg" alt="logo" style={paperImg} imgStyle={paperImg} />
                                            <div style={{margin: '0 15px'}}>
                                                <h2 style={paperTitle}>Who are we?</h2>
                                                <p>
                                                    In <em>Santa María La Cotera</em>, we focus on <strong><u>breeding</u></strong>,&nbsp; 
                                                    <strong><u>commercializing</u></strong>, and <strong><u>bringing the best</u></strong> from the&nbsp; 
                                                    most important breeds from dairy cattle
                                                </p>
                                            </div>
                                        </Paper>
                                    {/* </Fade> */}
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} >
                                    {/* <Fade style={paper} triggerOnce direction="left" delay={500}> */}
                                        <Paper style={paper}>
                                            <StaticImage src="../images/enhancedHistory.jpg" alt="logo" style={paperImg} imgStyle={paperImg} />
                                            <div style={{margin: '0 15px'}}>
                                                <h2 style={paperTitle}>Our History</h2>
                                                <p>We have been record breeders since <strong><u>1973</u></strong></p>
                                                <p>
                                                    We have <strong><u>{(new Date().getFullYear()) - (new Date("01/12/2006").getFullYear())}</u></strong>&nbsp;
                                                    years being the best breeder in Mexico
                                                </p>
                                                <Link style={{ textDecoration: 'none', marginBottom: '10px' }} to="/about">
                                                    <Button variant="outlined" color="secondary">
                                                        { data.markdown.frontmatter.section_1.button1_Title }
                                                    </Button>
                                                </Link>
                                            </div>
                                        </Paper>
                                    {/* </Fade> */}
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} >
                                    {/* <Fade style={paper} triggerOnce direction="left" delay={1000}> */}
                                        <Paper style={paper}>
                                            <StaticImage src="../images/cows.jpg" alt="logo" style={paperImg} imgStyle={paperImg} />
                                            <div style={{margin: '0 15px'}}>
                                                <h2 style={paperTitle}>Products and Services Offered</h2>
                                                <p>Importing cattle from the U.S, Canada and other world dairy zones</p>
                                                <p>Importing of embryons and stallions from the best families across North America</p>
                                                <p>Commercialization of mexican cattle</p>
                                                <p>Breeding of cows for exhibition and competition in order to improve genetics in Mexico's dairy cattle</p>
                                            </div>
                                        </Paper>
                                    {/* </Fade> */}
                                </Grid>
                        </Grid>
                    </div>
                </Section>
            </Fade>

            {/* Best Cows */}
            <Fade direction="bottom" triggerOnce>
                <Section title={data.markdown.frontmatter.section_2.title} subtitle={data.markdown.frontmatter.section_2.subtitle} description={data.markdown.frontmatter.section_2.description}>
                    <div style={{ padding: 20 }}>
                        <Grid container spacing={5}>
                            {
                                data.data.edges.map((item) => (
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Link to={`${pageContext.slug}cows/${item.node.name.replace(/\s/g, '_').toLowerCase()}/`}>
                                            {/* this solution is temporary, a slug field will be added to contentful to avoid extra work */}
                                            <GatsbyImage image={item.node.image.gatsbyImageData} alt={item.node.name} imgStyle={{ borderRadius: '5px', height: '100%'}} />
                                            <div>
                                                <h6 style={{ margin: 0, color: '#A6635D', fontFamily: 'Montserrat', marginTop: 5 }}>{item.node.sire}</h6>
                                                <h5 style={{ margin: 0, fontFamily: 'Montserrat', color: '#403E3D', fontSize: '1.5em' }}>{item.node.name}</h5>
                                            </div>
                                        </Link>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </div>
                </Section>
            </Fade>
            
            {/* Contact Form */}
            <Fade direction="bottom" triggerOnce>
                <Section title={data.markdown.frontmatter.contact_info.title} subtitle={data.markdown.frontmatter.contact_info.subtitle} description={data.markdown.frontmatter.contact_info.description}>
                    <div id="contactForm" style={{fontSize: 24, textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
                        <a style={link} href="tel: +52 448 275 08 82">
                            <PhoneRounded fontSize="large" style={{marginRight: 10}} />
                            +52 448 275 08 82
                        </a>
                    </div>
                    {/* <h4>https://goo.gl/maps/i2dZmL4nukFntMNy8 click this for opening on google maps</h4>  */}
                    <Grid container>
                        <Grid item xs={12} sm={6} style={{display: 'flex', flexDirection: 'column'}}>
                            <MyTextField
                                style={{margin: '15px'}}
                                error={!(emailRegexPattern.test(email) || email.length === 0) ? true : false}
                                required
                                id="outlined-error-helper-text"
                                label="Email"
                                // defaultValue="Correo Electrónico (email)"
                                helperText={!(emailRegexPattern.test(email) || email.length === 0) ? "Email address is not on the correct format" : ""}
                                variant="outlined"
                                value={email}
                                onChange={(newText) => setEmail(newText.target.value)}
                            />
                            <MyTextField
                                style={{margin: '15px'}}
                                required
                                id="outlined-textarea"
                                label="Message"
                                // placeholder="Mensaje"
                                multiline
                                rows={4}
                                variant="outlined"
                                value={messageBody}
                                onChange={(newBody) => setMessageBody(newBody.target.value)}
                            />
                            <Button 
                                style={{margin: '10px'}}
                                disabled={email.length > 0 && messageBody.length > 0 && emailRegexPattern.test(email) ? false : true }
                                // variant="outlined"
                                variant="contained" 
                                color="secondary"
                            >
                                Enviar
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Map coordinates={coordinates} html={mapHTML} />
                        </Grid>
                    </Grid>
                </Section>
            </Fade>
        </Layout>
    )
}

export const query = graphql`
    {
        data: allContentfulVaca(
            filter: {node_locale: {eq: "en-US"}, isFeatured: {eq: true}}
            limit: 6
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
        markdown: markdownRemark(frontmatter: {lang: {eq: "en"}, templateKey: {eq: "index"}}) {
            frontmatter {
                title
                subtitle
                section_1 {
                  description
                  subtitle
                  title
                  button1_Title
                }
                section_2 {
                  description
                  subtitle
                  title
                }
                contact_info {
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

export default IndexPage
