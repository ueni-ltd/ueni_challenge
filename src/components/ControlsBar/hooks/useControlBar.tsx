import { map, uniq } from 'lodash';
import { DateTime } from 'luxon';
import { Moment } from 'moment';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Context } from '../../../state/store';
interface Response {
  start: DateTime;
  end: DateTime;
  nameFilterValue: null | string;
  nameFilterOptions: Array<string>;
  /**Accepts strings in ISO format */
  onStartChange: (value: Moment | string) => void;
  /**Accepts strings in ISO format */
  onEndChange: (value: Moment | string) => void;
  /**Accepts strings in ISO format */
  onFilterChange: (value: string | null) => void;
}

function useControlsBar(): Response {
  const [nameFilterValue, setNameFilterValue] = useState<Response['nameFilterValue']>('');

  const { events, selectedStart, selectedEnd, filterOptions, dispatch } = useContext(Context);

  const onStartChange: Response['onStartChange'] = (value) => {
    if (typeof value === 'string') {
      dispatch({ type: 'SET_START', value: DateTime.fromISO(value) });
    } else {
      dispatch({ type: 'SET_START', value: DateTime.fromISO(value.toISOString()) });
    }
  };

  const onEndChange: Response['onEndChange'] = (value) => {
    if (typeof value === 'string') {
      dispatch({ type: 'SET_END', value: DateTime.fromISO(value) });
    } else {
      dispatch({ type: 'SET_END', value: DateTime.fromISO(value.toISOString()) });
    }
  };

  const onFilterChange: Response['onFilterChange'] = (value) => {
    if (value === null) {
      setNameFilterValue('');
      dispatch({ type: 'SET_FILTERED_EVENTS', value: events });
    } else {
      dispatch({ type: 'SET_FILTERED_EVENTS', value: events.filter((event) => event.name === value) });
      setNameFilterValue(value);
    }
  };

  return {
    start: selectedStart,
    end: selectedEnd,
    nameFilterValue,
    nameFilterOptions: filterOptions,
    onStartChange,
    onEndChange,
    onFilterChange,
  };
}

export default useControlsBar;
