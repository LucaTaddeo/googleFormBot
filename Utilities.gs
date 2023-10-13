function getCurrentDayValueMsEpoch() {
  const currentDate = new Date(); // Get the current date

  return currentDate.getTime(); // Get the current day in milliseconds since epoch
}


function getDaysInRange(startDate, endDate) {
  const dateArray = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

function getWeekday(date) {
  return date.toLocaleDateString('it-IT', { weekday: 'long' })
}

function getMonthName(date) {
  return date.toLocaleString('it-IT', { month: 'long' })
}

function getDateString(date) {
  const weekday = getWeekday(date);
  return weekday.charAt(0).toUpperCase() + weekday.slice(1) + " " + date.getDate() + " " + getMonthName(date);
}


function getShortWeekday(date) {
  return date.toLocaleDateString('it-IT', { weekday: 'short' })
}

function getShortMonthName(date) {
  return date.toLocaleString('it-IT', { month: 'short' })
}


function getShortDateString(date) {
  const weekday = getShortWeekday(date);
  return weekday.charAt(0).toUpperCase() + weekday.slice(1) + " " + date.getDate() + " " + getShortMonthName(date);
}