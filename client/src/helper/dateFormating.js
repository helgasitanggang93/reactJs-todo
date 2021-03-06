/**
     * method for re format the date
     * values?: string -  due date 
     * return - appropriate date format
*/
export const formatDate = values => {
  const dayList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Desember"
  ];
  if(values){
    let formatDate = new Date(values);
    let setDay = formatDate.getDay();
    let setMonth = formatDate.getMonth();
    let setDate = formatDate.getDate();
    let setYear = formatDate.getFullYear();
  
    return `${dayList[setDay].slice(0, 3)}, ${setDate} ${
      monthList[setMonth]
    } ${setYear}`;
  }
  
};
