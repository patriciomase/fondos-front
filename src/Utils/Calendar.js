function prevYear(currentYear) {
  return currentYear - 1;
}

function prevMonth(currentMonth) {
  if (currentMonth - 1 < 1) {
    return 12;
  }

  return currentMonth - 1;
}

function forceTwoDigits(num) {
  return num.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
}

function daysInMonth (year, month) {
  return new Date(year, month, 0).getDate();
}

function lastXDays(year, month, day, howMuchDays = 30) {
  let monthArray = [];
  for (let i = howMuchDays; i > 0; i--) {
    day--;
    if (day < 1) {
      if (month === 1) {
        year = prevYear(year);
      }
      
      month = prevMonth(month);
      day = daysInMonth(year, month);
    }
    monthArray.push(`${year}-${forceTwoDigits(month)}-${forceTwoDigits(day)}`);
  }

  return monthArray.reverse();
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
