// globalSlice.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
  currentTrackId: string;
  trackQueue: string[];
  currentPosition: number;
  timer: number;
}

const initialState: GlobalState = {
  currentTrackId: '',
  trackQueue: [],
  currentPosition: -1,
  timer: 0,
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
  },
});

export const { setCurrentTrackId, setTrackQueue, setCurrentPosition, setTimer } = globalSlice.actions;
export default globalSlice.reducer;
