import dayjs, { Dayjs } from 'dayjs';

import { DATE_SHORT_FORMAT } from '../consts/formats';

export const formatToday = (pattern: string = DATE_SHORT_FORMAT) => {
    return dayjs().format(pattern);
};

export const formatDate = (date: Dayjs, pattern: string = DATE_SHORT_FORMAT) => {
    return date.format(pattern);
};
