import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { slide as BurgerMenu } from 'react-burger-menu'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import IconButton from '@material-ui/core/IconButton'
import Facebook from '@material-ui/icons/Facebook'
import './styles/navbar.css'

const Navbar = (props) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [state, setState] = useState({ mobileView: null, drawerOpen: false, isHidden: true })
    const { mobileView, isHidden } = state

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900 ?
                setState((prevState) => ({ ...prevState, mobileView: true, isHidden: false }))
                // setState((prevState) => ({ ...prevState, mobileView: true}))
                : 
                setState((prevState) => ({ ...prevState, mobileView: false, isHidden: false}))
                // perhaps using isHidden inside might when displaying for mobile (if not, return as before )
        }
        setResponsiveness()
        window.addEventListener("resize", () => setResponsiveness())
    },[])

    /* For animation in navbar */
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: props.window ? window() : undefined
    })

    /* styling */
    const appBar = {
        backgroundColor: trigger ? "#732F2F" : "transparent",
        // color: trigger ? "white" : "black",
        transition: trigger ? "0.3s" : "0.5s",
        boxShadow: "none",
        // padding: "10px 0px"
    }
    const link = {
        textDecoration: "none"
    }

    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const displayDesktop = () => {
        const getMenuButtons = () => (
            props.sectionData.map((section, index) => (
                section.href === null ?
                    <div key={index}>
                        <Button color="primary" onClick={handleClick}>
                            { section.label }
                        </Button>
                        <Menu 
                            id="dropdown"
                            open={Boolean(anchorEl)} 
                            keepMounted
                            onClose={handleClose} 
                            anchorEl={anchorEl}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                              }}
                        >
                            { section.dropdown.map((subSection,index) =>(
                                <MenuItem key={index} component={Link} to={subSection.href} onClick={handleClose}>
                                   { subSection.label }
                                   { subSection?.img }
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                :
                    <Link style={link} key={index} to={section.href}>
                        <Button color="primary">
                            { section.label }
                        </Button>
                    </Link>
            ))
        )
        return (
            <Toolbar style={{ justifyContent: 'space-between', zIndex: 10 }}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Link style={link} to={props.pageContext.langKey === "es" ? "/" : "/en"}>
                        <Button 
                            color="primary" 
                            size="large" 
                            disableRipple disableFocusRipple disableTouchRipple 
                            style={{ margin: 0, padding: '0 15px', fontSize: '24px'}}
                        >
                            {props.title}
                        </Button>
                    </Link>
                    { getMenuButtons() }
                </div>
                <div>
                    <Link to={props.pageContext.langKey === "en" ? props.otherLangPath : props.pageContext.slug} className="langBtn">
                        <Button color="primary" >
                            <strong>ES 🇲🇽</strong>
                        </Button>
                    </Link>
                    <Link to={props.pageContext.langKey === "es" ? props.otherLangPath : props.pageContext.slug} className="langBtn">
                        <Button color="primary">
                            <strong>EN 🇺🇸</strong>
                        </Button>
                    </Link>
                    <IconButton href="https://www.facebook.com/santamarialacotera" style={{color: 'white'}} aria-label={props.pageContext.langKey === "es" ? "Siguenos en Facebook" : "Follow us on Facebook"} >
                        <Facebook />
                    </IconButton>
                </div>
            </Toolbar>
        )
    }

    const displayMobile = () => {
        const getMenuButtons = () => (
            props.sectionData.map((section, index) => (
                section.href === null ?
                    <div key={index}>
                        <MenuItem className="mobileItem" color="primary" onClick={handleClick}>
                            { section.label }
                        </MenuItem>
                        <Menu 
                            id="dropdown"
                            open={Boolean(anchorEl)} 
                            keepMounted
                            onClose={handleClose} 
                            anchorEl={anchorEl}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                              }}
                        >
                            { section.dropdown.map((subSection,index) =>(
                                <MenuItem key={index} component={Link} to={subSection.href} onClick={handleClose}>
                                    { subSection.label }
                                    { subSection?.img }
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                :
                    <MenuItem className="mobileItem" key={index} component={Link} to={section.href}>
                        { section.label }
                    </MenuItem>
            ))
        )
        return (
            <BurgerMenu disableAutoFocus lang={props.pageContext.langKey}>
                { getMenuButtons() }
                <IconButton href="https://www.facebook.com/santamarialacotera" style={{color: '#A6837B'}} aria-label={props.pageContext.langKey === "es" ? "Siguenos en Facebook" : "Follow us on Facebook"} >
                    <Facebook />
                </IconButton>
                <div className="mobileItem">
                    <MenuItem className="langBtn" component={Link} to={props.pageContext.langKey === "en" ? props.otherLangPath : props.pageContext.slug}>
                        <strong>ES 🇲🇽</strong>
                    </MenuItem>
                    <MenuItem className="langBtn" component={Link} to={props.pageContext.langKey === "es" ? props.otherLangPath : props.pageContext.slug}>
                        <strong>EN 🇺🇸</strong>
                    </MenuItem>
                </div>
                <MenuItem style={{textTransform: 'uppercase', fontSize: '1.5em'}} className="mobileItem" component={Link} to={props.pageContext.langKey === "es" ? "/" : "/en"}>
                    {props.title}
                </MenuItem>
            </BurgerMenu>
        )
    }

    const displayNavbar = () => {
        if (mobileView != null){
            return mobileView === true ? displayMobile() : displayDesktop()
        }
    }

    return(
        <header>
            <AppBar hidden={isHidden} style={appBar}>
                { displayNavbar() }
                {/* { mobileView ? displayMobile() : displayDesktop() } */}
            </AppBar>
        </header>
    )
}

export default Navbar
