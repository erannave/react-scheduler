import dayjs from "dayjs";
import { Day } from "@/types/global";
import {
  dayWidth,
  fonts,
  headerMonthHeight,
  headerWeekHeight,
  middleRowTextYPos
} from "@/constants";
import { drawRow } from "@/utils/drawRow";
import { Theme } from "@/styles";
import { getWeekLabel } from "../getWeekLabel";

export const drawWeeksInMiddle = (
  ctx: CanvasRenderingContext2D,
  startDate: Day,
  weekLabel: string,
  theme: Theme
) => {
  const width = 7 * dayWidth;
  const yPos = headerMonthHeight;

  const weeksThreshold = ctx.canvas.width / width + width;
  const firstDay = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`);
  const day = firstDay.day();
  let xPos = 0;

  for (let i = 0; i < weeksThreshold; i++) {
    const weekIndex = getWeekLabel(firstDay, i);

    if (day !== 1 && i === 0) xPos = -day * dayWidth + dayWidth;

    drawRow(
      {
        ctx,
        x: xPos,
        y: yPos,
        width,
        height: headerWeekHeight,
        textYPos: middleRowTextYPos,
        label: `${weekLabel.toUpperCase()} ${weekIndex}`,
        font: fonts.middleRow
      },
      theme
    );

    xPos += width;
  }
};
