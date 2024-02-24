import { configureStore } from "@reduxjs/toolkit";
import { simpleSlice } from "./simpleSlice";

const makeStore = () =>
    configureStore({
        reducer: {
            [simpleSlice.name]: simpleSlice.reducer,
        },
        devTools: true,
    });

const store = makeStore()

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export { store }