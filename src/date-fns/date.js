import { format } from 'date-fns';

// форматирует сроку даты выхода фильма
const formatDateRelease = (dataStr) => {
  return format(new Date(dataStr), 'MMM Q, y');
};

export default formatDateRelease;
