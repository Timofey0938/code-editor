import {
  addChar,
  moveUp,
  moveToRight,
  moveDown,
  moveToLeft,
  jumpToNextLine,
  removeLeftChar,
  removeRightChar,
} from '@/store/codeSlice';
import {AppDispatch} from './store';

export const handleKeyDown = (dispatch: AppDispatch, key: string) => {
  console.log('handle key down', key);

  switch (key) {
    case 'ArrowUp':
      return dispatch(moveUp());
    case 'ArrowRight':
      return dispatch(moveToRight());
    case 'ArrowDown':
      return dispatch(moveDown());
    case 'ArrowLeft':
      return dispatch(moveToLeft());
    case 'Enter':
      return dispatch(jumpToNextLine());
    case 'Backspace':
      return dispatch(removeLeftChar());
    case 'Delete':
      return dispatch(removeRightChar());
    default:
      return dispatch(addChar({char: key}))
  }
};