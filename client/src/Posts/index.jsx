import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import PostsListing from './PostListing'

const listPosts = gql`query Posts{viewer {public_posts { totalCount edges { node {id title excerpt body published_at_ms}}}}}`

const PostsContainer = props => {
  const { data: { loading, error, viewer}, ...rest } = props

  if (loading) return <Loading>Loading...</Loading>
  if (error) return (
    <Error>
      <h3>Error:</h3>
      <p>{error}</p>
    </Error>
  )

  const {public_posts} = viewer

  if (public_posts.totalCount < 1) return (
    <EmptyPosts {...rest}>No posts</EmptyPosts>
  )

  return (
    <PostsListing {...rest} viewer={viewer} posts={public_posts.edges.map(n => n.node)}/>
  )
}

PostsContainer.propTypes = {
  data: PropTypes.object.isRequired,
}

export default graphql(listPosts)(PostsContainer)

const Loading = styled.div`
  font-size: 2em;
  color: RebeccaPurple;
  background-color: PapayaWhip;
  margin: 10px;
  padding: 10px;
`

const Error = styled.div`
  backgound-color: rgb(245, 147, 156, 0.7);
  color: red;
  border: 1 solid red;
  margin: 10px;
  padding: 10px;
`

const EmptyPosts = styled.div`
  backgound-color: rgb(252, 243, 207, 0.7);
  color: black;
  border: 1 solid black;
  margin: 10px;
  padding: 10px;  
`
