const formatDateUtil = (date, dateFormat, expressionToJoin) => {
    function format(currElement) {
       let dateTimFormat = new Intl.DateTimeFormat('en', currElement);
       return dateTimFormat.format(date);
    }
    return dateFormat.map(format).join(expressionToJoin);
 }