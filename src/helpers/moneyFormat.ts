export const moneyValueFormat = (num: string | number, sign= "$") => {
    if (num === null || num === "undefined") {
      return "";
    }
    const numInt = typeof(num) === "string" ? parseInt(num) : num;
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