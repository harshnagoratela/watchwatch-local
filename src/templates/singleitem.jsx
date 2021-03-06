import React from 'react';
import { graphql, Link } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Layout, Container, Content } from 'layouts';
import { TagsBlock, Header, SEO } from 'components';
import '../styles/prism';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import _ from 'lodash';



const SuggestionBar = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  background: ${props => props.theme.colors.white.dark};
  box-shadow: ${props => props.theme.shadow.suggestion};
`;
const PostSuggestion = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 3rem 0 3rem;
  @media (max-width: 600px) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

const Title = styled.h1`
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    font-size: 1rem;
  }
`;

const Subtitle = styled.h5`
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    font-size: 0.7rem;
  }
`;

const Statistics = styled.div`
  display: flex;
  border: 1px solid ${props => props.theme.colors.white.grey};
  margin-bottom: 15px;
  padding: 5px;
`;

const StatisticItem = styled.div`
  margin-right: 40px;
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    font-size: 0.6rem;
    margin-right: 10px;
  }
`;

const StatisticIcon = styled.img`
  width: 30px;
  margin-left: 7px;
  margin-top: 5px;
`;

const twitterStyles = css`
@import url('https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap');
blockquote.twitter-tweet, .twitter-tweet {
  display: inline-block;
  font-family: 'Anonymous Pro', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 11px;
  font-weight: bold;
  line-height: 14px;
  border-color: #eee #ddd #bbb;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  margin: 10px 5px;
  padding: 0 16px 16px 16px;
  max-width: 468px;
  background: none;
}

blockquote.twitter-tweet p, .twitter-tweet p {
  font-size: 16px;
  font-weight: normal;
  line-height: 20px;
  font-family: 'Anonymous Pro', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
}

blockquote.twitter-tweet a, .twitter-tweet a {
  color: inherit;
  font-weight: normal;
  text-decoration: none;
  outline: 0 none;
  font-family: 'Anonymous Pro', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
}

blockquote.twitter-tweet a:hover,
blockquote.twitter-tweet a:focus, .twitter-tweet a:hover {
  text-decoration: underline;
}
`

const SingleItem = ({ data, pageContext }) => {
  const { next, prev } = pageContext;
  const { name, date, slug, imageurl, url, fields, mediafile, category, tags, localImageUrl, about, state, city } = data.googleSheetListRow

  const [open, setOpen] = React.useState(false)

  //converting comma seperated tags to tags map
  const tagsList = tags ? tags.split(',') : [];
  const image = localImageUrl ? localImageUrl.childImageSharp.fluid.src : imageurl;

  return (
    <Layout>
      <SEO
        title={name}
        description={about || ' '}
        banner={image}
        pathname={url}
      />
      <Header title={name} />
      <Container>
        <div style={{ display: "flex" }}>

          <div>
            <Title>{name}</Title>
            <Subtitle>{city}, {state}</Subtitle>
          </div>
        </div>
        <TagsBlock list={tagsList || []} />
        <Content input={about} /><br />
        <Content input={fields.youtubeEmbedData} /><br />
        <Content input={fields.videoEmbedData} /><br />
        <Content input={fields.tweetEmbedData} /><br />

        <a href="/random/" className="button ">See another police brutality case </a>
        <a className="button buttonalt" href="javascript:void(0)" onClick={() => setOpen(true)}>
          Help end police Violence
        </a>
        <Modal open={open} onClose={() => setOpen(false)} center>
          <h3>Stand for Justice! End Police Brutality! </h3>

          <p>
            <strong>Color Of Change</strong> helps you do something real about injustice. They design campaigns powerful enough to end practices that unfairly hold Black people back, and champion solutions that move us all forward. Until justice is real.
          </p>
          <a target="_blank" href="https://colorofchange.org/" rel="noopener noreferrer" className="button">Support Color of Change</a>
          <p>
            <strong>Fair Fight</strong> workds to promote fair elections across the country. Voting is the bedrock on which our community’s future and your ambitions are built. Join the fight to ensure access to democracy for all.
          </p>
          <a target="_blank" href="https://fairfight.com/" rel="noopener noreferrer" className="button">Support Fair Fight</a>
        </Modal>
        {/*<Content input={about} /><br />  */}
      </Container>
      <SuggestionBar>
        <PostSuggestion>
          {prev && (
            <Link to={`/${prev.slug}`}>
              <h4>Previous</h4>
              <p>{prev.name}</p>
            </Link>
          )}
        </PostSuggestion>
        <PostSuggestion>
          {next && (
            <Link to={`/${next.slug}`}>
              <h4>Next</h4>
              <p>{next.name}</p>
            </Link>
          )}
        </PostSuggestion>
      </SuggestionBar>
    </Layout>
  );
};

export default SingleItem;

export const query = graphql`
  query($pathSlug: String!) {
    googleSheetListRow(slug: {eq: $pathSlug}) {
      id
      name
      date
      city
      state
      url
      fields {
        tweetEmbedData
        youtubeEmbedData
        videoEmbedData
      }
      mediafile
      youtube_link
      tags
      about
      slug
      imageurl
      category
    }
  }
`;
