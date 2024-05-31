// globalSlice.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
  currentTrackId: string;
  trackQueue: string[];
  currentPosition: number;
  timer: number;
  addedTrackId: string;
}

const initialState: GlobalState = {
  currentTrackId: '',
  trackQueue: [],
  currentPosition: -1,
  timer: 0,
  addedTrackId: '',
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setCurrentTrackId: (state, action: PayloadAction<string>) => {
      state.currentTrackId = action.payload;
      console.log(state.currentTrackId);
    },
    setTrackQueue: (state, action: PayloadAction<string[]>) => {
      state.trackQueue = action.payload;
      console.log('Track Queue updated:', state.trackQueue);
    },
    setCurrentPosition: (state, action: PayloadAction<number>) => {
      state.currentPosition = action.payload;
      console.log('Position updated:', state.currentPosition);
    },
    setTimer: (state, action: PayloadAction<number>) => {
        state.timer = action.payload;
    },
    setAddedTrackId: (state, action: PayloadAction<string>) => {
        state.addedTrackId = action.payload;
        console.log(state.addedTrackId);
    },
  },
});

export const { setCurrentTrackId, setTrackQueue, setCurrentPosition, setTimer, setAddedTrackId } = globalSlice.actions;
export default globalSlice.reducer;
