/**
 * Creates a debounced version of a function that delays its execution
 * until after a specified time has elapsed since the last invocation.
 * Useful for optimizing frequent function calls, such as search inputs or filtering operations.
 * Prevents unnecessary executions, reducing performance overhead in UI interactions.
 */

export function tableDebounce<T extends (...args: never[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
