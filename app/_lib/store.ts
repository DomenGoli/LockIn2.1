import { configureStore } from "@reduxjs/toolkit";
import currentDayObjectReducer from "@/app/_lib/features/currentDay/currentDayObjectSlice";
import diaryReducer from "@/app/_lib/features/diary/diarySlice"
import betterReducer from "@/app/_lib/features/beBetter/betterSlice";

const store = configureStore({
    reducer: {
        dayObject: currentDayObjectReducer,
        diary: diaryReducer,
        better: betterReducer, 
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({serializableCheck:false})
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
