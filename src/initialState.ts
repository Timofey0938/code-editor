import {State} from '@/types/types';

export const initialState: State = {
  focusedLine: null,
  focusedChar: null,
  movementStartChar: null,
  lines:  [
    {
      number: 0,
      chars: [
        {
          number: 0,
          value: 'l',
          isTargeted: false,
        },
        {
          number: 1,
          value: 'e',
          isTargeted: false,
        },
        {
          number: 2,
          value: 't',
          isTargeted: false,
        },
        {
          number: 3,
          value: '',
          isTargeted: false,
        },
      ],
      isFocused: false
    },
    {
      number: 1,
      chars: [
        {
          number: 0,
          value: 'l',
          isTargeted: false,
        },
        {
          number: 1,
          value: 'e',
          isTargeted: false,
        },
        {
          number: 0,
          value: '',
          isTargeted: false,
        },
      ],
      isFocused: false
    },
    {
      number: 2,
      chars: [
        {
          number: 0,
          value: 'l',
          isTargeted: false,
        },
        {
          number: 1,
          value: 'e',
          isTargeted: false,
        },
        {
          number: 2,
          value: 't',
          isTargeted: false,
        },
        {
          number: 3,
          value: '',
          isTargeted: false,
        },
      ],
      isFocused: false
    },
    {
      number: 3,
      chars: [
        {
          number: 0,
          value: '',
          isTargeted: false,
        },
      ],
      isFocused: false
    },
    {
      number: 4,
      chars: [
        {
          number: 0,
          value: 'l',
          isTargeted: false,
        },
        {
          number: 1,
          value: 'e',
          isTargeted: false,
        },
        {
          number: 2,
          value: 't',
          isTargeted: false,
        },
        {
          number: 3,
          value: '',
          isTargeted: false,
        },
      ],
      isFocused: false
    },
    {
      number: 5,
      chars: [
        {
          number: 0,
          value: 'l',
          isTargeted: false,
        },
        {
          number: 1,
          value: 'e',
          isTargeted: false,
        },
        {
          number: 2,
          value: 't',
          isTargeted: false,
        },
        {
          number: 3,
          value: '',
          isTargeted: false,
        },
        {
          number: 4,
          value: 'l',
          isTargeted: false,
        },
        {
          number: 5,
          value: 'e',
          isTargeted: false,
        },
        {
          number: 6,
          value: 't',
          isTargeted: false,
        },
        {
          number: 7,
          value: '',
          isTargeted: false,
        },
      ],
      isFocused: false
    },
  ],
};