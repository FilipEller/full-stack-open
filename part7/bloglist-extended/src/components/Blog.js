import React, { useState } from 'react'
import { Paper, Grid, Button, Box } from '@mui/material'
import PropTypes from 'prop-types'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const gridStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  return (
    <Paper
      variant='outlined'
      sx={{
        fontFamily: 'Roboto',
        wordWrap: 'break-word',
        my: 2,
        p: 2,
      }}
      className='blog'
      component='article'>
      <Grid container sx={gridStyle}>
        <Grid item xs={7}>
          <div>
            <div>
              <Link to={`/blogs/${blog.id}`}>
                <i>{blog.title}</i>
              </Link>
            </div>
            {showDetails && (
              <Box sx={{ '& div': { mt: 1 } }}>
                <div>
                  {'<'}
                  <a href={blog.url}>{blog.url}</a>
                  {'>'}
                </div>
                <div>User: {blog.user.username}</div>
                <div>
                  Likes: {blog.likes}{' '}
                  <Button size='small' onClick={() => dispatch(likeBlog(blog))}>
                    Like
                  </Button>
                </div>
                {user.username === blog.user.username && (
                  <div>
                    <Button
                      variant='outlined'
                      size='small'
                      onClick={() => dispatch(deleteBlog(blog))}>
                      Delete
                    </Button>
                  </div>
                )}
              </Box>
            )}
          </div>
        </Grid>
        <Grid item xs={4} sx={gridStyle}>
          <div>{blog.author}</div>
          <Button
            sx={{ fontSize: 16 }}
            onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Hide' : 'View'}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

Blog.propTypes = { blog: PropTypes.object.isRequired }

export default Blog
