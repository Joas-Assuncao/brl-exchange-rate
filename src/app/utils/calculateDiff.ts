export function calculateDiff(
  currentPrice?: number,
  dailyPrice?: number
): string {
  console.log(currentPrice, dailyPrice);

  if (!currentPrice || !dailyPrice) return '0%';

  const value = currentPrice / dailyPrice;
  const valueFormatted = ((value - 1) * 100).toFixed(2).toString();

  return valueFormatted.includes('-')
    ? `${valueFormatted}%`
    : `+${valueFormatted}%`;
}
