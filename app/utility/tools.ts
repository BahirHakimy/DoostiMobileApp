/**
 * Capitalizes the first letter of each word
 *
 *
 * @param {string} text The string to be capitalized
 */
function capitalize(text: string): string {
  return text
    .split(" ")
    .map((t) => `${t[0].toUpperCase()}${t.substring(1)}`)
    .join(" ");
}

/**
 * Takes a date string and return formated version of it: MM DD YY
 * @param dateString Date to format in string
 * @returns Formated date in format of "MM DD YY"
 */

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const monthsAbbr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${
    monthsAbbr[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`;
}

/**
 *
 * Paginates an array based on pages count and current page
 *
 * @param {array} items The array to paginate
 * @param {number} pagesCount The total count of pages
 * @param {number} currentPage The current page
 * @returns {Array} sliced array
 */

function paginate(
  items: any[] = [],
  pagesCount: number,
  currentPage: number
): any[] {
  const itemPerPage = Math.floor(items.length / pagesCount);
  const result = items.slice(
    itemPerPage * (currentPage - 1),
    itemPerPage * currentPage
  );
  return result;
}

export { capitalize, paginate, formatDate };
