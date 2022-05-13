import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {
  beforeEach(() => {
    const blog = {
      title: 'My Statement on Ukraine',
      author: 'Barack Obama',
      url: 'https://barackobama.medium.com/my-statement-on-ukraine-dc18ef76ad88',
      likes: 3,
      user: {
        id: '123',
        username: 'obama',
      },
    }
    const user = {
      id: '123',
      username: 'obama',
    }
    const likeBlog = jest.fn()
    const deleteBlog = jest.fn()

    render(
      <Blog
        blog={blog}
        user={user}
        likeBlog={likeBlog}
        deleteBlog={deleteBlog}
      />
    )
  })

  test('renders only title and author by default', () => {
    screen.getByText('My Statement on Ukraine')
    screen.getByText('Barack Obama')
    const url = screen.queryByText(/barackobama.medium.com/)
    expect(url).toBeNull()
    const likes = screen.queryByText(/3/)
    expect(likes).toBeNull()
  })
})
