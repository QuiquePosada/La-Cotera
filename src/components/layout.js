import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Navbar from './navbar'
import Footer from './footer'

const blondin_logo_component = <div style={{ marginLeft: "5px", padding: "5px", background: "white", borderRadius: "5px" }}><StaticImage src="../images/blondin.png" style={{ width: "5vw" }} layout="constrained" alt="blondin-logo" /></div>

/**
 * section data for each language (spanish & english)
 */
const sectionData_es = [
    {
        label: "Nosotros",
        // href: "/us"
        href: "/about"
    },
    {
        label: "Conoce nuestro ganado",
        href: null,
        dropdown: [
            {
                label: "Semen de",
                href: "https://www.blondinsires.com/the-bulls",
                img: blondin_logo_component,
            },
            {
                label: "Ganado",
                href: "/cows"
            },
        ]
    },
    {
        label: "Contáctanos",
        href: "/#contactForm"

    },
]

const sectionData_en = [
    {
        label: "About Us",
        href: "/en/about"

    },
    {
        label: "Get to know our Cattle",
        href: null,
        dropdown: [
            {
                label: "Semen from",
                href: "https://www.blondinsires.com/the-bulls",
                img: blondin_logo_component,
            },
            {
                label: "Cattle",
                href: "/en/cows"

            }
        ]
    },
    {
        label: "Contact Us",
        href: "/en/#contactForm"

    },
]

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#F2F2F2',
        },
        secondary: {
            main: '#732F2F',
        },
    },
})

const Layout = ({ children, pageContext }) => {
    const staticQuery = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)
    const otherLangPath = pageContext.langKey === "es" ? ("/en" + pageContext.slug) : pageContext.slug.slice(3)
    // retrieves the current site by concatenating the 'en' extension if the current language is spanish, or slices the string to delete the 'en' extension for spanish

    return (
        <ThemeProvider theme={theme}>
            <Navbar title={staticQuery.site.siteMetadata.title} otherLangPath={otherLangPath} sectionData={pageContext.langKey === "es" ? sectionData_es : sectionData_en} pageContext={pageContext} />
            <main>
                {children}
            </main>
            <Footer title={staticQuery.site.siteMetadata.title} sectionData={pageContext.langKey === "es" ? sectionData_es : sectionData_en} pageContext={pageContext} />
        </ThemeProvider>
    )
}

export default Layout
