import { MINUTE_TO_PIXEL_RATIO } from '../constants';
import { DateTime } from 'luxon';
import { TimeEvent } from '../types/TimeEvent';
import { isNaN } from 'lodash';

export function calculateLeftValue(timeLineStart: DateTime, selectedStart: DateTime) {
  return selectedStart.diff(timeLineStart).as('minutes') * MINUTE_TO_PIXEL_RATIO;
}

/**
 *
 * @param selectedStart Start time on the TimeLine.
 * @param selectedEnd End time on the TimeLine. For calculating the width of the TimeLine component, set this to the current local time. For Events or Selected Intervals, use their end time.
 * @returns Width in pixels on the TimeLine component of the start time to end time provided.
 */
export function calculateWidthValue(selectedStart: DateTime, selectedEnd: DateTime): number {
  const res = selectedEnd.diff(selectedStart).as('minutes') * MINUTE_TO_PIXEL_RATIO;
  return isNaN(res) ? 100 : res;
}

export function isIntervalFree(events: TimeEvent[], intervalStart: DateTime, intervalEnd: DateTime): boolean {
  // TODO: implement the algorithm. You can rely on events being sorted.
  return false;
}
