import { configureStore } from '@reduxjs/toolkit'
import { useSelector as useReduxSelector, useDispatch as useReduxDispatch, TypedUseSelectorHook } from 'react-redux'
import { configs } from '@/constants'

import app from './app.store'
import common from './common.store'
import user from './user.store'

const createStore = configureStore({
  reducer: {
    app,
    common,
    user
  },
  devTools: configs.isDevelop,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

type StoreTypes = ReturnType<typeof createStore.getState>
type StoreDispatch = typeof createStore.dispatch

export const useSelector: TypedUseSelectorHook<StoreTypes> = useReduxSelector
export const useDispatch = () => useReduxDispatch<StoreDispatch>()

export const dispatch = createStore.dispatch
export default createStore
