/*
 * @param strNumber {String} - stringified number
 * @returns {String} - locale-stringified number
 */
export function commafyStringNumber(strNumber) {
  return Number(strNumber).toLocaleString();
}
