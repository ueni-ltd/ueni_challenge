import { DateTime } from 'luxon';
import { Moment } from 'moment';

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
  return {
    start: DateTime.local(),
    end: DateTime.local(),
    nameFilterValue: null,
    nameFilterOptions: [],
    onStartChange: (value: Moment | string) => {},
    onEndChange: (value: Moment | string) => {},
    onFilterChange: (value: string | null) => {},
  };
}

export default useControlsBar;
