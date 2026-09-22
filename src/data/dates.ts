// One place that turns an article's ISO date into the text readers see.
//
// Articles store `date` ("2024-10-22") and nothing else: the human-readable
// label — the form the articles have always shown, "October 22, 2024" — is
// derived here so a corrected date cannot leave a stale label behind. The parts
// are read straight from the string, so a local timezone cannot shift the day.

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

/** "2024-10-22" -> "October 22, 2024". Returns the input if it is not a date. */
export const formatPostDate = (date: string): string => {
  const [year, month, day] = date.split('-').map(Number);
  if (!year || !month || !day || month < 1 || month > 12 || day < 1 || day > 31) return date;
  return `${MONTHS[month - 1]} ${day}, ${year}`;
};

/** The 4-digit year an article was published, used for the archive note. */
export const postYear = (date: string): string => date.slice(0, 4);
