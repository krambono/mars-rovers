/*
 * If a is negative it returns a positive number like the "real" modulo operator
 */
export function modulo(a: number, b: number): number {
  return ((a % b) + b) % b;
}
