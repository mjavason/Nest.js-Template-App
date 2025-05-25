export function isExpired(createdAt: Date, expiryMinutes = 10): boolean {
  return new Date().getTime() - createdAt.getTime() > expiryMinutes * 60000;
}

export function getUTCMonthStartAndEnd(year, month) {
  const startDate = new Date(Date.UTC(year, month, 1));
  const endDate = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));

  return { startDate, endDate };
}
