import React from 'react'

// Templates
import Layout from '../../templates/content_layout'

// Sections
import ContactSection from '../../sections/contact'
import MapSmall from '../../sections/mapSmall'
import FAQ from '../../sections/faq'

// Constants
import { PAGES } from '../../constants/pages'
import { MODE as FOOTERMODE } from '../../constants/footer'

const Contact = () => {
  return (
    <Layout
      page={PAGES.contact}
      footerMode={FOOTERMODE.curve}
    >
      <ContactSection />
      <MapSmall />
      <FAQ />
    </Layout>
  )
}

export default Contact
