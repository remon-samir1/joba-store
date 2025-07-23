const TransformDate = (date) => {
 const getDate = new window.Date(date);
 const getFullYear = getDate.getFullYear().toString();
 const getMonth = (getDate.getMonth() + 1).toString().padStart(2 , '0');
 const getDay = getDate.getDate().toString().padStart(2 , '0');
 return `${getFullYear}-${getMonth}-${getDay}`
};
console.log(TransformDate);

export default TransformDate;
