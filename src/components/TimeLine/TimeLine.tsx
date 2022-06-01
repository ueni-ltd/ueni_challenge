import React, { useCallback, useContext, useRef, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { calculateWidthValue as calculateWidth } from '../../utils';
import { last, map, uniq } from 'lodash';
import { DateTime } from 'luxon';
import calculateNewInterval from './utils';
import { Context } from '../../state/store';
import fetchEvents from '../../api/fetchEvents';
import Loader from '../Loader';
import Event from '../Event';
import SelectedTime from '../SelectedTime';

interface RootProps {
  width: number;
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
`;

const Content = styled.div<RootProps>`
  position: relative;
  height: 100px;
  background: #f0f0f0;
  width: ${({ width }) => width}px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface TimeLineProps {
  /**
   * Time of the day from which first event displayed on the TimeLine can start. Defaults to 00:00:00:00 local time.
   */
  timeLineStart: DateTime;
}

const TimeLine: React.FC<TimeLineProps> = ({ children, timeLineStart }) => {
  const { events, selectedStart, selectedEnd, filteredEvents, dispatch } = useContext(Context);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const width = calculateWidth(timeLineStart, DateTime.fromISO(last(events)?.end ?? ''));
  const [loading, setLoading] = useState<boolean>(true);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      const { start, end } = calculateNewInterval(
        timeLineStart,
        selectedStart,
        selectedEnd,
        contentRef.current!,
        e.clientX,
      );

      dispatch({ type: 'SET_END', value: end });
      dispatch({ type: 'SET_START', value: start });
    },
    [selectedStart, selectedEnd, dispatch, timeLineStart],
  );

  useEffect(() => {
    async function getEvents() {
      const axiosResponse = await fetchEvents();
      if (axiosResponse.status === 200) {
        dispatch({
          type: 'INIT_STORE',
          value: { data: axiosResponse.data, options: uniq(map(axiosResponse.data, 'name')) },
        });
      } else {
        alert('mock error handling');
      }
      setLoading(false);
    }
    getEvents();
  }, []);

  return (
    <Root>
      <Content ref={contentRef} width={width} onClick={onClick}>
        <Loader loading={loading} />
        {!loading &&
          filteredEvents.map((event) => {
            return <Event key={event.id} timeLineStart={timeLineStart} item={event}></Event>;
          })}
        {!loading && <SelectedTime timeLineStart={timeLineStart}></SelectedTime>}
      </Content>
    </Root>
  );
};

export default TimeLine;
