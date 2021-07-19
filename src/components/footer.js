import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Facebook from '@material-ui/icons/Facebook'

const Footer = ({ sectionData, title, pageContext, otherLangPath }) => {
    /**
     * Footer Component
     *      sectionData : all data used for showing content
     *      pageContext : Contains properties such as lang
     */
    const link = {
        // textDecoration: "none",
        color: 'white',
        fontFamily: 'Montserrat',
        margin: '10px 0',
    }
    return(
        <footer style={{ color: 'white', }}>
            <div style={{ padding: 20 }}>
                <Grid container spacing={5} alignItems="stretch">
                    <Grid item xs={12} md={4}>
                        <Link to={pageContext.langKey === "es" ? "/" : "/en"}>
                            <StaticImage src="../images/logo.jpg" placeholder="blurred" imgStyle={{borderRadius: '5px'}} style={{borderRadius: '5px'}} />
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={4} style={{display: 'flex', flexDirection: 'column'}} justify="center" alignItems="flex-start">
                        { sectionData.map((section,index) => (
                            section.href === null ?
                                section.dropdown.map((subSection,index) => (
                                    <Link key={index} style={{...link,textDecoration: 'none'}} to={subSection.href}>
                                        {subSection.label}  
                                    </Link>
                                ))
                                :
                                <Link key={index} style={{...link,textDecoration: 'none'}} to={section.href}>
                                    {section.label} 
                                </Link>
                        ))}
                    </Grid>
                    <Grid item xs={12} md={4} style={{display: 'flex', flexDirection: 'column'}} justify="center" alignItems="flex-start">                        
                        <a href="/" style={link}>lacotera@live.com.mx</a>
                        <a href="tel: +52 448 275 08 82" style={link}>+52 448 275 08 82</a>
                        <h4 style={{fontFamily: 'Montserrat', margin: '10px 0'}}><em>Autopista Mex-Qro Km. 186, Pedro Escobedo, Querétaro</em></h4>
                        <IconButton href="https://www.facebook.com/santamarialacotera" style={{color: 'white', padding: 0}} aria-label={pageContext.langKey === "es" ? "Siguenos en Facebook" : "Follow us on Facebook"} >
                            <Facebook />
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
            <h4 style={{textAlign: 'center', fontFamily: 'Montserrat'}}>
                © Sta. Maria La Cotera { new Date().getFullYear() }
            </h4>
        </footer>
    )
}

export default Footer
