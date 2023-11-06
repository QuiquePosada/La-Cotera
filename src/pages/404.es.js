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
                    <h1>¡Ups! - <i>sitio no encontrado</i></h1>
                    <h3>Parece que has entrado al lugar equivocado. Nuestras vacas son amables, pero no pueden encontrar la página que estás buscando.
                        Disculpamos por la inconveniencia. Por favor, regresa a nuestra <Link to="/" style={{ color: '#732F2F' }}>página de inicio</Link>, explora el sitio o contactános.</h3>
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
