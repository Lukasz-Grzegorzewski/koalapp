export function formatCurrency(amount: number, currentCode: string = "EUR") {
  try {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currentCode.toUpperCase(),
    }).format(amount);
  } catch (error) {
    console.error("Invalid currency code", currentCode, error);
    return `${currentCode.toUpperCase()} ${amount.toFixed(2)}`;
  }
}
