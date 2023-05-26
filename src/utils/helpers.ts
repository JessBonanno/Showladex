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

export const getContrast = (hexcolor: string | undefined) => {
  if (!hexcolor) {
    return 'white';
  }
  // If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === '#') {
    hexcolor = hexcolor.slice(1);
  }

  // Convert to RGB value
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);

  // Get YIQ ratio
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return yiq >= 128 ? '#232323' : 'white';
};