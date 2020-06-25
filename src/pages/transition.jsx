import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { Header, PostList } from 'components';
import { Layout } from 'layouts';
import PageTransitionLink from 'components/PageTransitionLink'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import gsap from 'gsap'
import TransitionLink, { TransitionPortal } from 'gatsby-plugin-transition-link'


const LinkWrapper = styled.div`
.tl-wrapper--unmount {
    animation: 1s ease-out 0.2s normal fadeout;
}
@keyframes fadout {
    0% {
        opacity: 1;
    }
    49% {
        opacity: 1;
    }
    50% {
        opacity: 0;
        z-index: 0;
    }
    100% {
        opacity: 0;
        z-index: 0;
    }
}
`;

const Transition = ({ data }) => {


    return (
        <Layout>
            <Helmet title={'WatchWatch.org'} />
            <Header title="reject authoritarianism" date="watchwatch documents authoritarian acts & police violence incidents"></Header>


            <LinkWrapper>
            <AniLink cover to="/blog" direction="left" duration={1} bg="
                url(https://source.unsplash.com/random)
                center / cover
                no-repeat
                fixed
                padding-box
                content-box
                white
            ">
                Go to page 2 with a cover right
            </AniLink>
            </LinkWrapper>
            <br />
            <AniLink paintDrip to="/blog" hex="#4b2571" bg="red">
                Go to page 2 with a paint drip
    </AniLink>
            <br />
            <TransitionLink to="/blog">
                Go to page 2 that way{' '}
            </TransitionLink>
            <br />
            <PageTransitionLink to="/blog">
              PageTransitionLink
            </PageTransitionLink>

        </Layout>
    );
};

export default Transition;
