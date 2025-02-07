export function formatDate(dt?: Date) {
  if (!dt) {
    return "";
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const { day, month, year } = formatter
    .formatToParts(dt)
    .reduce((prev, curr) => {
      if (curr.type === "day") {
        prev.day = curr.value;
      }
      if (curr.type === "month") {
        prev.month = curr.value;
      }
      if (curr.type === "year") {
        prev.year = curr.value;
      }

      return prev;
    }, {} as { day: string; month: string; year: string });

  return `${month} ${day}, ${year}`;
}

export function formatElapsed(dt?: Date, now = new Date()) {
  if (!dt) {
    return "";
  }

  const elapsedDays = (now.getTime() - dt.getTime()) / 1000 / 3600 / 24;
  const yearsHired = Math.floor(elapsedDays / 365);
  const restMonths = Math.floor(elapsedDays % 365);
  const monthsHired = Math.floor(restMonths / 30);
  const daysHired = Math.floor(restMonths % 30);

  const formattedTime = [
    `${yearsHired > 0 ? `${yearsHired}y` : ``}`,
    `${monthsHired > 0 ? `${monthsHired}m` : ``}`,
    `${daysHired > 0 ? `${daysHired}d` : ``}`,
  ]
    .filter((el) => el !== "")
    .join(" - ");

  return formattedTime.length > 0 ? formattedTime : `< 1d`;
}
