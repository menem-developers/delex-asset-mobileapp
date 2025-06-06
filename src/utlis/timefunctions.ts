export function convertToLocalDateTime(utcString: string) {
  const date = new Date(utcString + 'Z'); // Parses the UTC string
  return date.toLocaleString(); // Converts to local date & time string
}
