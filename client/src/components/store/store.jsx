import { configureStore } from '@reduxjs/toolkit'
import tokenReducer  from './slice'

 const store = configureStore({
  reducer: {
    token:tokenReducer
  },
})

export default store