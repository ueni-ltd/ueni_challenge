// Module Start
// JS imports
import { DateTime } from 'luxon';
import { TimeEvent } from './TimeEvent';

// Types
// Filter
export type FilterType = {
  value: string | null;
  options: string[];
};

// Interfaces
// Module export
/**
 * Dashboard
 * App state interface
 */
export interface Dashboard {
  timeEvents: TimeEvent[];
  timeStart: DateTime;
  timeEnd: DateTime;
  filter: FilterType;
  loading?: boolean;
  error?: string;
}

/**
 * Dashboard - Context
 * App context interface
 */
export interface IDashboardContext {
  timeEvents: TimeEvent[];
  timeStart: DateTime;
  timeEnd: DateTime;
  filter: FilterType;
  timeChangeStart: (value: Moment | string) => void;
  timeChangeEnd: (value: Moment | string) => void;
  filterChange: (value: string | null) => void;
  onSelection: (start: DateTime, end: DateTime) => void;
}
// Module End
