export const convertTimestamp = (timestamp: any) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayOfWeek = daysOfWeek[date.getDay()];

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}/${month}/${day} ${dayOfWeek} ${hours}:${minutes}:${seconds}`;
};

export const chartTimestamp = (timestamp: number) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const time = new Date(timestamp * 1000);
  const day = time.getDate().toString();
  const month = months[time.getMonth()];
  const year = time.getFullYear();
  const weekday = weekdays[time.getDay()];

  return `${weekday}, ${day} ${month}, ${year}`;
}
