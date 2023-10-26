export const thousandsCommaFormatter = (inputNum: number) => {
  let formattedNum = inputNum.toFixed(3); // 소수점 이하의 숫자가 있으면 소수점 3자리까지 나타나도록 형식화
  formattedNum = formattedNum.replace(/(\.\d*?)0+$/, "$1"); // 불요한 0 제거
  formattedNum = formattedNum.replace(/\.$/, ""); // 소수점 이하 숫자가 없을 경우 소수점 제거

  return formattedNum.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export const priceFormatter = (num: number) => {
  // Convert the number to a string and split it into integer and decimal parts
  const [integerPart, decimalPart] = num.toFixed(1).split('.');

  // Add commas as thousands separators to the integer part
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Join the formatted integer and decimal parts with a dot
  return `${formattedIntegerPart}.${decimalPart}`;
};

