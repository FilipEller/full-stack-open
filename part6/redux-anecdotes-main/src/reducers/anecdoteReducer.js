import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    /*vote(state, action) {
      return state.map(anecdote =>
        anecdote.id === action.payload
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    },*/
    appendAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      return state.map(anecdote =>
        anecdote.id === action.payload.id ? action.payload : anecdote
      )
    },
  },
})

export const { appendAnecdote, setAnecdotes, updateAnecdote } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = anecdote => {
  return async dispatch => {
    const voted = { ...anecdote, votes: anecdote.votes + 1 }
    const updated = await anecdoteService.update(voted)
    dispatch(updateAnecdote(updated.data))
  }
}

export default anecdoteSlice.reducer

/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]



export const vote = id => {
  return {
    type: 'VOTE',
    data: { id },
  }
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

export const createAnecdote = content => {
  return {
    type: 'NEW_ANECDOTE',
    data: { content },
  }
}

const initialState = []
// const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote =>
        anecdote.id === action.data.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    case 'NEW_ANECDOTE':
      // return [...state, asObject(action.data.content)]
      return [...state, action.data.content]
    default:
      return state
  }
}

export default reducer
*/
