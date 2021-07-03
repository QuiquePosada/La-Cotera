import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Section from '../components/section'

const Detail = ({ pageContext }) => {
    // const [mobileView, setMobileView] = useState(null)

    // useEffect(() => {
    //     const setResponsiveness = () => {
    //         return window.innerWidth < 900 ?
    //             setState((prevState) => ({ ...prevState, mobileView: true, isHidden: false }))
    //             // setState((prevState) => ({ ...prevState, mobileView: true}))
    //             : 
    //             setState((prevState) => ({ ...prevState, mobileView: false, isHidden: false}))
    //             // perhaps using isHidden inside might when displaying for mobile (if not, return as before )
    //     }
    //     setResponsiveness()
    //     window.addEventListener("resize", () => setResponsiveness())
    // },[])
    return (
        <Layout pageContext={pageContext}>
            <Seo />
            <div style={{ marginTop: '100px' }}>
                <Section title="Cowname" subtitle="sire" description="dam info">
                    {/* Gallery */}
                    {/* Information about the cow */}
                </Section>
            </div>
        </Layout>
    )
}

export default Detail
