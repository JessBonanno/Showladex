import moment from 'moment';

export interface WeekDay {
  day: string;
  date: string;
}

const today = moment().format('YYYY-MM-DD');
export const thisWeek:WeekDay[] = [
  { day: 'Today', date: today },
  { day: 'Tomorrow', date: moment(today).add(1, 'd').format('YYYY-MM-DD') },
  { day: moment(today).add(2, 'd').format('dddd'), date: moment(today).add(2, 'd').format('YYYY-MM-DD') },
  { day: moment(today).add(3, 'd').format('dddd'), date: moment(today).add(3, 'd').format('YYYY-MM-DD') },
  { day: moment(today).add(4, 'd').format('dddd'), date: moment(today).add(4, 'd').format('YYYY-MM-DD') },
  { day: moment(today).add(5, 'd').format('dddd'), date: moment(today).add(5, 'd').format('YYYY-MM-DD') },
  { day: moment(today).add(6, 'd').format('dddd'), date: moment(today).add(6, 'd').format('YYYY-MM-DD') },
];
export const datesArray: string[] = [
  today,
  moment(today).add(1, 'd').format('YYYY-MM-DD'),
  moment(today).add(2, 'd').format('YYYY-MM-DD'),
  moment(today).add(3, 'd').format('YYYY-MM-DD'),
  moment(today).add(4, 'd').format('YYYY-MM-DD'),
  moment(today).add(5, 'd').format('YYYY-MM-DD'),
  moment(today).add(6, 'd').format('YYYY-MM-DD'),
];
