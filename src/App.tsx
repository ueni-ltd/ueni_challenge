import React, { useEffect, useMemo, useState } from 'react';
import Timeline from './components/TimeLine';
import { DateTime } from 'luxon';
import ControlsBar from './components/ControlsBar/ControlsBar';
import styled from 'styled-components';
import Loader from './components/Loader';
import fetchEvents from './api/fetchEvents';
import { TimeEvent } from './types/TimeEvent';
import Event from './components/Event';

const Root = styled.div`
  padding: 2rem;
`;

const StyledControlBar = styled(ControlsBar)`
  margin: 2rem 0;
`;

function App() {
  const timeLineStart = useMemo(() => DateTime.local().set({ minute: 0, hour: 0, second: 0, millisecond: 0 }), []);
  console.log('timeLineStart', timeLineStart);

  const [events, setEvents] = useState<TimeEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getEvents() {
      setLoading(true);
      let axiosResponse = await fetchEvents();
      if (axiosResponse.status === 200) {
        setEvents(axiosResponse.data);
      } else {
        alert(axiosResponse.statusText);
      }
      setLoading(false);
    }
    getEvents();
  }, []);

  //Rather than fetch events, effectively polling, we should hook into event changes, so we can refresh our cache of events each
  //time a change occurs.
  //Proir to this, I won't bother calling events regularly, just once, on load of the app.

  return (
    <Root className="App">
      <StyledControlBar timeLineStart={timeLineStart} />
      <Timeline timeLineStart={timeLineStart}>
        <Loader loading={loading} />
        {events.map((event) => {
          <Event timeLineStart={timeLineStart} item={event}></Event>;
        })}
      </Timeline>
    </Root>
  );
}

export default App;
