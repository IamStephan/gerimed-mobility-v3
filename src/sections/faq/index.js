import React from 'react'

// Material
import { Typography, Avatar, Divider } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'

// Templates
import { Section } from '../../templates/content_layout'

// Styles
import styles from './styles.module.scss'


const questions = {
  sections: [
    {
      title: 'Support',
      questions: [
        {
          title: 'My cart does not work?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis malesuada urna, ut luctus nulla lobortis sed. Duis pellentesque sed libero imperdiet venenatis. '
        },{
          title: 'I canno log into my account?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis malesuada urna, ut luctus nulla lobortis sed. Duis pellentesque sed libero imperdiet venenatis. '
        },{
          title: 'Do I need an account to buy items?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis malesuada urna, ut luctus nulla lobortis sed. Duis pellentesque sed libero imperdiet venenatis. '
        },{
          title: 'Can I return my items?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis malesuada urna, ut luctus nulla lobortis sed. Duis pellentesque sed libero imperdiet venenatis. '
        },
      ]
    },
    {
      title: 'Shipping',
      questions: [
        {
          title: 'How are shipping costs calculated?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis malesuada urna, ut luctus nulla lobortis sed. Duis pellentesque sed libero imperdiet venenatis.'
        },
        {
          title: 'How long does shipping take?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis malesuada urna, ut luctus nulla lobortis sed. Duis pellentesque sed libero imperdiet venenatis.'
        },
        {
          title: 'Can i track my order?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis malesuada urna, ut luctus nulla lobortis sed. Duis pellentesque sed libero imperdiet venenatis.'
        }
      ]
    },
    {
      title: 'Returns',
      questions: [
        {
          title: 'Can I return my items?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis malesuada urna, ut luctus nulla lobortis sed. Duis pellentesque sed libero imperdiet venenatis.'
        }
      ]
    }
  ]
}

/**
 * TODO:
 * ======
 *  - Change FAQ to be more aestetic
 */
const FAQ = () => {
  return (
    <Section
      className={styles['faqSection']}
      gutter='none'
    >
      <Typography
        variant='h4'
        className={styles['title']}
        color='secondary'
      >
        <b>Frequently Asked Questions</b>
      </Typography>

      {
        questions.sections.map((section, i) => (
          <section
            key={section.title}
            className={styles['questionSection']}
          >
            <Typography
              variant='h5'
              className={styles['header']}
              color='secondary'
            >
              <b>{section.title}</b>
            </Typography>

            <Divider />

            <div
              className={styles['questionsContent']}
            >
              {
                section.questions.map((question, i) => (
                  <div
                    key={question.title}
                    className={styles['question']}
                  >
                    <div className={styles['left']}>
                      <Avatar
                        className={styles['questionAvatar']}
                      >
                        <HelpOutline />
                      </Avatar>
                    </div>

                    <div
                      className={styles['right']}
                    >
                      <Typography
                        className={styles['questionHeader']}
                        variant='h6'
                      >
                        <b>{question.title}</b>
                      </Typography>
                      <Typography
                        className={styles['questionContent']}
                      >
                        {question.content}
                      </Typography>
                    </div>
                    
                  </div>
                ))
              }
            </div>
          </section>
        ))
      }
    </Section>
  )
}

export default FAQ
