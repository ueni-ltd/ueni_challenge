import { useContext } from 'react';
import { DateTime } from 'luxon';
import { Moment } from 'moment';
import { DashboardContext } from '../../../App';
import { IDashboardContext } from '../../../types/Dashboard';

interface Response {
  start: DateTime;
  end: DateTime;
  nameFilterValue: null | string;
  nameFilterOptions: Array<string>;
  onStartChange: (value: Moment | string) => void;
  onEndChange: (value: Moment | string) => void;
  onFilterChange: (value: string | null) => void;
}

function useControlsBar(): Response {
  const {
    timeStart,
    timeEnd,
    filter,
    timeChangeStart,
    timeChangeEnd,
    filterChange,
  }: IDashboardContext = useContext(DashboardContext);

  return {
    start: timeStart,
    end: timeEnd,
    nameFilterValue: filter.value,
    nameFilterOptions: filter.options,
    onStartChange: timeChangeStart,
    onEndChange: timeChangeEnd,
    onFilterChange: filterChange,
  };
}

export default useControlsBar;
