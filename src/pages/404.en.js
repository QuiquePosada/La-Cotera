import React from 'react'
import Layout from '../components/layout'
import Container from '@material-ui/core/Container'
import { Fade } from 'react-awesome-reveal'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

const header = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white'
}

const NotFound = ({ pageContext }) => (
    <Layout pageContext={pageContext}>
        <div style={{ height: '40vh', backgroundColor: 'rgba(0,0,0,0.8)' }} className="overlay bgImgContainer">
            <Container style={header}  >
                <Fade cascade>
                    <h1>Oops! - <i>Site not found</i></h1>
                    <h3>It seems you've wandered into the wrong place. Our cows are friendly, but they can't find the page you're looking for.
                        We apologize for the inconvenience. Please <i>mooo-ve</i> back to our <Link to="/en" style={{ color: '#732F2F' }}>homepage</Link>, explore the website or feel free to contact us.</h3>
                </Fade>
            </Container>
            <StaticImage src='../images/cowTest.jpg'
                className='bgImg'
                placeholder="blurred"
                alt='BgImg1'
                layout="fullWidth"
            />
        </div>
    </Layout>
)

export default NotFound
