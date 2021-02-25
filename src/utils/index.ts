import { MINUTE_TO_PIXEL_RATIO } from '../constants';
import { DateTime } from 'luxon';
import { TimeEvent } from '../types/TimeEvent';
import { FilterType } from '../types/Dashboard';
export function calculateLeftValue(
  timeLineStart: DateTime,
  selectedStart: DateTime,
) {
  return (
    selectedStart.diff(timeLineStart).as('minutes') * MINUTE_TO_PIXEL_RATIO
  );
}

export function calculateWidthValue(
  selectedStart: DateTime,
  selectedEnd: DateTime,
) {
  return selectedEnd.diff(selectedStart).as('minutes') * MINUTE_TO_PIXEL_RATIO;
}

export function isIntervalFree(
  events: TimeEvent[],
  intervalStart: DateTime,
  intervalEnd: DateTime,
): boolean {
  let free = true;
  const event = events.find((event) => {
    const eventStart = DateTime.fromISO(event.start);
    const eventEnd = DateTime.fromISO(event.end);
    let found = null;

    /**
     * Collision check
     * 1) Selected interval equals to an existing one
     * 2) Selected interval starts before another one and ends during its timing
     *    OR selected interval starts during another one and ends after that
     * 3) Selected interval begins and ends respectively before and after another one
     *    (includes it)
     */
    if (
      // Case 1
      (intervalStart >= eventStart && intervalEnd <= eventEnd) ||
      // Case 2
      (intervalStart < eventStart && intervalEnd > eventStart) ||
      (intervalStart < eventEnd && intervalEnd > eventEnd) ||
      // Case 3
      (intervalStart < eventStart && intervalEnd > eventEnd)
    ) {
      found = event;
    }

    return found;
  });

  // Colliding event check
  if (event) {
    free = false;
  }

  return free;
}

/**
 * Filtered events getter
 * Returns the events group filtered by specific organizer
 * @param events Events group
 * @param filter Active filter
 */
export function getActiveEvents(
  events: TimeEvent[],
  filter: FilterType,
): TimeEvent[] {
  return events.filter((event) =>
    filter.value !== '' ? event.name === filter.value : event,
  );
}
