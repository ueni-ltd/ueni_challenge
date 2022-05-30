import { DateTime } from 'luxon';
import React from 'react';
import styled from 'styled-components';
import { TimeEvent } from '../../types/TimeEvent';
import { calculateLeftValue, calculateWidthValue, isIntervalFree } from '../../utils';

interface RootProps {
  left: number;
  width: number;
  free: boolean;
}

const Root = styled.div<RootProps>`
  position: absolute;
  height: 100%;
  border-left: 5px solid #585858;
  border-right: 5px solid #585858;
  width: ${({ width }) => width}px;
  left: ${({ left }) => left}px;
  background: ${({ free }) => (free ? '#4CAF50' : '#f44336b8')};
  z-index: 1;
  transition: all 170ms ease-in;
  box-sizing: border-box;
`;

interface SelectedTimeProps {
  timeLineStart: DateTime;
  loading: boolean;
}

const SelectedTime: React.FC<SelectedTimeProps> = ({ timeLineStart, loading }) => {
  if (loading) return null;
  const events: TimeEvent[] = [];
  const selectedStart = DateTime.local();
  const selectedEnd = DateTime.local();

  const left = calculateLeftValue(timeLineStart, selectedStart);
  const width = calculateWidthValue(selectedStart, selectedEnd);
  const free = isIntervalFree(events, selectedStart, selectedEnd);

  return <Root left={left} width={width} free={free} />;
};

export default SelectedTime;
