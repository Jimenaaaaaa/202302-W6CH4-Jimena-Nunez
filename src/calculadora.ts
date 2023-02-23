export function calculadora(num1, num2) {
  const n1 = num1 * 1;
  const n2 = num2 * 1;
  const sum = n1 + n2;
  const rest = n1 - n2;
  const mult = n1 * n2;
  const div = n1 / n2;

  return {
    sum,
    rest,
    mult,
    div,
  };
}
