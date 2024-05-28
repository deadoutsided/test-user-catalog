const debounce = <T extends (...args: any[]) => any>(func: T, wait: number): T => {
  let timeout: ReturnType<typeof setTimeout>;
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  } as T;
};

export default debounce;