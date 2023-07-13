// Your date string
export default function dateInterpreter(dateString) {

let date = new Date(dateString);

let monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

let month = monthNames[date.getUTCMonth()]; // Get the month as a name
let day = date.getUTCDate();
let year = date.getUTCFullYear();

let hours = date.getUTCHours();
let minutes = date.getUTCMinutes();
let period = hours < 12 ? 'am' : 'pm';

hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
minutes = minutes < 10 ? '0'+minutes : minutes; // adding leading zero to minutes

// Format the date
let formattedDate = `${month} ${day}, ${year} at ${hours}:${minutes}${period}`;

return formattedDate

}