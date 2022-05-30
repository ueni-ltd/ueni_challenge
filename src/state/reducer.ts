import { Dispatch } from 'react';
import { TimeEvent } from '../types/TimeEvent';

export type SET_EVENTS = { type: 'SET_EVENTS'; value: TimeEvent[] };
export type SET_START = { type: 'SET_START' };

export type Actions = SET_EVENTS | SET_START;

export type State = {
  events: TimeEvent[];
  dispatch: Dispatch<Actions>;
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'SET_EVENTS':
      return {
        ...state,
        events: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
