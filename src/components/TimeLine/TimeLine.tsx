import React, { useCallback, useRef, useContext } from 'react';
import styled from 'styled-components';
import { calculateWidthValue } from '../../utils';
import { last, first } from 'lodash';
import { DateTime } from 'luxon';
import calculateNewInterval from './utils';
import { DashboardContext } from '../../App';
import { IDashboardContext } from '../../types/Dashboard';

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
`;

interface TimeLineProps {
  timeLineStart: DateTime;
}

const TimeLine: React.FC<TimeLineProps> = ({ children, timeLineStart }) => {
  const {
    timeEvents,
    timeStart,
    timeEnd,
    onSelection,
  }: IDashboardContext = useContext(DashboardContext);
  const selectedStart = timeStart;
  const selectedEnd = timeEnd;
  const events = timeEvents;

  const contentRef = useRef<HTMLDivElement | null>(null);
  const width = calculateWidthValue(
    timeLineStart,
    DateTime.fromISO(last(events)?.end ?? ''),
  );

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      const { start, end } = calculateNewInterval(
        timeLineStart,
        selectedStart,
        selectedEnd,
        contentRef.current!,
        e.clientX,
      );

      onSelection(start, end);
    },
    [onSelection],
  );

  return (
    <Root>
      <Content ref={contentRef} width={width} onClick={onClick}>
        {children}
      </Content>
    </Root>
  );
};

export default TimeLine;
