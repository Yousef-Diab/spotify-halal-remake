import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
type intiialStateType={
    isPlaying:boolean;
    activeTrack: any | null;
}

const initialState: intiialStateType = {
    isPlaying: false,
    activeTrack: null,
}
const player = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setIsPlaying: (state, { payload }: PayloadAction<boolean>) => {
            state.isPlaying = payload;
        },
        setActiveTrack: (state, { payload }: PayloadAction<any>) => {
            state.activeTrack = payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.auth,
            };
        },
    }
});
export const { setIsPlaying, setActiveTrack } = player.actions

export default player.reducer;