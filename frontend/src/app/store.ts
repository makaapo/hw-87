import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore} from 'redux-persist';
import {usersReducer} from '../features/User/usersSlice';
import {postsReducer} from '../features/PostsContainer/postsSlice';
import {commentsReducer} from '../features/Comments/сommentsSlice';


const usersPersistConfig = {
  key: 'mySpotify:users',
  storage,
  whitelist: ['user'],
}

const rootReducer = combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  }
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;