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

function lastMonth(year, month, day) {
  let monthArray = [];
  for (let i = 30; i > 0; i--) {
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

export {
  daysInMonth,
  lastMonth,
  prevMonth,
  prevYear
};
