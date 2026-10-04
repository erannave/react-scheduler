import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek.js";

dayjs.extend(isoWeek);

export const getWeekLabel = (firstDay: dayjs.Dayjs, index: number): number => {
  // The drawing offset places Sunday's first block on the following Monday.
  const sundayOffset = firstDay.day() === 0 ? 1 : 0;
  return firstDay.add(index * 7 + sundayOffset, "day").isoWeek();
};
