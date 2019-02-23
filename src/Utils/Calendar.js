function prevYear(currentYear) {
  return currentYear - 1;
}

function prevMonth(currentMonth) {
  if (currentMonth - 1 < 1) {
    return 12;
  }

  return currentMonth - 1;
}

function daysInMonth (year, month) {
  return new Date(year, month, 0).getDate();
}

function lastXDays(year, month, day, howMuchDays = 30) {
  let monthArray = [];
  for (let i = howMuchDays; i > 0; i--) {
    monthArray.push({
      name: `${year}-${month}-${day}`
    });

    day--;

    if (day < 1) {
      if (month === 1) {
        year = prevYear(year);
      }

      month = prevMonth(month);
      day = daysInMonth(year, month);
    }
  }

  return monthArray;
}

function lastMonth(year, month, day) {
  return lastXDays(...arguments, 30);
}

function last3Months(year, month, day) {
  return lastXDays(...arguments, 90);
}

export {
  daysInMonth,
  lastMonth,
  last3Months,
  prevMonth,
  prevYear
};
