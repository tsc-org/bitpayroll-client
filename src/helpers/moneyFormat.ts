export const moneyValueFormat = (num: string, sign: string) => {
    if (num === null || num === "undefined") {
      return "";
    }
    const numInt = parseInt(num);
    if (numInt === 0 && sign) {
      return `${sign}0`;
    }
    if (!numInt) {
      return "";
    }
    const value = sign
      ? `${sign}${numInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
      : numInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    return value;
  };