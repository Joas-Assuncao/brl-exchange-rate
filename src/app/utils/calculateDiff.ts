export function calculateDiff(
  currentPrice: number,
  dailyPrice: number
): string {
  const value = currentPrice / dailyPrice;
  const valueFormatted = ((value - 1) * 100).toFixed(2).toString();

  console.log({ value, valueFormatted });

  return `${valueFormatted}%`;
}
