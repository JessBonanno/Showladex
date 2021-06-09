import moment from 'moment';

export interface WeekDay {
  day: string;
  date: string;
}

export interface Week {
  day1: WeekDay;
  day2: WeekDay;
  day3: WeekDay;
  day4: WeekDay;
  day5: WeekDay;
  day6: WeekDay;
  day7: WeekDay;
}

const today = moment().format('YYYY-MM-DD');
export const thisWeek:Week = {
  day1: { day: 'Today', date: today },
  day2: { day: 'tomorrow', date: moment(today).add(1, 'd').format('YYYY-MM-DD') },
  day3: { day: moment(today).add(2, 'd').format('dddd'), date: moment(today).add(3, 'd').format('YYYY-MM-DD') },
  day4: { day: moment(today).add(3, 'd').format('dddd'), date: moment(today).add(4, 'd').format('YYYY-MM-DD') },
  day5: { day: moment(today).add(4, 'd').format('dddd'), date: moment(today).add(5, 'd').format('YYYY-MM-DD') },
  day6: { day: moment(today).add(5, 'd').format('dddd'), date: moment(today).add(6, 'd').format('YYYY-MM-DD') },
  day7: { day: moment(today).add(6, 'd').format('dddd'), date: moment(today).add(1, 'd').format('YYYY-MM-DD') },
};
export const datesArray: string[] = [
  today,
  moment(today).add(1, 'd').format('YYYY-MM-DD'),
  moment(today).add(2, 'd').format('YYYY-MM-DD'),
  moment(today).add(3, 'd').format('YYYY-MM-DD'),
  moment(today).add(4, 'd').format('YYYY-MM-DD'),
  moment(today).add(5, 'd').format('YYYY-MM-DD'),
  moment(today).add(6, 'd').format('YYYY-MM-DD'),
];
