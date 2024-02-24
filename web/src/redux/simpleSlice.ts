import { createSlice } from "@reduxjs/toolkit";

export interface State {
}

const initialState: State = {
};

export const simpleSlice = createSlice({
    name: "simple",
    initialState,
    reducers: {
    }
});

export const { } = simpleSlice.actions;