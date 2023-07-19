export default function dateInterpreter(dateString) {
  let date = new Date(dateString);
  
  // Create an options object for toLocaleString
  let options = {
    month: 'long', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: 'numeric',
    timeZone: 'America/New_York'
  };

  // Format the date
  let formattedDate = date.toLocaleString('en-US', options);
  
  return formattedDate;
}
