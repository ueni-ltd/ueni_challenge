import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  createContext,
} from 'react';
import Timeline from './components/TimeLine';
import { DateTime } from 'luxon';
import ControlsBar from './components/ControlsBar/ControlsBar';
import styled from 'styled-components';
import Loader from './components/Loader';
import Event from './components/Event';
import SelectedTime from './components/SelectedTime';
import fetchEvents from './api/fetchEvents';
import { Dashboard, IDashboardContext } from './types/Dashboard';
import { TimeEvent } from './types/TimeEvent';
import moment from 'moment';
import { getActiveEvents } from './utils';

const Root = styled.div`
  padding: 2rem;
`;

const StyledControlBar = styled(ControlsBar)`
  margin: 2rem 0;
`;

function App() {
  /**
   * State Management
   * Single source of truth for the entire app state
   * to improve its performance by limiting useState to a single call.
   * State shape:
   * - timeEvents: set of time events
   * - timeStart: selected starting time (default: now)
   * - timeEnd: selected ending time (default: until 1h from now)
   * - filter: dates/names selections
   * - loading: manages the fetching loading state
   * - error: generic app error messages
   */
  const [dashboard, setDashboard] = useState<Dashboard>({
    timeEvents: [] as TimeEvent[],
    timeStart: DateTime.local(),
    timeEnd: DateTime.local().plus({ hours: 1 }),
    filter: {
      value: '',
      options: [] as string[],
    },
    loading: true,
    error: '',
  });
  /**
   * Data fetching handler
   */
  const handleFetching = async () => {
    try {
      const result = await fetchEvents();

      setDashboard({
        ...dashboard,
        timeEvents: result.data,
        filter: {
          ...dashboard.filter,
          options: result.data.map((event) => event.name),
        },
        loading: false,
      });
    } catch (error) {
      setDashboard({
        ...dashboard,
        error: error,
        loading: false,
      });
    }
  };
  const timeLineStart = useMemo(
    () =>
      DateTime.local().set({ minute: 0, hour: 0, second: 0, millisecond: 0 }),
    [],
  );
  // Selected time formatting handler
  const handleTimeChange: (time: moment.Moment | string) => DateTime = (
    time,
  ) => {
    // Data type check
    return DateTime.fromISO(
      typeof time === 'string' ? time : moment(time).format(),
    );
  };
  /**
   * Selected starting time handler
   */
  const handleTimeStart = useCallback<(time: moment.Moment | string) => void>(
    (time) => {
      setDashboard({
        ...dashboard,
        timeStart: handleTimeChange(time),
      });
    },
    [dashboard],
  );
  /**
   * Selected ending time handler
   */
  const handleTimeEnd = useCallback<(time: moment.Moment | string) => void>(
    (time) => {
      setDashboard({
        ...dashboard,
        timeEnd: handleTimeChange(time),
      });
    },
    [dashboard],
  );
  /**
   * Selected date ranges filter handler
   */
  const handleSelection = useCallback<(start: DateTime, end: DateTime) => void>(
    (start, end) => {
      setDashboard({
        ...dashboard,
        timeStart: start,
        timeEnd: end,
      });
    },
    [dashboard],
  );
  /**
   * Selected group filter handler
   */
  const handleFilterChange = useCallback<(filter: string | null) => void>(
    (filter) => {
      setDashboard({
        ...dashboard,
        filter: {
          ...dashboard.filter,
          value: filter === null ? '' : filter,
        },
      });
    },
    [dashboard],
  );

  useEffect(() => {
    handleFetching();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        timeEvents: dashboard.timeEvents,
        timeStart: dashboard.timeStart,
        timeEnd: dashboard.timeEnd,
        filter: dashboard.filter,
        timeChangeStart: handleTimeStart,
        timeChangeEnd: handleTimeEnd,
        filterChange: handleFilterChange,
        onSelection: handleSelection,
      }}
    >
      <Root className="App">
        {dashboard.error !== '' ? (
          <h1>{dashboard.error}</h1>
        ) : (
          <>
            <StyledControlBar timeLineStart={timeLineStart} />
            <Timeline timeLineStart={timeLineStart}>
              <Loader loading={dashboard.loading!} />
              {!dashboard.loading && (
                <SelectedTime timeLineStart={timeLineStart} />
              )}
              {getActiveEvents(dashboard.timeEvents, dashboard.filter).map(
                (timeEvent) => (
                  <Event
                    key={timeEvent.id}
                    timeLineStart={timeLineStart}
                    item={timeEvent}
                  />
                ),
              )}
            </Timeline>
          </>
        )}
      </Root>
    </DashboardContext.Provider>
  );
}

export const DashboardContext = createContext({} as IDashboardContext);
export default App;
