export function formatPrice(price:string) {
    return parseInt(price).toLocaleString(undefined, { minimumFractionDigits: 2 });
  }

  