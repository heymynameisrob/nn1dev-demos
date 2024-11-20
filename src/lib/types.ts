export type ApiReturnType<T> = {
  data: T | null;
  status: number;
  error?: Error;
};
