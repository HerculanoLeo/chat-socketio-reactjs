import moment from 'moment';

export const formatDate = (date?: Date) => {
  return date ? moment(date).format('DD/MM/yyyy') : '';
};
