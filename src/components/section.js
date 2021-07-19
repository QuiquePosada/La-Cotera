import React from 'react'
// import PropTypes from 'prop-types'
// import Box from '@material-ui/core/Box'
// import { Fade } from 'react-awesome-reveal'

/* styling */
const section = {
    margin: '15px 0',
    backgroundColor: '#F2F2F2',
    borderRadius: '4px'
}
const titleStyle = {
    color: '#403E3D',
    fontFamily: 'Montserrat',
    textTransform: 'capitalize',
    margin: 0,
}
const subtitleStyle = {
    color: '#732F2F',
    fontFamily: 'Montserrat',
    textTransform: 'uppercase',
    letterSpacing: '4px',
    fontSize: '1em',
    margin: 0
}
const descriptionStyle = {
    fontFamily: 'Dancing Script',
    color: '#6C757D',
    margin: 0
}
const header = {
    // padding: '10px 0',
    textAlign: 'center'
}

const Section = ({ children, title, subtitle, description, headerStyle }) => (
    <div style={section}>
        <div style={title === null ? {...header, ...headerStyle} : {...header,padding: '10px 0', ...headerStyle}}>
            {/* <Fade cascade direction="up" triggerOnce style={{ textAlign: 'center' }}> */}
                <h3 style={subtitleStyle}>{subtitle}</h3>
                <h2 style={titleStyle}>{title}</h2>
                <h4 style={descriptionStyle}>{description}</h4>
            {/* </Fade> */}
        </div>
        { children }
    </div>
)

Section.defaultProps = {
    title: null,
    subtitle: null,
    description: null,
    headerStyle: null
}

export default Section
