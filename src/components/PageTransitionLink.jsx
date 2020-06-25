import React, { Component } from 'react'
import gsap from 'gsap'
import TransitionLink, { TransitionPortal } from 'gatsby-plugin-transition-link'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

class PageTransitionLink extends Component {
  constructor(props) {
    super(props)

    this.layoutContents = React.createRef()
    this.transitionCover = React.createRef()
  }

  render(){
    return (
      <>
      <TransitionLink to={this.props.to}>
        {this.props.children}
      </TransitionLink>
      <TransitionPortal>
          <div
            ref={n => (this.transitionCover = n)}
            style={{
              position: 'fixed',
              background: '#4b2571',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              transform: 'translateY(100%)',
            }}
          />
        </TransitionPortal>
        </>
    )
  }
}

export default PageTransitionLink;
