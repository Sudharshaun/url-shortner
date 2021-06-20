const formatDateUtil = (date, expressionToJoin) => {
   const dateFormat = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];
   function format(currElement) {
      let dateTimeFormat = new Intl.DateTimeFormat('en', currElement);
      return dateTimeFormat.format(date);
   } 
   return dateFormat.map(format).join(expressionToJoin);
}
/**
 * 
 * @param {*} date1 Passing larger date
 * @param {*} date2 Pass date to be differenced with
 * @returns Difference in Number of days.
 */
const getDifferenceBetweenDates = (date1, date2) => {
   const diffTime = Math.abs(date2 - date1);
   return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
const addOneYeartoCurrentDate = () => {
   const date = new Date();
   const year = date.getFullYear();
   const month = date.getMonth();
   const day = date.getDate();
   return new Date(year + 1, month, day);
}

export {formatDateUtil, getDifferenceBetweenDates, addOneYeartoCurrentDate};