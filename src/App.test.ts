import { DateTime } from 'luxon';
import { TimeEvent } from './types/TimeEvent';
import { isIntervalFree } from './utils';

describe('isIntervalFree', () => {
  test('interval end within event', () => {
    const events: TimeEvent[] = [
      { id: '', name: '', start: '2022-01-18T15:15:00.000Z', end: '2022-01-18T18:30:00.000Z' },
    ];
    const intervalStart: DateTime = DateTime.fromISO('2022-01-18T12:15:00.000Z');
    const intervalEnd: DateTime = DateTime.fromISO('2022-01-18T16:30:00.000Z');

    expect(isIntervalFree(events, intervalStart, intervalEnd)).toBe(false);
  });
  test('interval start within event', () => {
    const events: TimeEvent[] = [
      { id: '', name: '', start: '2022-01-18T15:15:00.000Z', end: '2022-01-18T18:30:00.000Z' },
    ];
    const intervalStart: DateTime = DateTime.fromISO('2022-01-18T15:16:00.000Z');
    const intervalEnd: DateTime = DateTime.fromISO('2022-01-18T20:30:00.000Z');

    expect(isIntervalFree(events, intervalStart, intervalEnd)).toBe(false);
  });
  test('interval end and start within event', () => {
    const events: TimeEvent[] = [
      { id: '', name: '', start: '2022-01-18T15:15:00.000Z', end: '2022-01-18T18:30:00.000Z' },
    ];
    const intervalStart: DateTime = DateTime.fromISO('2022-01-18T15:16:00.000Z');
    const intervalEnd: DateTime = DateTime.fromISO('2022-01-18T18:30:00.000Z');

    expect(isIntervalFree(events, intervalStart, intervalEnd)).toBe(false);
  });
  test('event end and start within interval', () => {
    const events: TimeEvent[] = [
      { id: '', name: '', start: '2022-01-18T15:15:00.000Z', end: '2022-01-18T18:30:00.000Z' },
    ];
    const intervalStart: DateTime = DateTime.fromISO('2022-01-18T12:15:00.000Z');
    const intervalEnd: DateTime = DateTime.fromISO('2022-01-18T21:30:00.000Z');

    expect(isIntervalFree(events, intervalStart, intervalEnd)).toBe(false);
  });
  test('interval to left of event', () => {
    const events: TimeEvent[] = [
      { id: '', name: '', start: '2022-01-18T15:15:00.000Z', end: '2022-01-18T18:30:00.000Z' },
    ];
    const intervalStart: DateTime = DateTime.fromISO('2022-01-18T13:10:00.000Z');
    const intervalEnd: DateTime = DateTime.fromISO('2022-01-18T14:30:00.000Z');

    expect(isIntervalFree(events, intervalStart, intervalEnd)).toBe(true);
  });
  test('interval to right of event', () => {
    const events: TimeEvent[] = [
      { id: '', name: '', start: '2022-01-18T15:15:00.000Z', end: '2022-01-18T18:30:00.000Z' },
    ];
    const intervalStart: DateTime = DateTime.fromISO('2022-01-18T19:30:00.000Z');
    const intervalEnd: DateTime = DateTime.fromISO('2022-01-18T20:30:00.000Z');

    expect(isIntervalFree(events, intervalStart, intervalEnd)).toBe(true);
  });
});
