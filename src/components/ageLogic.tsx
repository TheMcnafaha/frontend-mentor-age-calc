/* using a react reducer with ts proved to be </hell>
instead, have a logic file :) */

//age diff
type Age = {
  year: number;
  month: number;
  day: number;
};
export function getAgeDiff(DOB: Age, present: Age = presentAge()): Age {
  const wholeMonthPivot = {
    year: present.year,
    month: present.month,
    day: DOB.day,
  };

  const outputDate: Age = {
    year: 0,
    month: 0,
    day: 0,
  };
  outputDate.year = wholeMonthPivot.year - DOB.year;
  const bdayIsToday = fullYearDifference(present, DOB);
  if (bdayIsToday) {
    return outputDate;
  }
  const bdayHasPassed = hasBdayPassed(DOB, present);
  if (bdayHasPassed) {
    outputDate.month = present.month - DOB.month;
    if (present.day === wholeMonthPivot.day) {
      return outputDate;
    }
    if (present.day > wholeMonthPivot.day) {
      outputDate.day = present.day - wholeMonthPivot.day;
      return outputDate;
    }
    if (present.day < wholeMonthPivot.day) {
      outputDate.month--;
      const previousWholeMonthPivot: Age = {
        year: wholeMonthPivot.year,
        month: wholeMonthPivot.month - 2,
        day: wholeMonthPivot.day,
      };
      const dayFix =
        getLastDayOfMonth(previousWholeMonthPivot) - wholeMonthPivot.day;
      outputDate.day = present.day + dayFix;
      return outputDate;
    }
    return outputDate;
  }
  outputDate.year = outputDate.year - 1;
  const passedMonths = 12 - DOB.month;
  if (present.day === wholeMonthPivot.day) {
    outputDate.month = passedMonths + present.month;
    return outputDate;
  }
  outputDate.month = wholeMonthPivot.month + passedMonths;
  if (present.day > wholeMonthPivot.day) {
    outputDate.day = present.day - wholeMonthPivot.day;
    return outputDate;
  }
  if (present.day < wholeMonthPivot.day) {
    outputDate.month = outputDate.month - 1;
    const previousWholeMonthPivot: Age = {
      year: wholeMonthPivot.year,
      month: wholeMonthPivot.month - 2,
      day: wholeMonthPivot.day,
    };
    const dayFix =
      getLastDayOfMonth(previousWholeMonthPivot) - wholeMonthPivot.day;

    outputDate.day = present.day + dayFix;
    return outputDate;
  }
  return outputDate;
}
function fullYearDifference(date1: Age, date2: Age): boolean {
  if (date1.month === date2.month && date1.day === date2.day) {
    return true;
  }
  return false;
}
function presentAge(): Age {
  const present = new Date();
  return {
    year: present.getFullYear(),
    month: present.getMonth() + 1,
    day: present.getDate(),
  };
}
function hasBdayPassed(bday: Age, referenceAge: Age): boolean {
  if (bday.month < referenceAge.month) {
    return true;
  }
  if (bday.month === referenceAge.month) {
    return bday.day < referenceAge.day;
  }
  return false;
}
function getLastDayOfMonth(age: Age): number {
  //Minus one since rest of program indexes months at 1 while js indexes months at zero
  const dateOfMonth = new Date(age.year, age.month - 1, 0);
  return dateOfMonth.getDate();
}
