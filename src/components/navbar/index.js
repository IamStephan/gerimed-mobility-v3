import React, { useState, useEffect } from 'react'

// Hooks
import { useMedia, useLocalStorage } from 'react-use'
import { useScrollData } from 'scroll-data-hook'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'

// Components
import Drawer from '../drawer'

// Material
import { Button, IconButton } from '@material-ui/core'
import { ShoppingCartOutlined, AccountCircleOutlined, Menu } from '@material-ui/icons'

// State
import { dispatch } from '../../state/navbar'

// Constants
import { PAGES } from '../../constants/pages'
import { MODE } from '../../constants/navbar'
import { KEYS } from '../../constants/localStorage'
import { NAV_BAR_ACTIONS } from '../../constants/state'

// Styles
import styles from './styles.module.scss'

const PEEK_HIDE_TRIGGER_DISTANCE = 250

/**
 * NOTE:
 * =====
 * Use this to prevent the entire nav tree from
 * rerendering on every frame
 * 
 * (Should test if this is realy the case)
 */

const DummyScrollDetector = props => {
  const {
    setPeekHide,
    peekHide,
    navMode
  } = props

  /**
   * NOTE:
   * =====
   * Handles navbar peeking and modifies it
   */
  const {
    direction,
    relativeDistance
  } = useScrollData()

  
  useEffect(() => {
    // For scrolling Down
    if(
      (direction.y === 'down' && !peekHide) &&
      (relativeDistance.y > PEEK_HIDE_TRIGGER_DISTANCE) &&
      (navMode === MODE.normal)
    ) {
      setPeekHide(true)
      dispatch({
        type: NAV_BAR_ACTIONS.hideNavbarpeek
      })
    }

    // For scrolling up
    if(
      (direction.y === 'up' && peekHide) &&
      (relativeDistance.y > PEEK_HIDE_TRIGGER_DISTANCE) &&
      (navMode === MODE.normal)
    ) {
      setPeekHide(false)
      dispatch({
        type: NAV_BAR_ACTIONS.peekNavbar
      })
    }

    // Safety Check
    if(peekHide && MODE.normal !== navMode) {
      setPeekHide(false)
      dispatch({
        type: NAV_BAR_ACTIONS.peekNavbar
      })
    }

  }, [relativeDistance])

  return null
}

const NormalButton = props => {
  const {
    navMode,
    active
  } = props

  const shouldBePrimary = (navMode === MODE.trans || active)
  
  const buttonStyle = shouldBePrimary ? '' : styles['button']

  return (
    <Button
      disableElevation
      component={Link}
      color={shouldBePrimary ? 'primary' : 'inherit'}
      className={`${styles['normalButton']} ${buttonStyle}`}
      {...props}
    >
      {props.children}
    </Button>
  )
}

/**
 * TODO:
 *  - convert css animation to js (flip toolkit?)
 *  - Create a seperate component for the mobile drawer
 *  - move the icons to the drawer on mobile deviecs
 */

 /**
  * Declaring this here since the component
  * will not have the value on initial load
  */
const BREAKPOINT_TWO = 750

const Navbar = props => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: {eq: "site/logo.png"}) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          } 
        }
      }
    }
  `)

  const {
    page,
    navMode
  } = props

  const [token] = useLocalStorage(KEYS.jwt)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [peekHide, setPeekHide] = useState(false)

  const breakpointTwo = useMedia(`(max-width: ${BREAKPOINT_TWO}px)`)

  return (
    <>
      <DummyScrollDetector
        setPeekHide={setPeekHide}
        peekHide={peekHide}
        navMode={navMode}
      />
      <nav
        className={`${styles['navbar']} ${styles[navMode]} ${peekHide ? styles['peek'] : null}`}
      >
        <div
          className={styles['container']}
        >
          <div
            className={styles['logo']}
          >
            <Link
              to='/'
            >
              <Img
                className={styles['img']}
                objectFit='contain'
                objectPosition='left center'
                fluid={data.file.childImageSharp.fluid}
                alt='Gerimed Mobility, Aiding you, to live a better live'
              />
            </Link>
          </div>

          {
            // Actual links
            // Desktop
            !breakpointTwo ? (
              <>
                <ol
                  className={styles['links']}
                >
                  <li>
                    <NormalButton
                      active={page === PAGES.shop}
                      navMode={navMode}
                      to='/shop'
                    >
                      Shop
                    </NormalButton>
                  </li>
                  <li>
                    <NormalButton
                      active={page === PAGES.about}
                      navMode={navMode}
                      to='/about'
                    >
                      About Us
                    </NormalButton>
                  </li>
                  <li>
                    <NormalButton
                      active={page === PAGES.contact}
                      navMode={navMode}
                      to='/contact'
                    >
                      Contact
                    </NormalButton>
                  </li>
                  <li>
                    <NormalButton
                      active={page === PAGES.policy}
                      navMode={navMode}
                      to='/policy'
                    >
                      Policies
                    </NormalButton>
                  </li>
                </ol>

                <ol
                  className={styles['actions']}
                >
                  <li>
                    <IconButton
                      className={styles['iconButton']}
                      isableElevation
                      color='primary'
                      component={Link}
                      to='/profile'
                    >
                      <AccountCircleOutlined />
                    </IconButton>
                  </li>
                  <li>
                    <IconButton
                      className={styles['iconButton']}
                      disableElevation
                      color='primary'
                    >
                      <ShoppingCartOutlined />
                    </IconButton>
                  </li>
                </ol>
              </>
            ) : (
              <ol
                className={styles['actions']}
              >
                <li>
                  <IconButton
                    className={styles['iconButton']}
                    disableElevation
                    color='primary'
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    <Menu />
                  </IconButton>
                </li>
              </ol>
            )
          }
        </div>
      </nav>
      
      {
        breakpointTwo ? (
          <Drawer
            open={isDrawerOpen}
            setOpen={setIsDrawerOpen}
            page={page}
            token={token}
          />
        ) : null
      }
    </>

  )
}

Navbar.default = {
  navMode: MODE.normal
}

export default Navbar
