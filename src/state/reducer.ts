import { DateTime } from 'luxon';
import { Dispatch } from 'react';
import { TimeEvent } from '../types/TimeEvent';

export type SET_EVENTS = { type: 'SET_EVENTS'; value: TimeEvent[] };
export type SET_START = { type: 'SET_START'; value: DateTime };
export type SET_END = { type: 'SET_END'; value: DateTime };
export type SET_FILTERED_EVENTS = { type: 'SET_FILTERED_EVENTS'; value: TimeEvent[] };

export type Actions = SET_EVENTS | SET_START | SET_END | SET_FILTERED_EVENTS;

export type State = {
  events: TimeEvent[];
  dispatch: Dispatch<Actions>;
  selectedStart: DateTime;
  selectedEnd: DateTime;
  filteredEvents: TimeEvent[];
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'SET_EVENTS':
      return {
        ...state,
        events: action.value,
      };
    case 'SET_START':
      return {
        ...state,
        selectedStart: action.value,
      };
    case 'SET_END':
      return {
        ...state,
        selectedEnd: action.value,
      };
    case 'SET_FILTERED_EVENTS':
      return {
        ...state,
        filteredEvents: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
