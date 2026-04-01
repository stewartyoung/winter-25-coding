/**
 * Definition of Interval:
 */
export class Interval {
  start: number;
  end: number;
  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }
}

export class Solution {
  /**
   * @param intervals: an array of meeting time intervals
   * @return: if a person could attend all meetings
   */
  canAttendMeetings(intervals: Interval[]): boolean {
    // sort by start time O(nlog(n)) time, O(1)/O(N) space
    intervals.sort((a, b) => a[0] - b[0]);

    for (let i = 0; i < intervals.length - 1; i++) {
        let i1 = intervals[i];
        let i2 = intervals[i + 1];

        if (i1[1] > i2[0]) {
            return false
        }
    }

    return true;

  }
}
