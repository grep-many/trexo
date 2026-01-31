type DateInput = Date | string | number;

export default function formatDate(input: DateInput): string {
  const date = input instanceof Date ? input : new Date(input);

  // Guard against invalid dates
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const months = [
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

  const m = months[date.getMonth()];
  const d = String(date.getDate()).padStart(2, "0");
  const y = date.getFullYear();
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return `${m} ${d}, ${y} - ${h}:${min}`;
}
