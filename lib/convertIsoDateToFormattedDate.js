export function convertIsoDateToFormattedDate(isoDate) {
  const dateObject = new Date(isoDate);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
}
