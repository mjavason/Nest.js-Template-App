export function isExpired(createdAt: Date, expiryMinutes = 10): boolean {
  return new Date().getTime() - createdAt.getTime() > expiryMinutes * 60000;
}

export function getUTCMonthStartAndEnd(year, month) {
  // Start of the month in UTC
  const startDate = new Date(Date.UTC(year, month, 1));

  // End of the month in UTC
  const endDate = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));

  return { startDate, endDate };
}

//   // Usage example for January 2023
//   const { startDate, endDate } = getUTCMonthStartAndEnd(2023, 0); // January is month 0 in JavaScript Date
//   console.log("Start of month:", startDate); // Expected: 2023-01-01T00:00:00.000Z
//   console.log("End of month:", endDate);     // Expected: 2023-01-31T23:59:59.999Z

//   const now = new Date();
//   console.log(getUTCMonthStartAndEnd(now.getFullYear(), now.getMonth()))
