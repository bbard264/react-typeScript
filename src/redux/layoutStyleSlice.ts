// layoutStyleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LayoutStyleState {
  pattern: string;
  shapeOrder: string[];
}

const initialState: LayoutStyleState = {
  pattern: '43',
  shapeOrder: [
    'square',
    'circle',
    'oval',
    'trapezoid',
    'rectangle',
    'parallelogram',
  ],
};

const layoutStyleSlice = createSlice({
  name: 'layoutStyle',
  initialState,
  reducers: {
    setLayoutStyle: (
      state,
      action: PayloadAction<Partial<LayoutStyleState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    moveRight: (state) => {
      const updatedOrder = state.shapeOrder.map((_, index) => {
        const newIndex = index === 0 ? state.shapeOrder.length - 1 : index - 1;
        return state.shapeOrder[newIndex];
      });
      return {
        ...state,
        shapeOrder: updatedOrder,
      };
    },
    moveLeft: (state) => {
      const updatedOrder = state.shapeOrder.map((_, index) => {
        const newIndex = index === state.shapeOrder.length - 1 ? 0 : index + 1;
        return state.shapeOrder[newIndex];
      });
      return {
        ...state,
        shapeOrder: updatedOrder,
      };
    },
    random: (state) => {
      const updatedOrder = [...state.shapeOrder].sort(
        () => Math.random() - 0.5
      );
      return {
        ...state,
        shapeOrder: updatedOrder,
      };
    },
    changePattern: (state) => {
      const newPattern = state.pattern === '43' ? '34' : '43';
      return {
        ...state,
        pattern: newPattern,
      };
    },
  },
});

export const { setLayoutStyle, moveLeft, moveRight, random, changePattern } =
  layoutStyleSlice.actions;
export const layoutStyleReducer = layoutStyleSlice.reducer;

// pattern:"34" or "43"
// ShapeOrder: ['squre','circle','oval','trapezoid','rectangle','parallelogram']
// function: moveLeft,moveRight, random ,ChangePattern
